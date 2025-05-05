
import { Employee } from "@/services/employeeService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";

interface EmployeeDetailDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (employee: Employee) => void;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "PPP");
  } catch (e) {
    return dateString;
  }
};

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

const EmployeeDetailDialog: React.FC<EmployeeDetailDialogProps> = ({
  employee,
  open,
  onOpenChange,
  onEdit,
}) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Employee Details</DialogTitle>
          <DialogDescription className="text-center">
            Detailed information about {employee.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={employee.profilePicture} alt={employee.name} />
            <AvatarFallback className="text-xl bg-brand-100 text-brand-800">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-medium">{employee.name}</h3>
            <p className="text-muted-foreground">{employee.position}</p>
            <Badge 
              variant="outline" 
              className={`${getEmployeeTypeColor(employee.type)} border-none mt-1`}
            >
              {employee.type.charAt(0).toUpperCase() + employee.type.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Department</p>
            <p>{employee.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="break-all">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hire Date</p>
            <p>{formatDate(employee.hireDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>{employee.phone || "Not provided"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{employee.address || "Not provided"}</p>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              onOpenChange(false);
              onEdit(employee);
            }}
            className="bg-brand-600 hover:bg-brand-700"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailDialog;
