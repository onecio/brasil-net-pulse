
import { useState, useEffect } from "react";

/**
 * @interface Service
 * @description Define a estrutura de dados para um serviço monitorado.
 * @property {string} name - Nome do serviço.
 * @property {string} url - URL do serviço a ser monitorado.
 * @property {"online" | "slow" | "offline" | "checking"} status - Status atual do serviço.
 * @property {number} latency - Latência da última verificação em milissegundos.
 * @property {number} uptime - Percentual de tempo que o serviço esteve online (ainda não implementado para histórico).
 * @property {string} lastChecked - Data e hora da última verificação.
 * @property {string} description - Descrição do serviço.
 * @property {Array<{ time: string; value: number }>} latencyHistory - Histórico de latências para gráficos.
 */
export interface Service {
  name: string;
  url: string;
  status: "online" | "slow" | "offline" | "checking";
  latency: number;
  uptime: number;
  lastChecked: string;
  description: string;
  latencyHistory: Array<{ time: string; value: number }>;
}

/**
 * @function checkServiceStatus
 * @description Realiza uma verificação de status e latência para um dado serviço.
 * @param {Omit<Service, "status" | "latency" | "uptime" | "lastChecked" | "latencyHistory">} service - Objeto de serviço com nome, URL e descrição.
 * @returns {Promise<Service>} Um objeto Service atualizado com status, latência e data da última verificação.
 */
export const checkServiceStatus = async (service: Omit<Service, "status" | "latency" | "uptime" | "lastChecked" | "latencyHistory">): Promise<Service> => {
  const startTime = Date.now();
  let status: "online" | "slow" | "offline" = "offline";
  let latency = -1;

  try {
    // Tenta fazer uma requisição HEAD para a URL do serviço.
    // 'no-cors' é usado para evitar erros de CORS, mas limita a informação da resposta.
    const response = await fetch(service.url, { method: 'HEAD', mode: 'no-cors' });
    const endTime = Date.now();
    latency = endTime - startTime;

    // Se a resposta for opaca (devido ao no-cors), o status é inferido apenas pela latência.
    // Caso contrário, verifica response.ok e latência.
    if (response.type === 'opaque') {
      status = latency > 1000 ? "slow" : "online";
    } else {
      status = response.ok && latency <= 1000 ? "online" : "slow";
    }
  } catch (error) {
    // Se ocorrer um erro na requisição (ex: rede offline, DNS não resolvido), o serviço é considerado offline.
    status = "offline";
  }

  return {
    ...service,
    status,
    latency,
    uptime: 0, // O cálculo de uptime exigiria persistência de dados históricos.
    lastChecked: new Date().toLocaleString("pt-BR"),
    latencyHistory: [], // O histórico será preenchido no hook useServiceMonitoring.
  };
};

/**
 * @function useServiceMonitoring
 * @description Hook React para monitorar o status de múltiplos serviços em intervalos regulares.
 * @param {Omit<Service, "status" | "latency" | "uptime" | "lastChecked" | "latencyHistory">[]} initialServices - Array de serviços a serem monitorados.
 * @returns {{ services: Service[]; loading: boolean }} Um objeto contendo a lista de serviços atualizada e um estado de carregamento.
 */
export const useServiceMonitoring = (initialServices: Omit<Service, "status" | "latency" | "uptime" | "lastChecked" | "latencyHistory">[]) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllServices = async () => {
      setLoading(true);
      const promises = initialServices.map(service => checkServiceStatus(service));
      const results = await Promise.all(promises);

      setServices(prevServices => {
        return results.map(newService => {
          const oldService = prevServices.find(s => s.name === newService.name);
          const newHistory = oldService ? [...oldService.latencyHistory] : [];

          // Adiciona a nova latência ao histórico, mantendo um limite de 10 entradas.
          newHistory.push({ time: new Date().toLocaleTimeString("pt-BR"), value: newService.latency });
          if (newHistory.length > 10) {
            newHistory.shift(); // Remove o item mais antigo se o histórico exceder o limite.
          }

          return { ...newService, latencyHistory: newHistory };
        });
      });
      setLoading(false);
    };

    fetchAllServices();
    const interval = setInterval(fetchAllServices, 60000); // Atualiza a cada 60 segundos (60000 ms).

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado.
  }, [initialServices]);

  return { services, loading };
};
