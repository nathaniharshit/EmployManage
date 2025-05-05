
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { createEmployee } from "@/services/employeeService";

const NewEmployeePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (employeeData: any) => {
    setIsSubmitting(true);
    try {
      await createEmployee(employeeData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <EmployeeForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default NewEmployeePage;
