
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getAllEmployees, 
  searchEmployees, 
  deleteEmployee,
  Employee
} from "@/services/employeeService";
import EmployeeCard from "@/components/employees/EmployeeCard";
import EmployeeDetailDialog from "@/components/employees/EmployeeDetailDialog";
import { Plus, Search, User } from "lucide-react";

const DashboardPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const navigate = useNavigate();

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      loadEmployees();
      return;
    }
    
    setIsLoading(true);
    try {
      const results = await searchEmployees(searchQuery);
      setEmployees(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (employee: Employee) => {
    try {
      await deleteEmployee(employee.id);
      await loadEmployees(); // Refresh the employee list
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <form onSubmit={handleSearch} className="flex flex-1 sm:w-64 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>
          
          <Button 
            onClick={() => navigate("/employees/new")}
            className="bg-brand-600 hover:bg-brand-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      ) : employees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <User className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">No employees found</h3>
          <p className="text-muted-foreground mt-2 mb-5">
            {searchQuery.trim() 
              ? "No results match your search criteria." 
              : "Get started by adding your first employee."}
          </p>
          {!searchQuery.trim() && (
            <Button 
              onClick={() => navigate("/employees/new")}
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Employee
            </Button>
          )}
          {searchQuery.trim() && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                loadEmployees();
              }}
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <EmployeeCard 
              key={employee.id}
              employee={employee}
              onView={handleViewEmployee}
              onEdit={handleEditEmployee}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      <EmployeeDetailDialog
        employee={selectedEmployee}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onEdit={handleEditEmployee}
      />
    </div>
  );
};

export default DashboardPage;
