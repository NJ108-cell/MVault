import React from "react";
import { base44 } from "@/api/base44Client";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Target,
  Crown,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, translate } from "../utils/localization";

export default function QuickStats({ expenses, budgets, goals }) {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const thisMonth = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    const now = new Date();
    return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
  });
  const thisMonthSpent = thisMonth.reduce((sum, exp) => sum + exp.amount, 0);
  
  const totalBudget = budgets.reduce((sum, b) => sum + b.monthly_limit, 0);
  const budgetUsed = (totalBudget > 0 ? (thisMonthSpent / totalBudget) * 100 : 0);
  
  const activeGoals = goals.filter(g => !g.is_achieved).length;
  const goalProgress = goals.length > 0 ? 
    goals.reduce((sum, g) => sum + (g.current_amount / g.target_amount) * 100, 0) / goals.length : 0;

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        // Not logged in
      }
    };
    fetchUser();
  }, []);

  const userLanguage = user?.language || 'en';

  const stats = [
    {
      title: translate("portfolioValue", userLanguage),
      value: formatCurrency(totalSpent, user),
      subtitle: translate("totalTracked", userLanguage),
      icon: Crown,
      bgColor: "bg-gold",
      textColor: "text-charcoal",
    },
    {
      title: translate("monthlyExpenses", userLanguage),
      value: formatCurrency(thisMonthSpent, user),
      subtitle: `${budgetUsed.toFixed(1)}% of Budget`,
      icon: Calendar,
      bgColor: "bg-tan",
      textColor: "text-charcoal",
    },
    {
      title: translate("budgetStatus", userLanguage), 
      value: `${budgetUsed.toFixed(0)}%`,
      subtitle: `${formatCurrency(totalBudget - thisMonthSpent, user)} ${translate("remaining", userLanguage)}`,
      icon: budgetUsed > 80 ? AlertTriangle : TrendingUp,
      bgColor: "bg-charcoal",
      textColor: "text-cream",
    },
    {
      title: translate("financialGoals", userLanguage),
      value: activeGoals.toString(),
      subtitle: `${goalProgress.toFixed(0)}% ${translate("averageProgress", userLanguage)}`,
      icon: Target,
      bgColor: "bg-white border-charcoal border",
      textColor: "text-charcoal",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor}`}>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-bold ${stat.textColor}`}>{stat.title}</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg">
              <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className={`text-2xl font-bold mb-1 ${stat.textColor}`}>{stat.value}</div>
            <p className={`text-xs ${stat.textColor} opacity-80`}>{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
