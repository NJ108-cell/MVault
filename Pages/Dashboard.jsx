import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { InvokeLLM } from "@/integrations/Core";
import { 
  Crown,
  TrendingUp,
  AlertTriangle,
  Target
} from "lucide-react";

import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import QuickStats from "../components/dashboard/QuickStats";
import BudgetOverview from "../components/dashboard/BudgetOverview";
import GoalProgress from "../components/dashboard/GoalProgress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expenseData, budgetData, goalData, userData] = await Promise.all([
          base44.entities.Expense.list("-date", 50),
          base44.entities.Budget.list("-created_date"),
          base44.entities.FinancialGoal.list("-created_date"),
          base44.auth.me()
        ]);
        
        setExpenses(expenseData);
        setBudgets(budgetData);
        setGoals(goalData);
        setUser(userData);
        
        if (expenseData.length > 0) {
          generateAIInsight(expenseData, budgetData, goalData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const generateAIInsight = async (expenseData, budgetData, goalData) => {
    setInsightLoading(true);
    try {
      const totalSpent = expenseData.reduce((sum, exp) => sum + exp.amount, 0);
      const categorySummary = expenseData.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {});

      const budgetStatus = budgetData.map(b => ({
        category: b.category,
        spent: b.current_spent,
        limit: b.monthly_limit,
        percentage: (b.current_spent / b.monthly_limit) * 100
      }));

      const prompt = `As a luxury financial advisor, analyze this data and provide ONE sophisticated insight in 20 words or less:
      Total spent: $${totalSpent}
      Categories: ${JSON.stringify(categorySummary)}
      Budget status: ${JSON.stringify(budgetStatus)}
      Active goals: ${goalData.length}`;

      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      setAiInsight(result);
    } catch (error) {
      setAiInsight("Your financial portfolio is ready for premium analysis!");
    } finally {
      setInsightLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <span className="text-xl font-medium text-charcoal">Preparing Your Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-charcoal p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-bold">Welcome back, {user?.full_name?.split(' ')[0] || 'Valued Client'}</h1>
          </div>
          <p className="text-xl text-cream/80">Your financial overview awaits</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-gold/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* AI Insight */}
      <Alert className="border-tan bg-cream">
        <Crown className="h-5 w-5 text-tan" />
        <AlertTitle className="text-charcoal">Premium AI Advisory</AlertTitle>
        <AlertDescription className="text-charcoal/80">
          {insightLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-tan/30 border-t-tan rounded-full animate-spin"></div>
              <span>Analyzing your portfolio...</span>
            </div>
          ) : (
            aiInsight || "Connect with our AI advisor by adding more transactions!"
          )}
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <QuickStats expenses={expenses} budgets={budgets} goals={goals} />

      {/* Budget & Goals Overview */}
      <div className="grid lg:grid-cols-2 gap-8">
        <BudgetOverview budgets={budgets} expenses={expenses} />
        <GoalProgress goals={goals} />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <ExpenseChart expenses={expenses} />
        </div>
        <div className="lg:col-span-2">
          <CategoryBreakdown expenses={expenses} />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentExpenses expenses={expenses} />
    </div>
  );
}