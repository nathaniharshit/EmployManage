
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { getEmployeeById, updateEmployee } from "@/services/employeeService";

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getEmployeeById(id);
        if (data) {
          setEmployee(data);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleSubmit = async (employeeData: any) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateEmployee(id, employeeData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <EmployeeForm 
          employee={employee} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default EditEmployeePage;
