import React from "react";
import { Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SavingsSuggestions({ expenses }) {
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const suggestions = [
    {
      category: 'food',
      suggestion: 'Try cooking more meals at home instead of eating out.',
      potential: Math.round((categoryTotals.food || 0) * 0.2)
    },
    {
      category: 'entertainment',
      suggestion: 'Look for free local events or library resources.',
      potential: Math.round((categoryTotals.entertainment || 0) * 0.3)
    },
    {
      category: 'shopping', 
      suggestion: 'Consider a "no-spend" week for non-essential items.',
      potential: Math.round((categoryTotals.shopping || 0) * 0.15)
    }
  ].filter(s => s.potential > 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Suggestions</CardTitle>
        <CardDescription>AI-powered tips to help you save more.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length > 0 ? suggestions.map((suggestion) => (
          <div key={suggestion.category} className="p-3 bg-slate-50 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="secondary" className="capitalize">{suggestion.category}</Badge>
              <p className="text-sm font-semibold text-green-600">
                ~${suggestion.potential}/mo
              </p>
            </div>
            <p className="text-sm text-slate-600">{suggestion.suggestion}</p>
          </div>
        )) : (
          <div className="text-center py-8 text-slate-500">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">More expense data needed</p>
            <p className="text-sm">Log more transactions to get personalized savings tips.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}