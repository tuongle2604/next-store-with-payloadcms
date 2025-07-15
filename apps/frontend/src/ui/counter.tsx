"use client";

import type React from "react";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CounterProps {
  number: number;
  setNumber: (value: number) => void;
}

export default function Counter({ number, setNumber }: CounterProps) {
  const isMaxReached = false;
  const isMinReached = number === 1;

  const increment = () => {
    if (isMaxReached) return;
    setNumber(number + 1);
  };

  const decrement = () => {
    if (isMinReached) return;
    setNumber(number - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minQuantity = 1; // Minimum quantity allowed
    const value = Number.parseInt(e.target.value) || minQuantity;

    setNumber(Math.max(value, minQuantity));
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        aria-label="Decrease quantity"
        className="w-10 h-10 bg-transparent shrink-0"
        disabled={isMinReached}
      >
        <Minus className="w-4 h-4" />
      </Button>

      <Input
        id="quantity"
        type="number"
        onChange={handleInputChange}
        value={number}
        className="w-20 h-10 text-lg font-semibold text-center"
      />

      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        aria-label="Increase quantity"
        className="w-10 h-10 bg-transparent shrink-0"
        disabled={isMaxReached}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
