// pages/api/create-reservation.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bowling",
  password: "postgres",
  port: 5432,
});

export async function POST(req: NextApiRequest) {
  // console.log("-=-=-=-=--=-=", req.formData());
  const data = await req.json();
  const { numberOfLanes, startTime, endTime, userId } = data;
  console.log(userId);

  // if (!numberOfLanes || !startTime || !endTime || !userId) {
  //   res.status(400).json({ error: "Missing required fields" });
  //   return;
  // }

  try {
    const result = await pool.query(
      `
                INSERT INTO reservations (number_of_lanes, start_time, end_time, user_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `,
      [numberOfLanes, startTime, endTime, userId]
    );
    // // res.status(200).json(result.rows[0]);
    return Response.json({ result: result });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}
