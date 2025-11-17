"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: "$129.99",
    items: 3,
    trackingNumber: "1Z999AA1234567890",
    products: [
      { name: "Wireless Headphones", quantity: 1, price: "$79.99" },
      { name: "Phone Case", quantity: 2, price: "$25.00" },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-18",
    status: "shipped",
    total: "$89.99",
    items: 1,
    trackingNumber: "1Z999AA1234567891",
    products: [{ name: "Bluetooth Speaker", quantity: 1, price: "$89.99" }],
  },
  {
    id: "ORD-003",
    date: "2024-01-15",
    status: "processing",
    total: "$199.99",
    items: 2,
    trackingNumber: null,
    products: [
      { name: "Laptop Stand", quantity: 1, price: "$149.99" },
      { name: "USB-C Cable", quantity: 1, price: "$50.00" },
    ],
  },
  {
    id: "ORD-004",
    date: "2024-01-10",
    status: "cancelled",
    total: "$59.99",
    items: 1,
    trackingNumber: null,
    products: [{ name: "Wireless Mouse", quantity: 1, price: "$59.99" }],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-blue-600" />;
    case "processing":
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
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
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
                  {getStatusIcon(order.status)}
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{order.total}</div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products */}
              <div className="space-y-2">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Quantity: {product.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium">{product.price}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Tracking and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  {order.trackingNumber && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tracking: </span>
                      <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/account/orders/${order.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  {order.status === "delivered" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Return
                    </Button>
                  )}
                  {order.trackingNumber && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Truck className="h-4 w-4" />
                      Track Package
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
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
