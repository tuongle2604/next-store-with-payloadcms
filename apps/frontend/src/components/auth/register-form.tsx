"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { register } from "@/lib/payload/auth";
// import { registerFormSchema } from "@/lib/form-schema";
import { registerFormSchema } from "@repo/schemas/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSessionStorage } from "usehooks-ts";

export default function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [, setValue] = useSessionStorage("register-email", "");

  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const { error, data } = await register(values);
    console.log("Register response:", data);
    console.log("Register error:", error);

    if (error || !data) {
      return toast.error(error?.message || "Register failed. Please try again.");
    }

    // setCustomer(data);
    setValue(data?.user?.email);
    router.push("/auth/register/success");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Let's get started. Fill in the details below to create your account.
          </CardDescription>
        </CardHeader>{" "}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="johndoe@mail.com"
                              type="email"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-balance [&_a]:font-bold [&_a]:underline-offset-4 hover:[&_a]:underline">
        Already have an account? <Link href={"/auth/login"}>Login here!</Link>
        {/* By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>. */}
      </div>
    </div>
  );
}
