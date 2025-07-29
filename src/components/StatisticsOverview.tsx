import { Card } from "@/components/ui/card";
import { Zap, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatisticCard = ({ title, value, icon }: StatisticCardProps) => {
  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700/50 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="p-3 bg-gray-700/50 rounded-full">
        {icon}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatisticCard
        title="Uptime Geral"
        value={`${uptime}%`}
        icon={<CheckCircle className="h-6 w-6 text-green-400" />}
      />
      <StatisticCard
        title="Latência Média"
        value={`${avgLatency}ms`}
        icon={<Clock className="h-6 w-6 text-yellow-400" />}
      />
      <StatisticCard
        title="Incidentes (24h)"
        value={totalIncidents.toString()}
        icon={<AlertCircle className="h-6 w-6 text-red-400" />}
      />
      <StatisticCard
        title="Tempo de Resposta"
        value={`${responseTime}ms`}
        icon={<Zap className="h-6 w-6 text-blue-400" />}
      />
    </div>
  );
};