// pages/api/create-reservation.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/[lang]/controllers/pgConnector";
import isDateBlocked from "@/app/[lang]/helpers/isDateBlocked";
import addMinutesToTimeString from "@/app/[lang]/helpers/addMinutesToTimeString";

export async function POST(req: NextApiRequest) {
  // console.log("-=-=-=-=--=-=", req.formData());
  const { userId, date, time, duration, laneIds } = await req.json();
  console.log(userId);
  const client = await db.pool.connect();

  try {
    await client.query("BEGIN");

    if (await isDateBlocked(client, date)) {
      throw new Error("The selected date is blocked.");
    }

    const availableLanes = await getAvailableLanes(
      client,
      date,
      time,
      duration
    );
    console.log({ availableLanes });
    const availableLaneIds = availableLanes.map((lane) => lane.id);

    if (!laneIds.every((laneId) => availableLaneIds.includes(laneId))) {
      throw new Error("One or more lanes are not available.");
    }

    const endTime = addMinutesToTimeString(time, duration);
    console.log({ endTime });

    const reservationRes = await client.query(
      `INSERT INTO Reservations (user_id, reservation_date, reservation_time, reservation_endtime, duration_minutes, number_of_lanes)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, date, time, endTime, duration, laneIds.length]
    );

    const reservation = reservationRes.rows[0];

    for (const laneId of laneIds) {
      await client.query(
        `INSERT INTO Reservation_Lanes (reservation_id, lane_id)
              VALUES ($1, $2)`,
        [reservation.id, laneId]
      );
    }

    await client.query("COMMIT");
    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    await client.query("ROLLBACK");
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release();
  }
}

type availableLanes = {
  id: number;
  lane_number: number;
  max_capacity: number;
}[];

const getAvailableLanes = async (
  client: any,
  date: string,
  time: string,
  duration: number
): availableLanes => {
  const dayOfWeek = new Date(date).toLocaleString("en-US", { weekday: "long" });

  const availabilityRes = await client.query(
    `SELECT * FROM Availability
      WHERE day_of_week = $1 AND start_time <= $2 AND end_time >= ($2 + $3::interval)`,
    [dayOfWeek, time, `${duration} minutes`]
  );

  if (availabilityRes.rows.length === 0) {
    return [];
  }

  const reservationsRes = await client.query(
    `SELECT lane_id FROM Reservations r
      JOIN Reservation_Lanes rl ON r.id = rl.reservation_id
      WHERE reservation_date = $1 AND
      (($2::time, ($2::time + $3::interval)) OVERLAPS (reservation_time, (reservation_time + (r.duration_minutes || ' minutes')::interval)))`,
    [date, time, `${duration} minutes`]
  );
  console.log(reservationsRes);
  const reservedLaneIds = reservationsRes.rows.map((row) => row.lane_id);

  let query = "SELECT * FROM Lanes";
  const queryParams = [];
  if (reservedLaneIds.length > 0) {
    query +=
      " WHERE id NOT IN (" +
      reservedLaneIds.map((_, i) => `$${i + 1}`).join(", ") +
      ")";
    queryParams.push(...reservedLaneIds);
  }

  const availableLanesRes = await client.query(query, queryParams);

  return availableLanesRes.rows;
};
