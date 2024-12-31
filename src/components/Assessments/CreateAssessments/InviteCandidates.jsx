import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const InviteCandidates = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <section className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 bg-White rounded-b-sm font-OpenSans">
      <div className="w-full flex flex-col gap-3 mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="text-lg font-semibold">Invite Candidates</h2>
          <Button
            size="lg"
            variant="outline"
            className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
          >
            Bulk Invite
          </Button>
        </div>

        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col md:flex-row justify-center items-center font-OpenSans gap-3 md:gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full md:w-fit">
                    <FormLabel className="text-sm md:text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm text-xs md:px-3 md:py-6 md:w-80 border border-Lines"
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
                  <FormItem className="w-full md:w-fit">
                    <FormLabel className="text-sm md:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Input
                          className="rounded-sm text-xs md:px-3 md:py-6 md:w-80 border border-Lines"
                          placeholder="Email"
                          {...field}
                        />
                        <Button
                          variant="outline"
                          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
                        >
                          Invite
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-Secondary_Text font-semibold text-sm">
            Invited Candidates (0)
          </p>
          <hr />
          <div className="text-center h-60 flex flex-col justify-center items-center">
            <p className="text-Secondary_Text text-sm">
              No candidates have been invited yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteCandidates;
