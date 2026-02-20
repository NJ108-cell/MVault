import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Target, Plus, PenSquare, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BudgetForm from "../components/budgets/BudgetForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [budgetData, expenseData] = await Promise.all([
        base44.entities.Budget.list("-created_date"),
        base44.entities.Expense.list("-date", 100)
      ]);
      setBudgets(budgetData);
      setExpenses(expenseData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (budgetData) => {
    try {
      if (editingBudget) {
        await base44.entities.Budget.update(editingBudget.id, budgetData);
      } else {
        await base44.entities.Budget.create(budgetData);
      }
      setShowForm(false);
      setEditingBudget(null);
      loadData();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  const handleDelete = async (budgetId) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await base44.entities.Budget.delete(budgetId);
        loadData();
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    }
  };

  const getBudgetStatus = (budget) => {
    const thisMonth = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      const now = new Date();
      return expDate.getMonth() === now.getMonth() && 
             expDate.getFullYear() === now.getFullYear() &&
             exp.category === budget.category;
    });

    const spent = thisMonth.reduce((sum, exp) => sum + exp.amount, 0);
    const percentage = budget.monthly_limit > 0 ? (spent / budget.monthly_limit) * 100 : 0;

    return {
      spent,
      percentage,
      remaining: Math.max(0, budget.monthly_limit - spent),
      status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good'
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Budget Management</h1>
          <p className="text-slate-600 mt-2">Track and control your spending with intelligent budgets</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {showForm && (
        <BudgetForm
          budget={editingBudget}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBudget(null);
          }}
        />
      )}

      {budgets.length === 0 && !showForm ? (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Budgets Created</h3>
            <p className="text-slate-500 mb-6">Start managing your finances by creating your first budget</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Budget
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const status = getBudgetStatus(budget);
            return (
              <Card key={budget.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="capitalize text-lg">{budget.category}</CardTitle>
                      <p className="text-sm text-slate-500 mt-1">{budget.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingBudget(budget);
                          setShowForm(true);
                        }}
                      >
                        <PenSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(budget.id)}
                        className="hover:bg-red-50 hover:border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        ${status.spent.toFixed(2)} / ${budget.monthly_limit.toFixed(2)}
                      </span>
                      <span className={`text-sm font-medium ${
                        status.status === 'exceeded' ? 'text-red-600' :
                        status.status === 'warning' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {status.percentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    <Progress 
                      value={Math.min(100, status.percentage)} 
                      className={`h-2 ${
                        status.status === 'exceeded' ? '[&>div]:bg-red-500' :
                        status.status === 'warning' ? '[&>div]:bg-orange-500' :
                        '[&>div]:bg-green-500'
                      }`}
                    />
                    
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Remaining: ${status.remaining.toFixed(2)}</span>
                      <span className={
                        status.status === 'exceeded' ? 'text-red-600 font-medium' :
                        status.status === 'warning' ? 'text-orange-600' : ''
                      }>
                        {status.status === 'exceeded' ? 'Over Budget!' :
                         status.status === 'warning' ? 'Almost there' : 'On track'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}