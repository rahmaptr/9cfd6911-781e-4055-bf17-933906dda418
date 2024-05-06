import { pool } from "@/db/connection";
import { Employee } from "@/db/types";
import { errorHandler } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const query = "SELECT * FROM employees";
  try {
    const { rows } = await pool.query(query);
    return Response.json({ data: rows });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  const { name, position, phone, email } = await req.json() as Employee;
  const query = `INSERT INTO employees(name, position, phone, email) VALUES ($1, $2, $3, $4) RETURNING *`;
  try {
    const { rows } = await pool.query(query, [name, position, phone, email]);
    return Response.json({ message: "Employee added" , data: rows[0]});
  } catch (error: any) {
    return errorHandler(error);
  }
}