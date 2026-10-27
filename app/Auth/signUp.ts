"use server";
import bcrypt from "bcryptjs";
import { State } from "../en_GB/register/auth_Form2";
import { RegisterSchema } from "../lib/definitions";
import { neon } from "@neondatabase/serverless";
import { createSession } from "../lib/session";
import "dotenv/config";

const sql = process.env.DATABASE_URL ? neon(`${process.env.DATABASE_URL}`) : null;

export async function signUp(state: State = {}, formData: FormData) {
  console.log(state)
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }
  const { email, password, firstname, lastname } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

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

    if (response.length == 0) {
      const details = await sql(
        `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstname, lastname, email, hashedPassword]
      );
      const id = details[0].id;
      await createSession(id);
      return {
        message: "success",
      };
    } else {
      return {
        message: "login, Already have an account, Redirecting ...",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Login error, Failed to create user",
    };
  }
}
