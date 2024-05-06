import { Employee } from "@/db/types";

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
    <main>
      <h1>Next.js App by Rahmah Putri Azzahra</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) &&
            employees.map((employee: Employee) => (
              <tr key={employee.id}>
                <td>{employee.name.split(" ")[0]}</td>
                <td>{employee.name.split(" ")[1]}</td>
                <td>{employee.position}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
