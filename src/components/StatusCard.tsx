import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Service } from "@/lib/monitoring";
import LatencyChart from "./LatencyChart"; // Import the new component

const statusConfig = {
  online: {
    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    text: "Online",
    badgeClass: "bg-green-400/10 text-green-400 border-green-400/20",
  },
  slow: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    text: "Lento",
    badgeClass: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  },
  offline: {
    icon: <XCircle className="h-5 w-5 text-red-400" />,
    text: "Offline",
    badgeClass: "bg-red-400/10 text-red-400 border-red-400/20",
  },
  checking: {
    icon: <Clock className="h-5 w-5 text-gray-400 animate-spin" />,
    text: "Verificando...",
    badgeClass: "bg-gray-400/10 text-gray-400 border-gray-400/20",
  },
};

export const StatusCard = (service: Service) => {
  const config = statusConfig[service.status] || statusConfig.checking;

  return (
    <div className="flex flex-col p-3 bg-gray-900/50 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {config.icon}
          <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
            {service.name}
          </a>
        </div>
        <div className="flex items-center gap-4">
          {service.latency > 0 && (
            <span className="text-xs text-gray-400">{service.latency}ms</span>
          )}
          <Badge variant="outline" className={`px-2 py-1 text-xs rounded-full ${config.badgeClass}`}>
            {config.text}
          </Badge>
        </div>
      </div>
      {service.latencyHistory && service.latencyHistory.length > 0 && (
        <div className="mt-2">
          <LatencyChart data={service.latencyHistory} />
        </div>
      )}
    </div>
  );
};