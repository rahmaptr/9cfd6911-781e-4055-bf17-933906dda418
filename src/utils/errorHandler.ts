import { NextResponse } from "next/server";

export function errorHandler(error: any) : NextResponse {
  console.error(error);
  const message = error.message;
  if (message.includes("null value")) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  } else if (message === "not found") {
    return NextResponse.json(
      { message: "Employee not found" },
      { status: 404 }
    );
  } else {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
