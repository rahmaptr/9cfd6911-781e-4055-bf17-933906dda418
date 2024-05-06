'use client';

import { Employee } from "@/db/types";
import { useState } from "react";

export default function List({employees}: {employees: Employee[]}){
  const [data, setData] = useState<Employee[]>(employees);
  return (
    <>
    {Array.isArray(data) &&
      data.map((employee: Employee) => (
        <tr key={employee.id}>
          <td className="border p-1">{employee.name.split(" ")[0]}</td>
          <td className="border p-1">{employee.name.split(" ")[1]}</td>
          <td className="border p-1">{employee.position}</td>
          <td className="border p-1">{employee.phone}</td>
          <td className="border p-1">{employee.email}</td>
        </tr>
      ))}
  </>
  )
}