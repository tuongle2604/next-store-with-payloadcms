import { RegisterSuccess } from "@/components/auth/register-success";

export default function RegisterSuccessPage() {
  // In a real app, you might get the email from URL params or session
  const email = "user@example.com";

  return <RegisterSuccess email={email} />;
}
