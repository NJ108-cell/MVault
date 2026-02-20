import React from "react";
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function SpendingPatterns({ expenses }) {
  const weekdaySpending = expenses.reduce((acc, exp) => {
    const day = new Date(exp.date).getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[day];
    acc[dayName] = (acc[dayName] || 0) + exp.amount;
    return acc;
  }, {});

  const highestDay = Object.entries(weekdaySpending)
    .sort(([,a], [,b]) => b - a)[0];
  
  const avgPerExpense = expenses.length > 0 ? (expenses.reduce((s, e) => s + e.amount, 0) / expenses.length) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Spending Patterns</CardTitle>
        <CardDescription>An overview of your spending habits by day.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-slate-50 rounded-lg border">
            <p className="text-xs text-slate-500">Busiest Day</p>
            <p className="text-lg font-bold">{highestDay ? highestDay[0] : 'N/A'}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border">
            <p className="text-xs text-slate-500">Avg. Transaction</p>
            <p className="text-lg font-bold">${avgPerExpense.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => {
            const amount = weekdaySpending[day] || 0;
            const maxAmount = Math.max(1, ...Object.values(weekdaySpending));
            const height = (amount / maxAmount) * 100;
            
            return (
              <div key={day} className="text-center group flex flex-col-reverse items-center">
                <p className="text-xs text-slate-500 mt-1">{day}</p>
                <div className="w-full h-24 bg-slate-100 rounded flex items-end">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}