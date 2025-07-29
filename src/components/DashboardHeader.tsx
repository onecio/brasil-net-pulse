import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  totalServices: number;
  onlineServices: number;
  lastUpdate: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const DashboardHeader = ({ 
  totalServices, 
  onlineServices, 
  lastUpdate, 
  onRefresh, 
  isRefreshing 
}: DashboardHeaderProps) => {
  const healthPercentage = totalServices > 0 ? Math.round((onlineServices / totalServices) * 100) : 100;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Brasil Net Pulse</h1>
        <p className="text-gray-400">Status em tempo real dos principais serviços online do Brasil</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-400">Última atualização</p>
          <p className="text-white font-semibold">{lastUpdate}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>
    </div>
  );
};