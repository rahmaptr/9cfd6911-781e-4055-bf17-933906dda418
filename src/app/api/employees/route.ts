import { pool } from "@/db/connection";
import { Employee } from "@/db/types";
import { errorHandler } from "@/utils/errorHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let query = "SELECT * FROM employees";
  req.nextUrl.searchParams.forEach((value, key) => {
    switch (key) {
      case "name":
        query += ` WHERE name ILIKE '%${value}%'`;
        break;
      case "position":
        query += ` WHERE position = '${value}'`;
        break;
      case "phone":
        query += ` WHERE phone = '${value}'`;
        break;
      case "email":
        query += ` WHERE email = '${value}'`;
        break;
    
      default:
        break;
    }
  }
  );
  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0) throw new Error("not found");
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