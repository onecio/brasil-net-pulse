import { useState, useEffect, useMemo } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatisticsOverview } from "@/components/StatisticsOverview";
import { ServiceSection } from "@/components/ServiceSection";
import { servicesToMonitor } from "@/data/monitoringData";
import { useServiceMonitoring, Service } from "@/lib/monitoring";
import { 
  Router, 
  Cloud, 
  Server, 
  Building2, 
  Mail, 
  CreditCard, 
  Users, 
  Layers,
  Shield
} from "lucide-react";

const Index = () => {
  const allServicesToMonitor = useMemo(() => [
    ...servicesToMonitor.ptts,
    ...servicesToMonitor.microsoft,
    ...servicesToMonitor.cloudflare,
    ...servicesToMonitor.serpro,
    ...servicesToMonitor.government,
    ...servicesToMonitor.google,
    ...servicesToMonitor.banks,
    ...servicesToMonitor.social,
    ...servicesToMonitor.cdns
  ], []);

  const { services, loading } = useServiceMonitoring(allServicesToMonitor);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString('pt-BR'));

  useEffect(() => {
    if (!loading) {
      setLastUpdate(new Date().toLocaleString('pt-BR'));
    }
  }, [loading]);

  const getServicesByCategory = (category: keyof typeof servicesToMonitor) => {
    const categoryUrls = servicesToMonitor[category].map(s => s.url);
    return services.filter(s => categoryUrls.includes(s.url));
  };

  const totalServices = services.length;
  const onlineServices = services.filter(service => service.status === "online").length;
  const avgLatency = Math.round(services.reduce((acc, service) => acc + (service.latency || 0), 0) / totalServices) || 0;
  const totalIncidents = services.filter(service => service.status === "offline").length;
  const uptime = totalServices > 0 ? Math.round((onlineServices / totalServices) * 100) : 100;
  const responseTime = avgLatency;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader
          totalServices={totalServices}
          onlineServices={onlineServices}
          lastUpdate={lastUpdate}
          onRefresh={() => window.location.reload()}
          isRefreshing={loading}
        />

        <StatisticsOverview
          avgLatency={avgLatency}
          totalIncidents={totalIncidents}
          uptime={uptime}
          responseTime={responseTime}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <ServiceSection
            title="Pontos de Troca de Tráfego (PTTs)"
            services={getServicesByCategory('ptts')}
            icon={<Router className="h-6 w-6 text-blue-400" />}
          />
          <ServiceSection
            title="Microsoft Azure & Office 365"
            services={getServicesByCategory('microsoft')}
            icon={<Cloud className="h-6 w-6 text-blue-400" />}
          />
          <ServiceSection
            title="Cloudflare"
            services={getServicesByCategory('cloudflare')}
            icon={<Server className="h-6 w-6 text-blue-400" />}
          />
          <ServiceSection
            title="SERPRO"
            services={getServicesByCategory('serpro')}
            icon={<Shield className="h-6 w-6 text-green-400" />}
          />
          <ServiceSection
            title="Governo Federal"
            services={getServicesByCategory('government')}
            icon={<Building2 className="h-6 w-6 text-green-40-0" />}
          />
          <ServiceSection
            title="Google Services"
            services={getServicesByCategory('google')}
            icon={<Mail className="h-6 w-6 text-red-400" />}
          />
          <ServiceSection
            title="Bancos Brasileiros"
            services={getServicesByCategory('banks')}
            icon={<CreditCard className="h-6 w-6 text-yellow-400" />}
          />
          <ServiceSection
            title="Redes Sociais"
            services={getServicesByCategory('social')}
            icon={<Users className="h-6 w-6 text-purple-400" />}
          />
          <ServiceSection
            title="CDNs"
            services={getServicesByCategory('cdns')}
            icon={<Layers className="h-6 w-6 text-indigo-400" />}
          />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-700">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-300">Outros Recursos de Monitoramento</h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <a href="https://ix.br/trafego/pix/df" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">Tráfego PIX DF</a>
            <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">Downdetector</a>
            <a href="https://www.thousandeyes.com/outages/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">ThousandEyes Outages</a>
            <a href="https://www.cloudflarestatus.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">Cloudflare Status</a>
            <a href="https://ix.br/trafego/agregado/df" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">Tráfego Agregado DF</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
