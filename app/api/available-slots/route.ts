// pages/api/available-slots.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bowling",
  password: "postgres",
  port: 5432,
});

type Slot = {
  slot_start: string;
  slot_end: string;
};

export async function GET(req: NextApiRequest) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  console.log(date);

  if (!date || typeof date !== "string") {
    res.status(400).json({ error: "Invalid date parameter" });
    return;
  }

  try {
    const result = await pool.query<Slot>(
      `
            WITH all_slots AS (
                SELECT gs.slot_start, gs.slot_end
                FROM generate_time_slots($1::timestamp, $2::timestamp, 30) AS gs
            ),
            reserved_slots AS (
                SELECT start_time, end_time
                FROM reservations
                WHERE start_time >= $1::timestamp AND end_time <= $2::timestamp
            )
            SELECT slot_start, slot_end
            FROM all_slots
            WHERE NOT EXISTS (
                SELECT 1
                FROM reserved_slots
                WHERE all_slots.slot_start < reserved_slots.end_time
                  AND all_slots.slot_end > reserved_slots.start_time
            );
        `,
      [`${date} 09:00:00`, `${date} 22:00:00`]
    );

    return Response.json({ result: result.rows });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}
