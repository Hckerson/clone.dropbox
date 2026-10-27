import { neon } from "@neondatabase/serverless";
const sql = process.env.DATABASE_URL ? neon(`${process.env.DATABASE_URL}`) : null;

export const validateEmail = async (name: string) => {
  if (!sql) {
    console.log("DATABASE_URL not set");
    return;
  }
  const data = await sql(
    `
    SELECT * FROM users
    WHERE name = $1`,
    [name]
  );
  console.log(data);
};
