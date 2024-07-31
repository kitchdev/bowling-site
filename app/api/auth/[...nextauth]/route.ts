import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/app/controllers/pgConnector";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        const client = await db.pool.connect();

        try {
          const { email, password } = credentials ?? {};
          console.log(typeof password);
          console.log(email, password);
          if (!email || !password) {
            throw new Error("Missing username or password");
          }
          const { rows } = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );
          const user = rows[0];
          const compareRes = await compare(password, user.password);
          if (!user || !(await compare(password, user.password))) {
            throw new Error("Invalid username or password");
          }
          return { id: user.id.toString(), email: user.email };
        } catch (error) {
          console.error(error);
          throw new Error(error.message);
        } finally {
          client.release();
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
