import { useState, useEffect } from "react";
import {
  Employee,
  EmployeeType,
  uploadProfilePicture,
} from "@/services/employeeService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/utils";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Partial<Employee>) => Promise<void>;
  isSubmitting: boolean;
}

const emptyEmployee: Partial<Employee> = {
  name: "",
  email: "",
  position: "",
  department: "",
  type: "fulltime",
  hireDate: new Date().toISOString().split("T")[0],
  phone: "",
  address: "",
  profilePicture: "",
};

const employeeTypes: { value: EmployeeType; label: string }[] = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "contractor", label: "Contractor" },
  { value: "intern", label: "Intern" },
];

const departments = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Customer Support",
  "Other",
];

const positions = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Sales Executive",
  "HR Manager",
  "Marketing Specialist",
  "Data Analyst",
  "Customer Support Representative",
  "DevOps Engineer",
  "Finance Analyst",
];

const countryCodes = [
  { code: "+1", label: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
];

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<Partial<Employee>>(
    employee || emptyEmployee
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    employee?.profilePicture
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("+91");

  useEffect(() => {
    if (employee) {
      setFormData(employee);
      setImagePreview(employee.profilePicture);
    } else {
      setFormData(emptyEmployee);
      setImagePreview(undefined);
    }
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

    if (formData.phone) {
      updatedFormData.phone = `${countryCode}${formData.phone}`;
    }

    if (imageFile) {
      setUploadingImage(true);
      try {
        const imageUrl = await uploadProfilePicture(imageFile);
        updatedFormData.profilePicture = imageUrl;
      } catch (error) {
        console.error("Failed to upload image:", error);
      } finally {
        setUploadingImage(false);
      }
    }

    await onSubmit(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-32 h-32 mb-4">
          <AvatarImage src={imagePreview} />
          <AvatarFallback className="text-2xl bg-brand-100 text-brand-800">
            {formData.name ? getInitials(formData.name) : "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <Label
            htmlFor="profilePicture"
            className="cursor-pointer px-4 py-2 border rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            {imagePreview ? "Change Photo" : "Upload Photo"}
          </Label>
          <Input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">First Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Last Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Designation *</Label>
          <Select
            value={formData.position}
            onValueChange={(value) => handleSelectChange("position", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => handleSelectChange("department", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Employee Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              handleSelectChange("type", value as EmployeeType)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employee type" />
            </SelectTrigger>
            <SelectContent>
              {employeeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hireDate">Hire Date *</Label>
          <Input
            id="hireDate"
            name="hireDate"
            type="date"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2">
            <Select
              value={countryCode}
              onValueChange={(value) => setCountryCode(value)}
            >
              <SelectTrigger className="w-60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map(({ code, label, flag }) => (
                  <SelectItem key={code} value={code}>
                    {flag} {code} ({label})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-brand-600 hover:bg-brand-700"
          disabled={isSubmitting || uploadingImage}
        >
          {isSubmitting || uploadingImage
            ? "Saving..."
            : employee
            ? "Update Employee"
            : "Add Employee"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
