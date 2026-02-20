
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GoalProgress({ goals }) {
  const activeGoals = goals.filter(g => !g.is_achieved).slice(0, 4);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-tan/80 text-charcoal';
      case 'low': return 'bg-gold/50 text-charcoal';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'emergency': return '🚨';
      case 'vacation': return '🏖️';
      case 'investment': return '📈';
      case 'purchase': return '🛍️';
      case 'retirement': return '🏦';
      default: return '🎯';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-charcoal text-cream rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          mOney tRacker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {activeGoals.length > 0 ? activeGoals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            const daysLeft = Math.ceil((new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(goal.category)}</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">{goal.title}</h4>
                      <p className="text-xs text-slate-600 capitalize">{goal.category} goal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-3">
 