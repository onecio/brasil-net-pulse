import { useEffect, useState } from "react";

/**
 * Hook para checar se uma URL está online (HTTP 200-399).
 * Faz uma requisição HEAD e retorna true (online) ou false (offline).
 *
 * @param url string
 * @param intervalMs número de ms para rechecagem automática (opcional)
 */
export function useCheckOnline(url?: string, intervalMs = 30000) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!url) {
      setIsOnline(null);
      return;
    }
    let stopped = false;
    const check = async () => {
      try {
        // CORS pode bloquear, mas HEAD é menos invasivo
        const res = await fetch(url, { method: "HEAD", mode: "no-cors" });
        // Se não der erro, consideramos online
        if (!stopped) setIsOnline(true);
      } catch {
        if (!stopped) setIsOnline(false);
      }
    };
    check();
    if (intervalMs > 0) {
      const interval = setInterval(check, intervalMs);
      return () => {
        stopped = true;
        clearInterval(interval);
      };
    }
    return () => { stopped = true; };
  }, [url, intervalMs]);

  return isOnline;
}
