'use client';
import List from "@/components/List";
import SortButton from "@/components/SortButton";
import { Button } from "@/components/ui/button";
import { Employee } from "@/db/types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export async function fetchData() {
  try {
    const res = await fetch("http://localhost:3000/api/employees", {
      method: "GET",
      cache: "no-store",
    })
    const { data } = await res.json();
    return data as Employee[];
  } catch (error: any) {
    console.error(error);
    throw new Error("An error occurred");
  }
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleSort = (sortedEmployees: Employee[]) => {
    setEmployees(sortedEmployees);
  }

  return (
    <main className="flex flex-col h-auto">
      <div className="flex flex-row justify-between px-4">
        <h1 className="text-center text-4xl my-4">
          Next.js App by Rahmah Putri Azzahra
        </h1>
        <Button variant={"link"}>
          <FaPlus className="mt-7" size={"2rem"} />
        </Button>
      </div>
      <table className="mx-4">
        <thead>
          <tr>
            <th className="border p-1">
              <SortButton column="firstName" onSort={handleSort}/>
            </th>
            <th className="border p-1">
              <SortButton column="lastName" onSort={handleSort}/>
            </th>
            <th className="border p-1">
              <SortButton column="position" onSort={handleSort}/>
            </th>
            <th className="border p-1">
              <SortButton column="phone" onSort={handleSort}/>
            </th>
            <th className="border p-1">
              <SortButton column="email" onSort={handleSort}/>
            </th>
          </tr>
        </thead>
        <tbody>
          <List employees={employees} />
        </tbody>
      </table>
    </main>
  );
}
