"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { useSessionStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export function RegisterSuccess({
  className,
  ...props
}: React.ComponentProps<"div"> & {
  email?: string;
}) {
  const router = useRouter();
  const [email] = useSessionStorage("register-email", "");

  const handleResendEmail = () => {
    // Handle resend verification email logic here
    console.log("Resending verification email to:", email);
  };

  useEffect(() => {
    if (!email) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-base">
              We've sent a verification email to your inbox
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Please check your email{" "}
              <strong suppressHydrationWarning={true}>{email}</strong> and click
              the verification link to activate your account.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>{"Didn't receive the email? Here's what you can do:"}</p>
              <ul className="ml-2 list-inside list-disc space-y-1">
                <li>Check your spam or junk folder</li>
                <li>Make sure the email address is correct</li>
                <li>Wait a few minutes for the email to arrive</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              {/* <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Resend Verification Email
              </Button> */}

              <Button variant="ghost" className="w-full" asChild>
                <a href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground mx-auto max-w-md text-center text-xs">
        <p>
          If you continue to have problems, please{" "}
          <a
            href="/support"
            className="hover:text-primary underline underline-offset-4"
          >
            contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
