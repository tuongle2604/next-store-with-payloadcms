import { EmailVerify } from "@/components/auth/email-verify";
import { Suspense } from "react";

function VerifyContent() {
  // In a real app, you would get the token from URL search params
  // For demo purposes, we'll simulate different scenarios
  const token = "valid-token"; // Change to "expired" or "invalid" to test different states

  return <EmailVerify token={token} />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>

    // <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    //   <div className="w-full max-w-sm">
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <VerifyContent />
    //     </Suspense>
    //   </div>
    // </div>
  );
}
