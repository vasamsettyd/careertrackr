
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userImageUrl?: string;
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }
}
