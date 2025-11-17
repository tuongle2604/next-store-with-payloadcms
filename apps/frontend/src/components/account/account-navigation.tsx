"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User, CreditCard, Package } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    name: "Billing",
    href: "/account/billing",
    icon: CreditCard,
    description: "Manage your subscription and payment methods",
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: Package,
    description: "View your order history and track shipments",
  },
];

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Navigation</CardTitle>
        <CardDescription>
          Manage different aspects of your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-auto p-4",
                    isActive && "bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {item.description}
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
