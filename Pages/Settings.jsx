import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Settings as SettingsIcon, User as UserIcon, Globe, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import RegionSelector from "../components/settings/RegionSelector";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    department: '',
    job_title: '',
    monthly_budget: 0,
    notification_preferences: {
      email_reports: true,
      budget_alerts: true,
      weekly_summary: false
    }
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await base44.auth.me();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        department: userData.department || '',
        job_title: userData.job_title || '',
        monthly_budget: userData.monthly_budget || 0,
        notification_preferences: userData.notification_preferences || {
          email_reports: true,
          budget_alerts: true,
          weekly_summary: false
        }
      });
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe(formData);
      await loadUser(); // Refresh user data
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <span className="text-xl font-medium text-charcoal">Loading Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-gold p-3 rounded-xl shadow-lg">
          <SettingsIcon className="w-8 h-8 text-charcoal" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Account Settings</h1>
          <p className="text-lg text-charcoal/70">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-charcoal text-cream rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="border-tan focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                className="border-tan focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Finance, Marketing, etc."
                className="border-tan focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                placeholder="Senior Manager, Developer, etc."
                className="border-tan focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly_budget">Monthly Budget</Label>
              <Input
                id="monthly_budget"
                type="number"
                min="0"
                step="0.01"
                value={formData.monthly_budget}
                onChange={(e) => setFormData(prev => ({ ...prev, monthly_budget: parseFloat(e.target.value) || 0 }))}
                className="border-tan focus:border-gold"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gold text-charcoal hover:bg-gold/90"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-charcoal text-cream rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email_reports">Email Reports</Label>
                <p className="text-sm text-slate-600">Receive monthly expense reports</p>
              </div>
              <Switch
                id="email_reports"
                checked={formData.notification_preferences.email_reports}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notification_preferences: {
                      ...prev.notification_preferences,
                      email_reports: checked
                    }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="budget_alerts">Budget Alerts</Label>
                <p className="text-sm text-slate-600">Get notified when approaching budget limits</p>
              </div>
              <Switch
                id="budget_alerts"
                checked={formData.notification_preferences.budget_alerts}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notification_preferences: {
                      ...prev.notification_preferences,
                      budget_alerts: checked
                    }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly_summary">Weekly Summary</Label>
                <p className="text-sm text-slate-600">Weekly spending summary emails</p>
              </div>
              <Switch
                id="weekly_summary"
                checked={formData.notification_preferences.weekly_summary}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notification_preferences: {
                      ...prev.notification_preferences,
                      weekly_summary: checked
                    }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Region Settings */}
      <RegionSelector user={user} onUpdate={loadUser} />
    </div>
  );
}