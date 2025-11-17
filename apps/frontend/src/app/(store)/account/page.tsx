import { redirect } from "next/navigation";

export default function AccountPage() {
  // Redirect to profile by default
  redirect("/account/profile");
}
