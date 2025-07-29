// Dados simulados para demonstração - em produção, estes dados viriam de APIs reais
export const generateMockData = () => {
  const getRandomStatus = (): "online" | "slow" | "offline" | "checking" => {
    const rand = Math.random();
    if (rand < 0.85) return "online";
    if (rand < 0.95) return "slow";
    return "offline";
  };

  const getRandomLatency = () => Math.floor(Math.random() * 300) + 20;
  const getRandomUptime = () => Math.floor(Math.random() * 5) + 95;
  const getCurrentTime = () => new Date().toLocaleString('pt-BR');

  return {
    ptts: [
      {
        name: "PTT São Paulo",
        url: "https://ix.br/sao-paulo",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Principal ponto de troca de tráfego do Brasil"
      },
      {
        name: "PTT Rio de Janeiro",
        url: "https://ix.br/rio-de-janeiro",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Segundo maior PTT do país"
      },
      {
        name: "PTT Brasília",
        url: "https://ix.br/brasilia",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "PTT da capital federal"
      },
      {
        name: "PTT Fortaleza",
        url: "https://ix.br/fortaleza",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Principal PTT do Nordeste"
      }
    ],

    microsoft: [
      {
        name: "Azure Brasil Sul",
        url: "https://status.azure.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Data center do Azure no Brasil"
      },
      {
        name: "Microsoft 365",
        url: "https://status.office365.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Serviços Office 365 no Brasil"
      },
      {
        name: "Teams Brasil",
        url: "https://status.office365.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Microsoft Teams região Brasil"
      }
    ],

    cloudflare: [
      {
        name: "Cloudflare São Paulo",
        url: "https://www.cloudflarestatus.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Edge server de São Paulo"
      },
      {
        name: "Cloudflare Rio de Janeiro",
        url: "https://www.cloudflarestatus.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Edge server do Rio de Janeiro"
      },
      {
        name: "Cloudflare CDN Brasil",
        url: "https://www.cloudflarestatus.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Rede CDN no Brasil"
      }
    ],

    serpro: [
      {
        name: "SERPRO Portal",
        url: "https://www.serpro.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal principal do SERPRO"
      },
      {
        name: "CPF Web",
        url: "https://servicos.receita.fazenda.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Consulta CPF online"
      },
      {
        name: "CNPJ Web",
        url: "https://servicos.receita.fazenda.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Consulta CNPJ online"
      }
    ],

    government: [
      {
        name: "GOV.BR",
        url: "https://www.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal oficial do governo brasileiro"
      },
      {
        name: "CADE.GOV.BR",
        url: "https://www.gov.br/cade/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal do CADE"
      },
      {
        name: "Acesso CADE",
        url: "https://acesso.cade.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Sistema de acesso do CADE"
      },
      {
        name: "Portal da Transparência",
        url: "https://portaldatransparencia.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Transparência do governo federal"
      }
    ],

    google: [
      {
        name: "Gmail Brasil",
        url: "https://gmail.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Gmail na região Brasil"
      },
      {
        name: "Google Cloud Brasil",
        url: "https://status.cloud.google.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Google Cloud Platform Brasil"
      },
      {
        name: "YouTube Brasil",
        url: "https://www.youtube.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "YouTube região Brasil"
      },
      {
        name: "Google Drive",
        url: "https://drive.google.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Google Drive Brasil"
      }
    ],

    banks: [
      {
        name: "Banco do Brasil",
        url: "https://www.bb.com.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal do Banco do Brasil"
      },
      {
        name: "Caixa Econômica",
        url: "https://www.caixa.gov.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal da Caixa Econômica Federal"
      },
      {
        name: "Itaú",
        url: "https://www.itau.com.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal do Itaú Unibanco"
      },
      {
        name: "Bradesco",
        url: "https://www.bradesco.com.br/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Portal do Bradesco"
      }
    ],

    social: [
      {
        name: "WhatsApp Web",
        url: "https://web.whatsapp.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "WhatsApp Web"
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Instagram Brasil"
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Facebook Brasil"
      },
      {
        name: "Twitter/X",
        url: "https://twitter.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Twitter/X Brasil"
      }
    ],

    cdns: [
      {
        name: "Akamai Brasil",
        url: "https://www.akamai.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Rede Akamai no Brasil"
      },
      {
        name: "Fastly Brasil",
        url: "https://www.fastly.com/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "Fastly CDN Brasil"
      },
      {
        name: "Amazon CloudFront",
        url: "https://aws.amazon.com/cloudfront/",
        status: getRandomStatus(),
        latency: getRandomLatency(),
        uptime: getRandomUptime(),
        lastChecked: getCurrentTime(),
        description: "CloudFront edge locations Brasil"
      }
    ]
  };
};