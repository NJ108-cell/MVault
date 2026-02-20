import React, { useState, useEffect } from "react";
import { FinancialGoal } from "@/entities/FinancialGoal";
import { Trophy, Plus, PenSquare, Trash2, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import GoalForm from "../components/goals/GoalForm";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const goalData = await FinancialGoal.list("-created_date");
      setGoals(goalData);
    } catch (error) {
      console.error("Error loading goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (goalData) => {
    try {
      if (editingGoal) {
        await FinancialGoal.update(editingGoal.id, goalData);
      } else {
        await FinancialGoal.create(goalData);
      }
      setShowForm(false);
      setEditingGoal(null);
      loadGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleDelete = async (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await FinancialGoal.delete(goalId);
        loadGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      emergency: '🚨',
      vacation: '🏖️',
      investment: '📈',
      purchase: '🛍️',
      retirement: '🏦',
      other: '🎯'
    };
    return icons[category] || '🎯';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeGoals = goals.filter(g => !g.is_achieved);
  const completedGoals = goals.filter(g => g.is_achieved);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Financial Goals</h1>
          <p className="text-slate-600 mt-2">Set and track your financial aspirations</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {showForm && (
        <GoalForm
          goal={editingGoal}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
        />
      )}

      {goals.length === 0 && !showForm ? (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Goals Set</h3>
            <p className="text-slate-500 mb-6">Start planning your financial future by setting your first goal</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Set Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Goals ({activeGoals.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeGoals.map((goal) => {
                  const progress = (goal.current_amount / goal.target_amount) * 100;
                  const daysLeft = Math.ceil((new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                            <div>
                              <CardTitle className="text-lg">{goal.title}</CardTitle>
                              <p className="text-sm text-slate-500 capitalize">{goal.category}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingGoal(goal);
                                setShowForm(true);
                              }}
                            >
                              <PenSquare className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDelete(goal.id)}
                              className="hover:bg-red-50 hover:border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority} priority
                          </Badge>
                          
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold">
                                ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                              </span>
                              <span className="text-sm font-medium text-purple-600">
                                {progress.toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2 [&>div]:bg-purple-500" />
                          </div>
                          
                          <div className="flex justify-between text-sm text-slate-600">
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                            <span>${(goal.target_amount - goal.current_amount).toLocaleString()} to go</span>
                          </div>
                          
                          {goal.description && (
                            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                              {goal.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-600" />
                Completed Goals ({completedGoals.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedGoals.map((goal) => (
                  <Card key={goal.id} className="bg-green-50 border-green-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                        <div>
                          <CardTitle className="text-lg text-green-800">{goal.title}</CardTitle>
                          <p className="text-sm text-green-600 capitalize">{goal.category} - Completed!</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-green-800">
                            ${goal.target_amount.toLocaleString()}
                          </span>
                          <Trophy className="w-5 h-5 text-green-600" />
                        </div>
                        <Progress value={100} className="h-2 [&>div]:bg-green-500" />
                        <p className="text-sm text-green-600">🎉 Goal achieved!</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}