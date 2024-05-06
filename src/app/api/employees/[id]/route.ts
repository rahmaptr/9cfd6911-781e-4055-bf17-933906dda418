import { pool } from "@/db/connection";
import { Employee } from "@/db/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: any,
  { params: { id } }: { params: { id: string } }
) {
  const query = "SELECT * FROM employees where id = $1";
  try {
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) throw new Error("not found");
    return Response.json({ data: rows });
  } catch (error: any) {
    console.error(error);
    if (error.message === "not found") {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "An error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { name, position, phone, email } = (await req.json()) as Employee;
  const query =
    "UPDATE employees SET name = $1, position = $2, phone = $3, email = $4 WHERE id = $5 RETURNING *";
  try {
    const { rows } = await pool.query(query, [
      name,
      position,
      phone,
      email,
      id,
    ]);
    return Response.json({ message: "Employee updated", data: rows[0] });
  } catch (error: any) {
    console.error(error);
    const message = error.message;
    if (message.includes("null value")) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "An error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const input = (await req.json()) as Partial<Employee>;
  const columns = Object.keys(input);
  const values = Object.values(input);
  const query = `UPDATE employees SET ${columns.map(
    (_, i) => `${columns[i]} = $${i + 1}`
  )} WHERE id = $${values.length + 1} RETURNING *`;
  try {
    const { rows } = await pool.query(query, [...values, id]);
    return Response.json({ message: "Employee updated", data: rows[0] });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(
  _: any,
  { params: { id } }: { params: { id: string } }
) {
  const query = "DELETE FROM employees WHERE id = $1 RETURNING *";
  try {
    const { rows } = await pool.query(query, [id]);
    return Response.json({ message: "Employee deleted", data: rows[0] });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
