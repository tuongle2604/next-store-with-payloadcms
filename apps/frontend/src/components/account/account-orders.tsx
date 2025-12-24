"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  Filter,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useCustomer } from "@/contexts/CustomerContext";
import { Order } from "@repo/cms/payload-types";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-blue-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "cancelled":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AccountOrders() {
  const { customer } = useCustomer();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const orders = (customer?.orders?.docs as Order[]) || [];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products?.some((product) =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesStatus = statusFilter === "all" || order.orderDetails.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
          <CardDescription>Track and manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.orderDetails.status)}
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{order.orderDetails.total + " $"}</div>
                  <Badge className={getStatusColor(order.orderDetails.status)}>
                    {order.orderDetails.status.charAt(0).toUpperCase() + order.orderDetails.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products */}
              <div className="space-y-2">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-muted-foreground text-sm">Quantity: {product.quantity}</div>
                      </div>
                    </div>
                    <div className="font-medium">{product.price + " $"}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't placed any orders yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
