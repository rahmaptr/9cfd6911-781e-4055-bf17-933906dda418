import { pool } from "@/db/connection";
import { Employee } from "@/db/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { name, position, phone, email } = (await req.json()) as Employee;
  const query =
    "UPDATE employees SET name = $1, position = $2, phone = $3, email = $4 WHERE id = $5 RETURNING *";
  const { rows } = await pool.query(query, [name, position, phone, email, id]);
  return Response.json({ message: "Employee updated", data: rows[0] });
}

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const input = (await req.json()) as Partial<Employee>;
  const columns = Object.keys(input);
  const values = Object.values(input);
  const query = `UPDATE employees SET ${columns.map((_, i) => `${columns[i]} = $${i + 1}`)} WHERE id = $${values.length + 1} RETURNING *`;
  const { rows } = await pool.query(query, [...values, id]);
  return Response.json({ message: "Employee updated", data: rows[0] });
}

export async function DELETE(
  _: any,
  { params: { id } }: { params: { id: string } }
) {
  const query = "DELETE FROM employees WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return Response.json({ message: "Employee deleted", data: rows[0] });
}
