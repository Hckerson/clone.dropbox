import "dotenv/config";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(`${process.env.DATABASE_URL}`) : null;

export async function POST(request: Request) {
  if (!sql) {
    return NextResponse.json(
      { error: "DATABASE_URL environment variable is not set" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const email = body.email;
  try {
    const response = await sql(
      `
      SELECT * FROM users
       WHERE email = $1`,
      [email]
    );
    if (response.length === 0) {
      return NextResponse.json({
        error: "Invalid email",
        status: 400,
        success: false,
      });
    }
    return NextResponse.json({
      success: true,
      message: `Email ${email} validated!`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
