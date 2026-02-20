import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExpenseChart({ expenses }) {
  const last7Days = Array.from({length: 7}, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dayExpenses = expenses.filter(exp => {
      const expDate = startOfDay(new Date(exp.date));
      return expDate.getTime() === date.getTime();
    });
    const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      date: format(date, 'EEE'),
      amount: total
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Spending Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value}`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              width={50}
            />
            <Tooltip 
              cursor={{fill: 'rgba(2, 132, 199, 0.1)'}}
              formatter={(value) => `$${Number(value).toFixed(2)}`}
              labelStyle={{ fontWeight: 'bold' }}
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
              }}
            />
            <Bar 
              dataKey="amount" 
              name="Amount Spent"
              fill="#0284c7" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}