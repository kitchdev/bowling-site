import { NextResponse } from "next/server";
import db from "@/app/controllers/pgConnector";
const { hash } = require("bcrypt");

export async function POST(request: Request) {
  const client = await db.pool.connect();
  try {
    const { name, email, password, phone_number } = await request.json();
    const hashedPassword = await hash(password, 10);
    const { rows } = await client.query(
      `INSERT INTO users (name, email, password, phone_number, active, role_id) VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, hashedPassword, phone_number, false, 1]
    );
    console.log({ rows });
    return NextResponse.json({ message: "successfully created new user" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  } finally {
    await client.release();
  }
}
