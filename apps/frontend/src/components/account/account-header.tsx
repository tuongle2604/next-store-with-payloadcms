"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { logout } from "@/lib/payload/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

interface AccountHeaderProps {
  customer: CurrentCustomer | null;
}

export default function AccountHeader({ customer }: AccountHeaderProps) {
  const router = useRouter();
  const logoutCustomer = useAuthStore((state) => state.logoutCustomer);

  async function handleLogout() {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
    logoutCustomer();
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{customer?.fullName}</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account preferences
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <Bell className="h-3 w-3" />
            Pro Plan
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
