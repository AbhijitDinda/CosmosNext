import { useState,useEffect } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link"; // Replace React Router's Link with Next.js Link
import { useSignin } from "@/hooks/apis/auth/useSignin";

const LoginPage = () => {
  const router = useRouter(); // Next.js router
  const { isSuccess, isPending, error, signinMutation } = useSignin();

  const [signinForm, setSigninForm] = useState({
    user_id: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    user_id: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!signinForm.user_id.trim()) {
      errors.user_id = "user_id is required.";
    }
    if (!signinForm.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const onSigninFormSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form inputs
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    // Clear form errors
    setFormErrors({});
  
    try {
      // Perform the mutation and wait for its result
      await signinMutation({
        user_id: signinForm.user_id,
        password: signinForm.password,
      });
  
      // Redirect only if sign-in was successful
      // if (isSuccess) {
      //   console.log("Sign-in successful, redirecting to dashboard...",isSuccess);
      //   router.push("/dashboard");
      // } else {
      //   console.log("Sign-in not successful, isSuccess:", isSuccess);
      // }


      
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Sign-in successful, redirecting to dashboard...",isSuccess);
      router.push("/dashboard");
    } else {
      console.log("Sign-in not successful, isSuccess:", isSuccess);
    }
  }, [isSuccess]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-Fourth">
      <div className="container flex flex-col items-center w-[330px] md:w-[700px] px-5 md:px-8 py-3 md:py-6 border rounded-sm gap-3 md:gap-6 bg-White font-OpenSans">
        <div className="flex flex-col gap-1 md:gap-6 items-center">
          <img src="/svgs/logo.svg" alt="logo" className="size-8 md:size-12" />
          <h1 className="text-lg md:text-xl font-bold">Personal Information</h1>
          <h4 className="text-sm md:text-lg font-normal text-TEXT_P">
            Please provide your details to continue
          </h4>
        </div>
        <div className="flex flex-col gap-3 md:gap-6 w-[250px] md:w-[440px] items-center">
          <form
            onSubmit={onSigninFormSubmit}
            className="w-full flex flex-col font-OpenSans gap-3 md:gap-6"
          >
            <div className="flex flex-col">
              <label className="text-sm md:text-base">user_id</label>
              <Input
                className="rounded-sm text-xs md:px-3 md:py-6"
                placeholder="user_id"
                name="user_id"
                value={signinForm.user_id}
                onChange={handleInputChange}
              />
              {formErrors.user_id && (
                <p className="text-xs text-red-500">{formErrors.user_id}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm md:text-base">Password</label>
              <Input
                type="password"
                className="rounded-sm text-xs md:px-3 md:py-6"
                placeholder="Password"
                name="password"
                value={signinForm.password}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <p className="text-xs text-red-500">{formErrors.password}</p>
              )}
            </div>

            <div className="py-3 flex justify-center items-center">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-sm bg-Lines px-4 md:px-6 py-4 md:py-6 text-White text-sm md:text-base font-semibold"
              >
                {isPending ? "Signing in..." : "Continue"}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error.message || "Sign-in failed. Please try again."}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
