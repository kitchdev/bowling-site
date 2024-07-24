// pages/api/available-slots.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/[lang]/controllers/pgConnector";
import isDateBlocked from "@/app/[lang]/helpers/isDateBlocked";
import get30MinIntervals from "@/app/[lang]/helpers/get30MinuteIntervals";

export async function GET(req: NextApiRequest): NextApiResponse {
  const { date, noLanes } = Object.fromEntries(req.nextUrl.searchParams);
  console.log({ date, noLanes });

  if (!date || typeof date !== "string") {
    return NextResponse.json(
      { error: "Invalid date parameter" },
      { status: 422 }
    );
    return;
  }
  if (!noLanes) {
    return NextResponse.json(
      { error: "Number of lanes must be provided" },
      { status: 422 }
    );
  }
  const client = await db.pool.connect();

  try {
    if (await isDateBlocked(client, date)) {
      return NextResponse.json({ message: "The selected date is blocked" });
    }
    console.log(date);

    const dayOfWeek = new Date(date).toLocaleString("en-US", {
      timeZone: "UTC",
      weekday: "long",
    });

    console.log(dayOfWeek);

    const availabilityRes = await client.query(
      `SELECT * FROM Availability
          WHERE day_of_week = $1`,
      [dayOfWeek]
    );

    if (availabilityRes.rows.length === 0) {
      return [];
    }

    const availabilityTimeSlots = availabilityRes.rows.reduce((acc, slot) => {
      acc.push(...get30MinIntervals(slot.start_time, slot.end_time));
      return acc;
    }, []);

    const { rows } = await client.query(
      `SELECT reservation_time, reservation_endtime, duration_minutes, number_of_lanes FROM Reservations r
          WHERE reservation_date = $1`,
      [date]
    );
    console.log(rows);

    // pretty non-performant, but atleast we no n of availabletimeslots won't be too large
    const availabilityTimeHash = availabilityTimeSlots.map((timeSlot) => {
      const newSlot = { [timeSlot]: 8 };
      for (let i = 0; i < rows.length; i++) {
        if (
          timeSlot >= rows[i].reservation_time &&
          timeSlot < rows[i].reservation_endtime
        ) {
          newSlot[timeSlot] = newSlot[timeSlot] - rows[i].number_of_lanes;
        }
      }
      return newSlot;
    });

    console.log(availabilityTimeHash);
    return NextResponse.json(availabilityTimeHash);
  } catch (error) {
    console.error(error);
    throw new Error({ error: error.message });
  } finally {
    client.release();
  }
}
