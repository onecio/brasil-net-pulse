import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Activity, Globe, Shield } from "lucide-react";

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
  const healthPercentage = Math.round((onlineServices / totalServices) * 100);
  
  return (
    <header className="bg-gradient-to-r from-primary via-secondary to-accent p-6 rounded-lg shadow-[var(--shadow-brazil)] mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Monitor Brasil</h1>
            <p className="text-white/90">Monitoramento em tempo real da infraestrutura digital brasileira</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{healthPercentage}%</div>
              <div className="text-sm text-white/80">Saúde Geral</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{onlineServices}/{totalServices}</div>
              <div className="text-sm text-white/80">Serviços Online</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              <Globe className="h-3 w-3 mr-1" />
              Brasil
            </Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              <Shield className="h-3 w-3 mr-1" />
              Tempo Real
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-white/80">
        Última atualização: {lastUpdate}
      </div>
    </header>
  );
};