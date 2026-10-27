import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import { cache } from "react";
import { decrypt } from "@/app/lib/session";

const sql = process.env.DATABASE_URL ? neon(`${process.env.DATABASE_URL}`) : null;

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.sessionId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session?.user_Id };
});

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  if (!sql) {
    console.log('DATABASE_URL not set');
    return null;
  }

  try {
    const data = await sql(`
      SELECT u.id, u.name, u.email, s.id, s.expires_at
      FROM sessions as s
      INNER JOIN users as u
      ON u.id = s.user_id`)

    const user = data[0]

    return user
  } catch (error) {
    console.log('Failed to fetch user', error)
    return null
  }
})