"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { logout } from "@/lib/payload/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { useAuthStore } from "@/store/auth.store";
import { useCustomer } from "@/contexts/CustomerContext";

export default function AccountHeader() {
  const router = useRouter();
  const { customer, setCustomer } = useCustomer();

  async function handleLogout() {
    await logout();
    router.push("/");
    setCustomer(null);
    toast.success("Logged out successfully");
  }

  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{customer?.fullName}</h1>
            <p className="text-muted-foreground text-sm">Manage your account preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <Bell className="h-3 w-3" />
            Pro Plan
          </Badge>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
