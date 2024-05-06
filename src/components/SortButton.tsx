"use client";

import { Employee } from "@/db/types";
import { Button } from "./ui/button";
import { fetchData } from "@/app/page";

function sortByName(employees: Employee[], column: string) {
  employees.sort((a: Employee, b: Employee) => {
    const nameA = a.name.split(" ");
    const nameB = b.name.split(" ");
    if (nameA[0] && nameB[0] && nameA[0] > nameB[0]) {
      return 1;
    }
    if (nameA[0] && nameB[0] && nameA[0] < nameB[0]) {
      return -1;
    }
    if (nameA[1] && nameB[1] && nameA[1] > nameB[1]) {
      return 1;
    }
    if (nameA[1] && nameB[1] && nameA[1] < nameB[1]) {
      return -1;
    }
    return 0;
  });
}

export default function SortButton({ column, onSort }: { column: string; onSort: (employees: Employee[]) => void }) {
  const handleClick = async (column: string) => {
    const employees: Employee[] = await fetchData();
    if (column === "firstName" || column === "lastName") {
      sortByName(employees, column);
    } else {
      employees.sort((a: Employee, b: Employee) => {
        if (
          a[column as keyof Employee] &&
          b[column as keyof Employee] &&
          a[column as keyof Employee]! > b[column as keyof Employee]!
        ) {
          return 1;
        }
        if (
          a[column as keyof Employee] &&
          b[column as keyof Employee] &&
          a[column as keyof Employee]! < b[column as keyof Employee]!
        ) {
          return -1;
        }
        return 0;
      });
    }
    console.log(employees);
    onSort(employees);
  };

  return (
    <Button
      onClick={() => handleClick(column)}
      variant={"link"}
      className="font-bold"
    >
      {column.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      })}
    </Button>
  );
}
