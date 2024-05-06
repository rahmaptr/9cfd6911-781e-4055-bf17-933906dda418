import { pool } from "@/db/connection";
import { Employee } from "@/db/types";
import { NextRequest } from "next/server";

export async function GET() {
  const query = "SELECT * FROM employees";
  const { rows } = await pool.query(query);
  return Response.json({ data: rows });
}

export async function POST(req: NextRequest) {
  const { name, position, phone, email } = await req.json() as Employee;
  const query = `INSERT INTO employees(name, position, phone, email) VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [name, position, phone, email]);
  return Response.json({ message: "Employee added" , data: rows[0]});
}