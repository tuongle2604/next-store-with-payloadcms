"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import type { CheckoutFormData } from "@repo/schemas/form-schemas";
// import { FormProvider, useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryList } from "@repo/shared-data/countries";

export default function CheckoutForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <form className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Contact Information & Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                {...register("fullName")}
                placeholder="John Doe"
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john.doe@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          <Separator />

          {/* Shipping Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shipping Address</h3>

            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Street Address *</Label>
              <Input
                id="shippingAddress"
                type="text"
                {...register("shippingAddress")}
                placeholder="123 Main Street, Apt 4B"
                className={errors.shippingAddress ? "border-red-500" : ""}
              />
              {errors.shippingAddress && (
                <p className="text-sm text-red-500">{errors.shippingAddress.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="shippingCity">City *</Label>
                <Input
                  id="shippingCity"
                  type="text"
                  {...register("shippingCity")}
                  placeholder="New York"
                  className={errors.shippingCity ? "border-red-500" : ""}
                />
                {errors.shippingCity && <p className="text-sm text-red-500">{errors.shippingCity.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingProvince">State/Province *</Label>
                <Input
                  id="shippingProvince"
                  type="text"
                  {...register("shippingProvince")}
                  placeholder="NY"
                  className={errors.shippingProvince ? "border-red-500" : ""}
                />
                {errors.shippingProvince && (
                  <p className="text-sm text-red-500">{errors.shippingProvince.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="shippingZip">ZIP/Postal Code *</Label>
                <Input
                  id="shippingZip"
                  type="text"
                  {...register("shippingPostalCode")}
                  placeholder="10001"
                  className={errors.shippingPostalCode ? "border-red-500" : ""}
                />
                {errors.shippingPostalCode && (
                  <p className="text-sm text-red-500">{errors.shippingPostalCode.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingCountry">Country *</Label>
                <Select {...register("shippingCountry")} defaultValue="vi">
                  <SelectTrigger className={errors.shippingCountry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryList.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.shippingCountry && (
                  <p className="text-sm text-red-500">{errors.shippingCountry.message}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
