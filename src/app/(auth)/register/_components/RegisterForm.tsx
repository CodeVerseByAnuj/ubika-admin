"use client";
import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/components/common/LoadingButton";
import { useState } from "react";

const RegisterForm = function ({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    await new Promise((res) => {
      setTimeout(res, 2000);
    });
    setLoading(false);
    navigate("/register/steps");
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Join Ubika to take control of your health data.
          </p>
        </div>
        {/* <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator> */}
        <Field>
          <LoadingButton
            isLoading={loading}
            onClick={onSubmit}
            variant="outline"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              fill="none"
            >
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#7FBA00" d="M12 1h10v10H12z" />
              <path fill="#00A4EF" d="M1 12h10v10H1z" />
              <path fill="#FFB900" d="M12 12h10v10H12z" />
            </svg>
            Login with Microsoft
          </LoadingButton>
          {/* <FieldDescription className="text-center">
            have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Login
            </a>
          </FieldDescription> */}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
