import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { InvokeLLM } from "@/integrations/Core";
import InsightCard from "../components/insights/InsightCard";
import SavingsSuggestions from "../components/insights/SavingsSuggestions";
import SpendingPatterns from "../components/insights/SpendingPatterns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Insights() {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingInsights, setGeneratingInsights] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const expenseData = await base44.entities.Expense.list("-date", 100);
        setExpenses(expenseData);
        if (expenseData.length > 0) {
          generateInsights(expenseData);
        }
      } catch (error) {
        console.error("Error loading expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const generateInsights = async (expenseData) => {
    setGeneratingInsights(true);
    try {
      const totalSpent = expenseData.reduce((sum, exp) => sum + exp.amount, 0);
      const avgDaily = totalSpent / 30;
      
      const categoryBreakdown = expenseData.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {});

      const topCategory = Object.entries(categoryBreakdown)
        .sort(([,a], [,b]) => b - a)[0];

      const prompt = `Analyze this spending data and provide 3 specific, actionable financial insights:

      Total spent: $${totalSpent}
      Daily average: $${avgDaily.toFixed(2)}
      Top spending category: ${topCategory?.[0]} ($${topCategory?.[1]})
      Category breakdown: ${JSON.stringify(categoryBreakdown)}

      Format as JSON array with objects having: type (warning/tip/trend), title, message, potentialSaving (number or 0)`;

      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            insights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  title: { type: "string" },
                  message: { type: "string" },
                  potentialSaving: { type: "number" }
                }
              }
            }
          }
        }
      });

      setInsights(result.insights || []);
    } catch (error) {
      setInsights([
        {
          type: "tip",
          title: "Start Tracking",
          message: "Add more expenses to get personalized AI insights!",
          potentialSaving: 0
        }
      ]);
    } finally {
      setGeneratingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="w-6 h-6 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="font-medium text-lg">Analyzing Your Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Insights ({generatingInsights ? "Processing..." : insights.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {generatingInsights ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <SavingsSuggestions expenses={expenses} />
        <SpendingPatterns expenses={expenses} />
      </div>
    </div>
  );
}