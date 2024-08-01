import db from "@/app/controllers/pgConnector";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const client = await db.pool.connect();
  try {
    const checkUser = await client.query(
      `
      SELECT u.id FROM users u
      JOIN activate_token at2 ON u.id = at2.user_id
      WHERE at2.activated_at IS NULL 
        AND at2.created_at > (NOW() - INTERVAL '24 hours')
        AND at2.token = $1`,
      [token]
    );
    const user = checkUser.rows[0];
    if (!user) {
      console.error("error which finding user with token");
      return NextResponse.json({ error: "Token invalid" });
    }
    const updateUser = await client.query(
      `
      UPDATE users SET active = $1 WHERE id = $2
    `,
      [true, user.id]
    );
    const updateToken = await client.query(
      `
      UPDATE activate_token SET activated_at = NOW() WHERE token = $1
    `,
      [token]
    );
    // back to homepage
    return NextResponse.redirect(process.env.HOMEPAGE_URL);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  } finally {
    (await client).release();
  }
}
