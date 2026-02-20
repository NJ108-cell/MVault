
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, Target } from "lucide-react";

export default function BudgetOverview({ budgets, expenses }) {
  const thisMonth = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    const now = new Date();
    return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
  });

  const budgetStatus = budgets.map(budget => {
    const spent = thisMonth
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const percentage = budget.monthly_limit > 0 ? (spent / budget.monthly_limit) * 100 : 0;
    
    return {
      ...budget,
      spent,
      percentage,
      remaining: Math.max(0, budget.monthly_limit - spent),
      status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good'
    };
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'exceeded': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'good': return CheckCircle2;
      default: return Target;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeded': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-tan bg-cream border-tan';
      case 'good': return 'text-charcoal bg-gold/30 border-gold/50';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-charcoal text-cream rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          mOney tRacker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {budgetStatus.length > 0 ? budgetStatus.map((budget) => {
            const StatusIcon = getStatusIcon(budget.status);
            return (
              <div key={budget.id} className={`p-4 rounded-lg border ${getStatusColor(budget.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4" />
                    <span className="font-semibold capitalize">{budget.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${budget.spent.toFixed(2)} / ${budget.monthly_limit.toFixed(2)}</p>
                    <p className="text-xs opacity-80">${budget.remaining.toFixed(2)} remaining</p>
                  </div>
                </div>
                <Progress 
                  value={Math.min(100, budget.percentage)} 
                  className={`h-2 ${
                    budget.status === 'exceeded' ? '[&>div]:bg-red-500' :
                    budget.status === 'warning' ? '[&>div]:bg-tan' :
                    '[&>div]:bg-gold'
                  }`}
                />
                <p className="text-xs mt-2 opacity-80">
                  {budget.percentage.toFixed(1)}% used
                </p>
              </div>
            );
          }) : (
            <div className="text-center py-8 text-slate-500">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No budgets set up</p>
              <p className="text-sm">Create budgets to track your spending limits</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
