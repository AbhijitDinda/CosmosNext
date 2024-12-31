import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router"; // Next.js router for navigation
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link"; // Replace React Router's Link with Next.js Link

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const LoginPage = () => {
  const router = useRouter(); // Next.js router

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    router.push("/dashboard"); // Navigate to the dashboard after form submission
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-Fourth ">
      <div className="container flex flex-col items-center w-[330px] md:w-[700px] px-5 md:px-8 py-3 md:py-6 border rounded-sm gap-3 md:gap-6 bg-White font-OpenSans">
        <div className="flex flex-col gap-1 md:gap-6 items-center">
          <img src="/svgs/logo.svg" alt="logo" className="size-8 md:size-12" />
          <h1 className="text-lg md:text-xl font-bold">Personal Infomation</h1>
          <h4 className="text-sm md:text-lg font-normal text-TEXT_P">
            Please provide your details to continue
          </h4>
        </div>
        <div className="flex flex-col gap-3 md:gap-6 w-[250px] md:w-[440px] items-center">
          <Button
            variant="outline"
            className="w-full md:px-32 md:py-6 text-sm md:text-base font-semibold border rounded-sm bg-[#0076B2] text-White hover:text-White font-OpenSans hover:bg-[#0076B2]"
          >
            Connect with Linkedin
          </Button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col font-OpenSans gap-3 md:gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm text-xs md:px-3 md:py-6"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm text-xs md:px-3 md:py-6"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-3 flex justify-center items-center">
                <Button
                  type="submit"
                  className="rounded-sm bg-Lines px-4 md:px-6 py-4 md:py-6 text-White text-sm md:text-base font-semibold"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="">
          <p className="text-xs md:text-sm text-TEXT_P">
            Already have an account?{" "}
            <Link href="#" className="font-bold">
              Sign in here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
