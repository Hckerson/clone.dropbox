import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL
  ? neon(`${process.env.DATABASE_URL}`, {
      fetchOptions: {
        timeout: 10000,
      },
    })
  : null;

async function seedUsers() {
  if (!sql) return;
  await sql(`DROP TABLE IF EXISTS users CASCADE`);
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT user
    );
  `;
}

async function seedSession() {
  if (!sql) return;
  await sql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await sql(`
    CREATE TABLE IF NOT EXISTS sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
    )`);
}

export async function GET() {
  if (!sql) {
    return Response.json(
      { error: "DATABASE_URL environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    await sql`BEGIN`;
    await seedUsers();
    await seedSession();
    await sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
