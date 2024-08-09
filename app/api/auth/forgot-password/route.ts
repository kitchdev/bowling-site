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
    const { email } = await request.json();
    const checkUser = await client.query(
      `SELECT id, name FROM users WHERE email = $1`,
      [email]
    );
    const userId = checkUser.rows[0]?.id;
    if (!userId) {
      console.log("whoops we can't find a user that matches this email");
      throw new Error("Email doesn't match any users");
    }
    const name = checkUser.rows[0]?.name;
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
      subject: "Password Reset",
      react: EmailTemplate({ name, activateToken, type: "forgotpassword" }),
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
