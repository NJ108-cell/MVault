import React from "react";
import { AlertTriangle, Lightbulb, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InsightCard({ insight }) {
  const getIcon = (type) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'tip': return Lightbulb;
      case 'trend': return TrendingUp;
      default: return DollarSign;
    }
  };

  const getStyle = (type) => {
    switch (type) {
      case 'warning': return { iconColor: "text-red-500", badgeVariant: "destructive" };
      case 'tip': return { iconColor: "text-green-500", badgeVariant: "default" };
      case 'trend': return { iconColor: "text-blue-500", badgeVariant: "outline" };
      default: return { iconColor: "text-slate-500", badgeVariant: "secondary" };
    }
  };

  const Icon = getIcon(insight.type);
  const style = getStyle(insight.type);

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full">
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{insight.title}</CardTitle>
          <Badge variant={style.badgeVariant} className="capitalize mt-1">{insight.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">
          {insight.message}
        </p>
      </CardContent>
      {insight.potentialSaving > 0 && (
        <CardFooter>
          <p className="text-sm font-semibold text-green-600">
            Potential Saving: ${insight.potentialSaving}/month
          </p>
        </CardFooter>
      )}
    </Card>
  );
}