
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-brand-700">
            EmployManage
          </h1>
          <p className="mt-3 text-gray-600">
            Sign in to manage your employees
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
