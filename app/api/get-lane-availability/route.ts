import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/controllers/pgConnector";
import isDateBlocked from "@/app/helpers/isDateBlocked";

export async function GET(req: NextApiRequest): NextApiResponse {
  const { date, time, duration } = Object.fromEntries(req.nextUrl.searchParams);

  if (!date || typeof date !== "string") {
    return NextResponse.json(
      { error: "Invalid date parameter" },
      { status: 422 }
    );
    return;
  }
  if (!time) {
    return NextResponse.json(
      { error: "a specific time must be provided" },
      { status: 422 }
    );
  }

  if (!duration) {
    return NextResponse.json(
      { error: "a specific duration must be provided" },
      { status: 422 }
    );
  }

  const client = await db.pool.connect();

  try {
    if (await isDateBlocked(client, date)) {
      return NextResponse.json({ error: "The selected date is blocked." });
    }
    const dayOfWeek = new Date(date).toLocaleString("en-US", {
      weekday: "long",
    });
    console.log({ dayOfWeek });
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

    return NextResponse.json(availableLanesRes.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
