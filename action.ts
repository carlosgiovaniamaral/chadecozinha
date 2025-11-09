"use server";

import { neon } from "@neondatabase/serverless";

export async function getData() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("❌ DATABASE_URL não está definida no ambiente!");
  }

  const sql = neon(url);
  const data = await sql`SELECT * FROM gifts`;
  return data;
}
