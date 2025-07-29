import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon: React.ReactNode;
  color: "success" | "warning" | "danger" | "primary";
}

const StatisticCard = ({ title, value, trend, trendValue, icon, color }: StatisticCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      case "stable":
        return <Minus className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "border-l-success bg-success/5";
      case "warning":
        return "border-l-warning bg-warning/5";
      case "danger":
        return "border-l-danger bg-danger/5";
      default:
        return "border-l-primary bg-primary/5";
    }
  };

  return (
    <Card className={`p-4 border-l-4 ${getColorClasses()} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-1">
              {getTrendIcon()}
              <span className="text-sm text-muted-foreground">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color === 'success' ? 'bg-success/20' : color === 'warning' ? 'bg-warning/20' : color === 'danger' ? 'bg-danger/20' : 'bg-primary/20'}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface StatisticsOverviewProps {
  avgLatency: number;
  totalIncidents: number;
  uptime: number;
  responseTime: number;
}

export const StatisticsOverview = ({ avgLatency, totalIncidents, uptime, responseTime }: StatisticsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatisticCard
        title="Latência Média"
        value={`${avgLatency}ms`}
        trend={avgLatency < 100 ? "up" : avgLatency > 200 ? "down" : "stable"}
        trendValue={avgLatency < 100 ? "Excelente" : avgLatency > 200 ? "Atenção" : "Normal"}
        icon={<Zap className={`h-6 w-6 ${avgLatency < 100 ? 'text-success' : avgLatency > 200 ? 'text-danger' : 'text-warning'}`} />}
        color={avgLatency < 100 ? "success" : avgLatency > 200 ? "danger" : "warning"}
      />
      
      <StatisticCard
        title="Incidentes (24h)"
        value={totalIncidents.toString()}
        trend={totalIncidents === 0 ? "up" : totalIncidents < 5 ? "stable" : "down"}
        trendValue={totalIncidents === 0 ? "Nenhum" : totalIncidents < 5 ? "Poucos" : "Muitos"}
        icon={<TrendingUp className={`h-6 w-6 ${totalIncidents === 0 ? 'text-success' : totalIncidents < 5 ? 'text-warning' : 'text-danger'}`} />}
        color={totalIncidents === 0 ? "success" : totalIncidents < 5 ? "warning" : "danger"}
      />
      
      <StatisticCard
        title="Uptime Geral"
        value={`${uptime}%`}
        trend={uptime >= 99 ? "up" : uptime >= 95 ? "stable" : "down"}
        trendValue={uptime >= 99 ? "Excelente" : uptime >= 95 ? "Bom" : "Crítico"}
        icon={<TrendingUp className={`h-6 w-6 ${uptime >= 99 ? 'text-success' : uptime >= 95 ? 'text-warning' : 'text-danger'}`} />}
        color={uptime >= 99 ? "success" : uptime >= 95 ? "warning" : "danger"}
      />
      
      <StatisticCard
        title="Tempo de Resposta"
        value={`${responseTime}ms`}
        trend={responseTime < 500 ? "up" : responseTime > 1000 ? "down" : "stable"}
        trendValue={responseTime < 500 ? "Rápido" : responseTime > 1000 ? "Lento" : "Normal"}
        icon={<Zap className={`h-6 w-6 ${responseTime < 500 ? 'text-success' : responseTime > 1000 ? 'text-danger' : 'text-warning'}`} />}
        color={responseTime < 500 ? "success" : responseTime > 1000 ? "danger" : "warning"}
      />
    </div>
  );
};