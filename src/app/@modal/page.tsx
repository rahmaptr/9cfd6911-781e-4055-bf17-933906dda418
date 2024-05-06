import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose } : ModalProps) {
  const router = useRouter();
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
    router.back();
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const employee = { name, position, phone, email };
    try {
      const res = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (res.ok) {
        handleClose();
      } else {
        const { message } = await res.json();
        alert(message);
      }
    } catch (error: any) {
      console.error(error);
      alert("An error occurred");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <Card className="relative w-full max-w-md mx-2 md:mx-0">
        <CardHeader className="flex justify-between">
          <CardTitle>Add New Employee</CardTitle>
          <Button
            onClick={onClose}
            className="absolute top-0 right-0 p-2"
          >
            <FaTimes />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="position" className="mb-2">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <Button
              type="submit"
              className="bg-green-500 text-white"
            >
              Add Employee
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}