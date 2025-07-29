
import { useState, useEffect } from "react";

export interface Service {
  name: string;
  url: string;
  status: "online" | "slow" | "offline" | "checking";
  latency: number;
  uptime: number;
  lastChecked: string;
  description: string;
}

export const checkServiceStatus = async (service: Omit<Service, "status" | "latency" | "uptime" | "lastChecked">): Promise<Service> => {
  const startTime = Date.now();
  let status: "online" | "slow" | "offline" = "offline";
  let latency = -1;

  try {
    const response = await fetch(service.url, { method: 'HEAD', mode: 'no-cors' });
    const endTime = Date.now();
    latency = endTime - startTime;

    if (response.type === 'opaque') {
      status = latency > 1000 ? "slow" : "online";
    } else {
      status = response.ok && latency <= 1000 ? "online" : "slow";
    }
  } catch (error) {
    status = "offline";
  }

  return {
    ...service,
    status,
    latency,
    uptime: 0, // This will be calculated based on historical data
    lastChecked: new Date().toLocaleString("pt-BR"),
  };
};

export const useServiceMonitoring = (initialServices: Omit<Service, "status" | "latency" | "uptime" | "lastChecked">[]) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllServices = async () => {
      setLoading(true);
      const promises = initialServices.map(service => checkServiceStatus(service));
      const results = await Promise.all(promises);
      setServices(results);
      setLoading(false);
    };

    fetchAllServices();
    const interval = setInterval(fetchAllServices, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [initialServices]);

  return { services, loading };
};
