# Brasil Net Pulse

## Visão Geral do Projeto

O Brasil Net Pulse é uma plataforma de monitoramento em tempo real da infraestrutura digital brasileira. Ele acompanha a latência e o status de serviços essenciais, como Pontos de Troca de Tráfego (PTTs), serviços de nuvem (Microsoft Azure, Google Cloud, Cloudflare), serviços governamentais (SERPRO, GOV.BR, Receita Federal, INSS), bancos e redes sociais.

A aplicação foi desenvolvida para fornecer uma visão clara e imediata da saúde da rede, ajudando a identificar rapidamente problemas de conectividade ou desempenho em serviços críticos para o Brasil.

## Funcionalidades

-   **Monitoramento em Tempo Real**: Verifica a latência e o status (online, lento, offline) de uma lista predefinida de serviços.
-   **Dados Reais**: A latência e o status são obtidos através de requisições HTTP `HEAD` diretas para as URLs dos serviços, garantindo que os dados refletem as condições atuais da rede.
-   **Interface Intuitiva**: Apresenta os dados de forma clara e organizada, com cartões de status para cada serviço.
-   **Gráficos de Latência**: Exibe um histórico visual da latência para cada serviço, permitindo identificar tendências e picos de desempenho.
-   **Responsivo**: Design adaptável para diferentes tamanhos de tela.
-   **Deploy no GitHub Pages**: Configurado para fácil publicação e acesso via GitHub Pages.

## Como os Dados de Latência e Status são Obtidos

A aplicação utiliza a função `checkServiceStatus` (localizada em `src/lib/monitoring.ts`) para realizar requisições HTTP `HEAD` para cada URL de serviço configurada.

1.  **Medição de Latência**: O tempo entre o início da requisição e a recepção da resposta é medido para determinar a latência.
2.  **Determinação de Status**:
    *   Se a requisição for bem-sucedida e a latência for baixa (abaixo de 1000ms), o status é `online`.
    *   Se a requisição for bem-sucedida, mas a latência for alta (acima de 1000ms), o status é `slow`.
    *   Se a requisição falhar (por exemplo, erro de rede, serviço indisponível), o status é `offline`.
3.  **Histórico de Latência**: A aplicação armazena um pequeno histórico das últimas medições de latência para cada serviço, permitindo a visualização de gráficos de tendência.

Isso garante que os dados exibidos são baseados em medições reais e não são arbitrários.

## Tecnologias Utilizadas

-   **React**: Biblioteca JavaScript para construção da interface do usuário.
-   **Vite**: Ferramenta de build para desenvolvimento front-end rápido.
-   **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
-   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
-   **Shadcn/ui**: Componentes de UI reutilizáveis e acessíveis construídos com Tailwind CSS e Radix UI.
-   **React Router DOM**: Para gerenciamento de rotas na aplicação.
-   **Recharts**: Biblioteca de gráficos para visualização de dados.
-   **gh-pages**: Para deploy fácil no GitHub Pages.

## Instalação e Uso

Para configurar e rodar o projeto localmente:

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/onecio/brasil-net-pulse.git
    cd brasil-net-pulse
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    # ou se você usa yarn
    # yarn install
    # ou se você usa pnpm
    # pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:8080`.

4.  **Build para Produção**:
    ```bash
    npm run build
    ```
    Os arquivos de build serão gerados na pasta `dist/`.

## Deploy no GitHub Pages

Este projeto está configurado para ser facilmente publicado no GitHub Pages.

1.  **Configure a `homepage` no `package.json`**:
    Certifique-se de que a propriedade `homepage` no seu `package.json` aponte para o URL correto do seu GitHub Pages (ex: `https://<seu-usuario>.github.io/<nome-do-repositorio>`).

2.  **Execute o script de deploy**:
    ```bash
    npm run deploy
    ```
    Este comando irá:
    *   Construir a aplicação para produção (`npm run build`).
    *   Publicar o conteúdo da pasta `dist/` na branch `gh-pages` do seu repositório.

Após o deploy, sua aplicação estará acessível no URL configurado na `homepage`.

## Estrutura do Projeto

```
.
├── public/                 # Arquivos estáticos e 404.html para GitHub Pages
├── src/
│   ├── App.tsx             # Componente principal da aplicação e configuração de rotas
│   ├── main.tsx            # Ponto de entrada da aplicação
│   ├── index.css           # Estilos globais
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── ui/             # Componentes Shadcn/ui
│   │   └── ...             # Outros componentes da aplicação
│   ├── data/
│   │   └── monitoringData.ts # Dados dos serviços a serem monitorados
│   ├── hooks/
│   │   └── use-check-online.ts # Hook para verificar status online do navegador
│   ├── lib/
│   │   └── monitoring.ts   # Lógica principal para monitoramento de serviços
│   │   └── utils.ts        # Funções utilitárias
│   └── pages/
│       ├── Index.tsx       # Página principal do dashboard
│       └── NotFound.tsx    # Página 404
├── package.json            # Dependências e scripts do projeto
├── vite.config.ts          # Configuração do Vite
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── tsconfig.json           # Configurações do TypeScript
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.