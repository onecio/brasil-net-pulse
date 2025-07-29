import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatisticsOverview } from "@/components/StatisticsOverview";
import { ServiceSection } from "@/components/ServiceSection";
import { generateMockData } from "@/data/monitoringData";
import { 
  Router, 
  Cloud, 
  Server, 
  Building2, 
  Globe, 
  Mail, 
  CreditCard, 
  Users, 
  Layers,
  Shield
} from "lucide-react";

const Index = () => {
  const [data, setData] = useState(generateMockData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString('pt-BR'));

  // Calcular estatísticas
  const allServices = [
    ...data.ptts,
    ...data.microsoft,
    ...data.cloudflare,
    ...data.serpro,
    ...data.government,
    ...data.google,
    ...data.banks,
    ...data.social,
    ...data.cdns
  ];

  const totalServices = allServices.length;
  const onlineServices = allServices.filter(service => service.status === "online").length;
  const avgLatency = Math.round(allServices.reduce((acc, service) => acc + (service.latency || 0), 0) / totalServices);
  const totalIncidents = allServices.filter(service => service.status === "offline").length;
  const uptime = Math.round((onlineServices / totalServices) * 100);
  const responseTime = Math.round(allServices.reduce((acc, service) => acc + (service.latency || 0), 0) / totalServices);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateMockData());
      setLastUpdate(new Date().toLocaleString('pt-BR'));
      setIsRefreshing(false);
    }, 2000);
  };

  // Auto-refresh a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
      setLastUpdate(new Date().toLocaleString('pt-BR'));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader
          totalServices={totalServices}
          onlineServices={onlineServices}
          lastUpdate={lastUpdate}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <StatisticsOverview
          avgLatency={avgLatency}
          totalIncidents={totalIncidents}
          uptime={uptime}
          responseTime={responseTime}
        />

        <ServiceSection
          title="Pontos de Troca de Tráfego (PTTs)"
          services={data.ptts}
          icon={<Router className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Microsoft Azure & Office 365"
          services={data.microsoft}
          icon={<Cloud className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Cloudflare"
          services={data.cloudflare}
          icon={<Server className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="SERPRO"
          services={data.serpro}
          icon={<Shield className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Governo Federal"
          services={data.government}
          icon={<Building2 className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Google Services"
          services={data.google}
          icon={<Mail className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Bancos Brasileiros"
          services={data.banks}
          icon={<CreditCard className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="Redes Sociais"
          services={data.social}
          icon={<Users className="h-6 w-6 text-primary" />}
        />

        <ServiceSection
          title="CDNs"
          services={data.cdns}
          icon={<Layers className="h-6 w-6 text-primary" />}
        />

        <footer className="mt-12 py-6 border-t border-border/50">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Outros Recursos de Monitoramento</h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <a href="https://ix.br/trafego/pix/df" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tráfego PIX DF</a>
              <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Downdetector</a>
              <a href="https://www.thousandeyes.com/outages/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">ThousandEyes Outages</a>
              <a href="https://www.cloudflarestatus.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cloudflare Status</a>
              <a href="https://ix.br/trafego/agregado/df" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tráfego Agregado DF</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
