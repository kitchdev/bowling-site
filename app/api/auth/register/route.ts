import { NextResponse } from "next/server";
import db from "@/app/controllers/pgConnector";
const { hash } = require("bcrypt");

export default async function POST(request: Request) {
  try {
    const client = await db.pool.connect();
    const { name, email, password, phone_number } = await request.json();
    const hashedPassword = await hash(password);
    const { rows } = await client.query(`INSERT INTO users (1$, $2, $3, $4)`, [
      name,
      email,
      hashedPassword,
      phone_number,
    ]);
    console.log(rows);
  } catch (err) {
    console.error(err);
    throw new Error({ error: error.message });
  } finally {
    await client.release();
  }
}
