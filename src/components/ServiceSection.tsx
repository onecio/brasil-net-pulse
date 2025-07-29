import { StatusCard } from "./StatusCard";

interface Service {
  name: string;
  url?: string;
  status: "online" | "slow" | "offline" | "checking";
  latency?: number;
  uptime?: number;
  lastChecked?: string;
  description?: string;
}

interface ServiceSectionProps {
  title: string;
  services: Service[];
  icon?: React.ReactNode;
}

export const ServiceSection = ({ title, services, icon }: ServiceSectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <StatusCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};