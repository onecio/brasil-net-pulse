import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

interface StatusCardProps {
  name: string;
  url?: string;
  status: "online" | "slow" | "offline" | "checking";
  latency?: number;
  uptime?: number;
  lastChecked?: string;
  description?: string;
}

export const StatusCard = ({ 
  name, 
  url, 
  status, 
  latency, 
  uptime, 
  lastChecked, 
  description 
}: StatusCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "slow":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "offline":
        return <XCircle className="h-5 w-5 text-danger" />;
      case "checking":
        return <Clock className="h-5 w-5 text-muted-foreground animate-spin" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "online":
        return <Badge className="bg-success text-success-foreground">Online</Badge>;
      case "slow":
        return <Badge className="bg-warning text-warning-foreground">Lento</Badge>;
      case "offline":
        return <Badge className="bg-danger text-danger-foreground">Offline</Badge>;
      case "checking":
        return <Badge variant="outline">Verificando...</Badge>;
    }
  };

  return (
    <Card className="p-4 hover:shadow-[var(--shadow-status)] transition-all duration-300 hover:scale-105 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-semibold text-card-foreground">{name}</h3>
        </div>
        {getStatusBadge()}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      
      {url && (
        <p className="text-xs text-muted-foreground mb-2 truncate">{url}</p>
      )}
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        {latency && (
          <div>
            <span className="text-muted-foreground">Latência:</span>
            <span className="ml-1 font-medium text-card-foreground">{latency}ms</span>
          </div>
        )}
        
        {uptime && (
          <div>
            <span className="text-muted-foreground">Uptime:</span>
            <span className="ml-1 font-medium text-card-foreground">{uptime}%</span>
          </div>
        )}
      </div>
      
      {lastChecked && (
        <p className="text-xs text-muted-foreground mt-2">
          Última verificação: {lastChecked}
        </p>
      )}
    </Card>
  );
};