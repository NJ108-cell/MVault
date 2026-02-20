import React from "react";
import { Coffee, Car, ShoppingBag, Utensils, Gamepad2, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickExpenses = [
  { icon: Coffee, label: "Coffee", amount: 5, category: "food" },
  { icon: Utensils, label: "Lunch", amount: 15, category: "food" },
  { icon: Car, label: "Gas", amount: 40, category: "transportation" },
  { icon: ShoppingBag, label: "Groceries", amount: 50, category: "food" },
  { icon: Gamepad2, label: "Entertainment", amount: 20, category: "entertainment" },
  { icon: Home, label: "Utilities", amount: 100, category: "utilities" }
];

export default function QuickExpenseButtons({ onQuickExpense }) {
  const handleQuickExpense = async (quickExp) => {
    const expenseData = {
      amount: quickExp.amount,
      description: quickExp.label,
      category: quickExp.category,
      date: new Date().toISOString().split('T')[0],
      payment_method: "credit_card",
      is_recurring: false,
      tags: ["quick-add"]
    };
    await onQuickExpense(expenseData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add</CardTitle>
        <CardDescription>Log common expenses with a single click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickExpenses.map((expense) => (
            <Button
              key={expense.label}
              variant="outline"
              onClick={() => handleQuickExpense(expense)}
              className="flex flex-col h-24 gap-2"
            >
              <expense.icon className="w-5 h-5" />
              <div className="text-center">
                <p className="text-sm font-semibold">{expense.label}</p>
                <p className="text-xs text-slate-500">${expense.amount}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}