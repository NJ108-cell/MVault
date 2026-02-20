import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

const categories = [
  "food", "transportation", "housing", "utilities", "entertainment",
  "shopping", "healthcare", "education", "travel", "other"
];

export default function BudgetForm({ budget, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(budget || {
    name: "",
    category: "",
    monthly_limit: "",
    alert_threshold: 80,
    is_active: true,
    period_start: new Date().toISOString().split('T')[0],
    period_end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      monthly_limit: parseFloat(formData.monthly_limit),
      alert_threshold: parseFloat(formData.alert_threshold)
    });
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle>{budget ? 'Edit Budget' : 'Create New Budget'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Budget Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Monthly Groceries"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthly_limit">Monthly Limit ($)</Label>
              <Input
                id="monthly_limit"
                type="number"
                step="0.01"
                min="0"
                value={formData.monthly_limit}
                onChange={(e) => setFormData(prev => ({ ...prev, monthly_limit: e.target.value }))}
                placeholder="500.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert_threshold">Alert Threshold (%)</Label>
              <Input
                id="alert_threshold"
                type="number"
                min="1"
                max="100"
                value={formData.alert_threshold}
                onChange={(e) => setFormData(prev => ({ ...prev, alert_threshold: e.target.value }))}
                placeholder="80"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="period_start">Period Start</Label>
              <Input
                id="period_start"
                type="date"
                value={formData.period_start}
                onChange={(e) => setFormData(prev => ({ ...prev, period_start: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period_end">Period End</Label>
              <Input
                id="period_end"
                type="date"
                value={formData.period_end}
                onChange={(e) => setFormData(prev => ({ ...prev, period_end: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              {budget ? 'Update Budget' : 'Create Budget'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}