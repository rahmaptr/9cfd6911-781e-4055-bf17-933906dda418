import { Button } from "@/components/ui/button";
import { Employee } from "@/db/types";
import { FaPlus } from "react-icons/fa6";

export async function fetchData() {
  try {
    const res = await fetch("http://localhost:3000/api/employees", {
      method: "GET",
    });
    const { data } = await res.json();
    return data as Employee[];
  } catch (error: any) {
    console.error(error);
    throw new Error("An error occurred");
  }
}

export default async function Home() {
  const employees: Employee[] = await fetchData();
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
              <Button variant={"link"} className="font-bold">
                First Name
              </Button>
            </th>
            <th className="border p-1">
              <Button variant={"link"} className="font-bold">
                Last Name
              </Button>
            </th>
            <th className="border p-1">
              <Button variant={"link"} className="font-bold">
                Position
              </Button>
            </th>
            <th className="border p-1">
              <Button variant={"link"} className="font-bold">
                Phone
              </Button>
            </th>
            <th className="border p-1">
              <Button variant={"link"} className="font-bold">
                Email
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) &&
            employees.map((employee: Employee) => (
              <tr key={employee.id}>
                <td className="border p-1">{employee.name.split(" ")[0]}</td>
                <td className="border p-1">{employee.name.split(" ")[1]}</td>
                <td className="border p-1">{employee.position}</td>
                <td className="border p-1">{employee.phone}</td>
                <td className="border p-1">{employee.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
