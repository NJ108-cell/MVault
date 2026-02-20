import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoryBreakdown({ expenses }) {
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  const colors = [
    "text-blue-600",
    "text-sky-500", 
    "text-cyan-500",
    "text-teal-500",
    "text-emerald-500",
    "text-green-500"
  ];
  
  const bgColors = [
    "bg-blue-600",
    "bg-sky-500", 
    "bg-cyan-500",
    "bg-teal-500",
    "bg-emerald-500",
    "bg-green-500"
  ];

  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedCategories.map(([category, amount], index) => {
          const percentage = total > 0 ? (amount / total) * 100 : 0;
          return (
            <div key={category}>
              <div className="flex justify-between items-center mb-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${bgColors[index]}`}></div>
                  <span className="font-medium capitalize text-slate-700">{category}</span>
                </div>
                <span className="font-semibold text-slate-800">
                  ${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
              <div className="bg-slate-200 rounded-full h-1.5 w-full">
                <div 
                  className={`h-full rounded-full ${bgColors[index]}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        {sortedCategories.length === 0 && (
          <p className="text-center text-slate-500 py-8">No expenses to display.</p>
        )}
      </CardContent>
    </Card>
  );
}