"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { loginFormSchema } from "@repo/schemas/form-schemas";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { login } from "@/lib/payload/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const setCustomer = useAuthStore((store) => store.setCustomer);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "guest@gmail.com",
      password: "guest12345",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { error, data } = await login(values);

    if (error || !data) {
      return toast.error(error?.message || "Login failed. Please try again.");
    }

    setCustomer(data);
    toast.success("Login successful!");
    router.push("/");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                          <div className="flex items-center justify-between">
                            <FormLabel htmlFor="confirmPassword">
                              Confirm Password
                            </FormLabel>
                            <Link
                              href={"/auth/forgot-password"}
                              className="text-muted-foreground hover:text-primary ml-auto text-sm underline underline-offset-2"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <FormControl>
                            <PasswordInput placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-balance [&_a]:font-bold [&_a]:underline-offset-4 hover:[&_a]:underline">
        Don't have an account?{" "}
        <Link href={"/auth/register"}>Register now!</Link>
      </div>
    </div>
  );
}
