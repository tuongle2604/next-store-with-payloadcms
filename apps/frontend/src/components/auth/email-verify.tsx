"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { verifyEmail } from "@/lib/payload/auth";
type VerificationStatus = "loading" | "success" | "error" | "expired";

export function EmailVerify({
  className,
  token,
  ...props
}: React.ComponentProps<"div"> & {
  token?: string;
}) {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. Please check your email for the correct link.");
        return;
      }

      const { error } = await verifyEmail(token);
      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setMessage("Your email has been successfully verified! You can now log in to your account.");
    };

    handleVerifyEmail();
  }, [token]);

  const handleResendEmail = () => {
    // Handle resend verification email logic here
    console.log("Resending verification email");
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-8 w-8 animate-spin text-blue-600" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "error":
      case "expired":
        return <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "bg-blue-100 dark:bg-blue-900/20";
      case "success":
        return "bg-green-100 dark:bg-green-900/20";
      case "error":
      case "expired":
        return "bg-red-100 dark:bg-red-900/20";
    }
  };

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Your Email...";
      case "success":
        return "Email Verified!";
      case "expired":
        return "Link Expired";
      case "error":
        return "Verification Failed";
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div
            className={cn(
              "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
              getStatusColor(),
            )}
          >
            {getStatusIcon()}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
            {status === "loading" && (
              <CardDescription>Please wait while we verify your email address...</CardDescription>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert
            className={cn(
              status === "loading" && "hidden",
              status === "success" && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
              (status === "error" || status === "expired") &&
                "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
            )}
          >
            <AlertDescription className="text-center">{message}</AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3">
            {status === "success" && (
              <Button className="w-full" asChild>
                <a href="/auth/login">Continue to Login</a>
              </Button>
            )}

            {(status === "error" || status === "expired") && (
              <>
                {/* <Button onClick={handleResendEmail} className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send New Verification Email
                </Button> */}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="/auth/register">Back to Registration</a>
                </Button>
              </>
            )}

            {status === "loading" && (
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="/auth/login">Back to Login</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground mx-auto max-w-md text-center text-xs">
        <p>
          Need help?{" "}
          <a href="#upport" className="hover:text-primary underline underline-offset-4">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
