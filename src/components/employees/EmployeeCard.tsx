
import { useState } from "react";
import { Employee } from "@/services/employeeService";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface EmployeeCardProps {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const getEmployeeTypeColor = (type: string) => {
  switch (type) {
    case "fulltime":
      return "bg-green-100 text-green-800";
    case "parttime":
      return "bg-blue-100 text-blue-800";
    case "contractor":
      return "bg-orange-100 text-orange-800";
    case "intern":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onView,
  onEdit,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(employee);
    setIsDeleting(false);
  };

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={employee.profilePicture} alt={employee.name} />
            <AvatarFallback className="text-lg bg-brand-100 text-brand-800">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center">
            <h3 className="font-medium text-lg">{employee.name}</h3>
            <p className="text-muted-foreground text-sm">{employee.position}</p>
            <div className="flex justify-center">
              <Badge 
                variant="outline" 
                className={`${getEmployeeTypeColor(employee.type)} border-none`}
              >
                {employee.type.charAt(0).toUpperCase() + employee.type.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/50 gap-2">
        <Button size="sm" variant="outline" onClick={() => onView(employee)}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(employee)}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="text-red-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-1" /> 
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
