import ApplicationLogo from "@/components/common/ApplicationLogo";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative w-full">
      <div className="absolute left-0 top-0 z-50 px-4 py-3">
        <ApplicationLogo />
      </div>

      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Left Side Image */}
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/images/login-image.png"
            alt="Register Banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
