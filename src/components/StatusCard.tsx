import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useCheckOnline } from "@/hooks/use-check-online";

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
  // Checagem real de status online
  const isOnline = useCheckOnline(url);

  let icon, badge, bgClass;
  if (isOnline === null) {
    icon = <Clock className="h-7 w-7 text-muted-foreground animate-spin" />;
    badge = <Badge variant="outline" className="px-3 py-1 text-base rounded-full">Verificando...</Badge>;
    bgClass = 'from-gray-50 via-white to-gray-100';
  } else if (isOnline) {
    icon = <CheckCircle className="h-7 w-7 text-success drop-shadow-lg" />;
    badge = <Badge className="bg-success text-success-foreground px-3 py-1 text-base rounded-full shadow">Online</Badge>;
    bgClass = 'from-green-50 via-white to-green-100';
  } else {
    icon = <XCircle className="h-7 w-7 text-danger drop-shadow-lg" />;
    badge = <Badge className="bg-danger text-danger-foreground px-3 py-1 text-base rounded-full shadow">Offline</Badge>;
    bgClass = 'from-red-50 via-white to-red-100';
  }

  return (
    <Card className={`p-6 rounded-2xl shadow-xl border-0 bg-gradient-to-br ${bgClass} transition-all duration-300 hover:scale-[1.03]`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold text-xl text-card-foreground leading-tight drop-shadow-sm">{name}</h3>
        </div>
        {badge}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mb-2 italic">{description}</p>
      )}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline mb-2 block truncate">{url}</a>
      )}
    </Card>
  );
};