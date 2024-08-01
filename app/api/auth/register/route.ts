import { NextResponse } from "next/server";
import db from "@/app/controllers/pgConnector";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { EmailTemplate } from "@/app/[lang]/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const client = await db.pool.connect();
  try {
    const { name, email, password, phone_number } = await request.json();
    const checkUser = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    const userExists = checkUser.rows[0]?.id;
    if (userExists) {
      console.log("whoops user with this email already exists");
      throw new Error("user already exists");
    }
    const hashedPassword = await hash(password, 10);
    const user = await client.query(
      `INSERT INTO users (name, email, password, phone_number, active, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [name, email, hashedPassword, phone_number, false, 1]
    );
    const userId = user.rows[0].id;
    // now create an activationToken
    const activateToken = `${randomUUID()}-${randomUUID()}`.replace(/-/g, "");
    const tokenRes = await client.query(
      `INSERT INTO activate_token (token, user_id) VALUES ($1, $2)`,
      [activateToken, userId]
    );
    // now fire off email
    console.log(activateToken);
    const { data, error } = await resend.emails.send({
      from: "Valois Bowling<onboarding@resend.dev>",
      to: [email],
      subject: "Email Validation",
      react: EmailTemplate({ name, activateToken }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    console.log(data);
    return NextResponse.json({ message: "successfully created new user" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  } finally {
    await client.release();
  }
}
