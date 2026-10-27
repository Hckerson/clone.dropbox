"use server";
import bcrypt from "bcryptjs";
import { State } from "../lib/definitions";
import { LoginSchema } from "../lib/definitions";
import { createSession } from "../lib/session";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = process.env.DATABASE_URL ? neon(`${process.env.DATABASE_URL}`) : null;

export async function login(prevState: State = {}, formData: FormData) {
  console.log(prevState)
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { email, password } = validatedFields.data;

  if (!sql) {
    return {
      message: "Database connection error",
    };
  }

  try {
    const response = await sql(
      `
      SELECT * FROM users
      WHERE email = $1`,
      [email]
    );
    if (response.length === 0) {
      return {
        message: "User not found",
      };
    }
    const storedPassword = response[0].password;
    const isValid = await bcrypt.compare(password, storedPassword);
    const userid = response[0].id;
    if (!isValid) {
      return {
        message: "Invalid Credentials",
      };
    }
    await createSession(userid);
    return {
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Login error, Failed to validate user",
    };
  }
}
