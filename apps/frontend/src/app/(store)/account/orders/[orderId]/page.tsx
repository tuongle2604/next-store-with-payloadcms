"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  CreditCard,
  RotateCcw,
  MessageSquare,
  Download,
} from "lucide-react";

// Mock data - in a real app, this would come from your API
const orderDetails = {
  "ORD-001": {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: "$129.99",
    subtotal: "$119.99",
    shipping: "$10.00",
    tax: "$0.00",
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-22",
    actualDelivery: "2024-01-21",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
    },
    products: [
      {
        id: "1",
        name: "Wireless Headphones",
        quantity: 1,
        price: "$79.99",
        image: "/placeholder.svg?height=80&width=80&text=Headphones",
        sku: "WH-001",
      },
      {
        id: "2",
        name: "Phone Case",
        quantity: 2,
        price: "$25.00",
        image: "/placeholder.svg?height=80&width=80&text=Case",
        sku: "PC-002",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "2024-01-20 10:30 AM",
        completed: true,
        description: "Your order has been received and is being processed",
      },
      {
        status: "Payment Confirmed",
        date: "2024-01-20 10:35 AM",
        completed: true,
        description: "Payment has been successfully processed",
      },
      {
        status: "Processing",
        date: "2024-01-20 2:00 PM",
        completed: true,
        description: "Your items are being prepared for shipment",
      },
      {
        status: "Shipped",
        date: "2024-01-21 9:00 AM",
        completed: true,
        description: "Your order has been shipped and is on its way",
      },
      {
        status: "Out for Delivery",
        date: "2024-01-21 8:00 AM",
        completed: true,
        description: "Your package is out for delivery",
      },
      {
        status: "Delivered",
        date: "2024-01-21 3:45 PM",
        completed: true,
        description: "Package delivered successfully",
      },
    ],
  },
  "ORD-002": {
    id: "ORD-002",
    date: "2024-01-18",
    status: "shipped",
    total: "$89.99",
    subtotal: "$79.99",
    shipping: "$10.00",
    tax: "$0.00",
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "2024-01-25",
    actualDelivery: null,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
    },
    products: [
      {
        id: "3",
        name: "Bluetooth Speaker",
        quantity: 1,
        price: "$89.99",
        image: "/placeholder.svg?height=80&width=80&text=Speaker",
        sku: "BS-003",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "2024-01-18 2:15 PM",
        completed: true,
        description: "Your order has been received and is being processed",
      },
      {
        status: "Payment Confirmed",
        date: "2024-01-18 2:20 PM",
        completed: true,
        description: "Payment has been successfully processed",
      },
      {
        status: "Processing",
        date: "2024-01-19 10:00 AM",
        completed: true,
        description: "Your items are being prepared for shipment",
      },
      {
        status: "Shipped",
        date: "2024-01-20 11:30 AM",
        completed: true,
        description: "Your order has been shipped and is on its way",
      },
      {
        status: "Out for Delivery",
        date: "Expected: 2024-01-25",
        completed: false,
        description: "Your package will be out for delivery",
      },
      {
        status: "Delivered",
        date: "Expected: 2024-01-25",
        completed: false,
        description: "Package will be delivered",
      },
    ],
  },
};

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

export default function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;
  const order = orderDetails[orderId as keyof typeof orderDetails];

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/account/orders">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Order not found</h3>
            <p className="text-muted-foreground">
              The order you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedSteps = order.timeline.filter((step) => step.completed).length;
  const progressPercentage = (completedSteps / order.timeline.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/account/orders">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(order.status)}
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Order Status
              </CardTitle>
              <CardDescription>Track your order progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {completedSteps} of {order.timeline.length} steps completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="space-y-4">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-8 mt-2 ${step.completed ? "bg-green-200" : "bg-gray-200"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {step.status}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.trackingNumber && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tracking Number</h4>
                      <p className="font-mono text-sm">
                        {order.trackingNumber}
                      </p>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Truck className="h-4 w-4" />
                      Track Package
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 border rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      SKU: {product.sku}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.price}</div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{order.tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.street}</div>
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </div>
                <div>{order.shippingAddress.country}</div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">
                    {order.paymentMethod.type} •••• {order.paymentMethod.last4}
                  </div>
                  <div className="text-muted-foreground">
                    Expires {order.paymentMethod.expiry}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Estimated Delivery
                </span>
                <span>
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
              {order.actualDelivery && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Actual Delivery</span>
                  <span className="text-green-600 font-medium">
                    {new Date(order.actualDelivery).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
              {order.status === "delivered" && (
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4" />
                  Return Items
                </Button>
              )}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
