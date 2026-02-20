import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { InvokeLLM } from "@/integrations/Core";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles } from "lucide-react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import QuickExpenseButtons from "../components/expenses/QuickExpenseButtons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AddExpense() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [smartCategorizing, setSmartCategorizing] = useState(false);

  const handleSubmit = async (expenseData) => {
    setLoading(true);
    try {
      await base44.entities.Expense.create(expenseData);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error creating expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const smartCategorize = async (description, amount) => {
    setSmartCategorizing(true);
    try {
      const result = await InvokeLLM({
        prompt: `Based on this expense description: "${description}" and amount: $${amount}, suggest the most appropriate category from: food, transportation, housing, utilities, entertainment, shopping, healthcare, education, travel, other. Respond with just the category name.`,
        add_context_from_internet: false
      });
      
      const category = result.toLowerCase().trim();
      const validCategories = ["food", "transportation", "housing", "utilities", "entertainment", "shopping", "healthcare", "education", "travel", "other"];
      
      return validCategories.includes(category) ? category : "other";
    } catch (error) {
      return "other";
    } finally {
      setSmartCategorizing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertTitle>AI-Powered Categorization</AlertTitle>
        <AlertDescription>
          Can't decide on a category? Type a description and amount, then click "Smart Categorize" and let AI handle it for you.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Log a New Expense</CardTitle>
          <CardDescription>Fill out the form below to add a new transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm
            onSubmit={handleSubmit}
            onSmartCategorize={smartCategorize}
            loading={loading}
            smartCategorizing={smartCategorizing}
          />
        </CardContent>
      </Card>

      <QuickExpenseButtons onQuickExpense={handleSubmit} />
    </div>
  );
}