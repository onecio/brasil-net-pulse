import { StatusCard } from "./StatusCard";
import { Service } from "@/lib/monitoring";

interface ServiceSectionProps {
  title: string;
  services: Service[];
  icon?: React.ReactNode;
}

export const ServiceSection = ({ title, services, icon }: ServiceSectionProps) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {services.map((service, index) => (
          <StatusCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};