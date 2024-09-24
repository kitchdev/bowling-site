import { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: number;
    } & DefaultSession["user"];
  }

  interface JWT {
    token: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: number;
    } & DefaultJWT;
  }
}
