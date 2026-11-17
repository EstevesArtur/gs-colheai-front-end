# ColheAí · Front-End

**Global Solution 2026/2 · CitizenTech · FIAP · Front-End Design Engineering**
Grupo **Since Young** · Turma **1TDSPV-2026**

O ColheAí aproxima o agricultor familiar da merenda escolar. Pelo celular, ele vê as chamadas públicas das prefeituras com o preço de cada produto, confere quanto ainda pode vender e envia a proposta. A prefeitura acompanha a meta de comprar 45% da agricultura familiar.

## Links

| O quê | Onde |
|---|---|
| Aplicação publicada (Vercel) | https://gs-colheai-front-end.vercel.app |
| Repositório (GitHub) | https://github.com/EstevesArtur/gs-colheai-front-end |
| API Java (Render) | https://colheai-api.onrender.com |
| Repositório da API | https://github.com/EstevesArtur/colheai-api |
| Vídeo (YouTube) | https://www.youtube.com/watch?v=5BGK91X_z7A |

> A API fica no plano gratuito do Render e "dorme" sem uso. A primeira consulta pode levar até 1 minuto, e o site avisa quando isso acontece.

## Objetivo

Desde janeiro de 2026, pelo menos 45% do repasse federal da merenda (PNAE) precisa ir para compras diretas da agricultura familiar (Lei 15.226/2025). A cidade de São Paulo não cumpriu nem os 30% antigos: 26,8% em 2019, segundo auditoria do TCM-SP. Do lado do agricultor, as barreiras são saber que a chamada existe, entender o edital e montar a proposta.

O front do ColheAí resolve a parte do agricultor:

- mostra as chamadas abertas com o preço em destaque, como numa plaquinha de feira;
- identifica o agricultor pelo CAF (Cadastro Nacional da Agricultura Familiar);
- calcula, antes do envio, quanto ele ainda pode vender dentro do limite de R$ 40 mil por ano em cada prefeitura;
- envia a proposta para a API e explica a resposta quando ela é recusada.

Cidadão atendido: o agricultor familiar (quem usa) e o estudante da rede pública (quem recebe a merenda). ODS 2, 10, 11 e 4.

## Tecnologias

- **React 19** + **Vite 8** + **TypeScript**
- **Tailwind CSS 4**, pelo plugin `@tailwindcss/vite`, com a identidade visual no `@theme` do `src/index.css`
- **React Router 7** (rotas estáticas, rota com parâmetro e rota protegida)
- **React Hook Form** (formulários de contato e de proposta)
- **react-error-boundary** e `lazy`/`Suspense`
- **lucide-react** (ícones)
- **Fetch API** para todas as requisições (sem Axios)
- **oxlint** (o lint que vem no template do Vite)

## Como executar

Pré-requisito: Node.js 20.19 ou mais novo.

```bash
git clone https://github.com/EstevesArtur/gs-colheai-front-end.git
cd gs-colheai-front-end
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Outros comandos:

```bash
npm run build     # confere os tipos e gera a pasta dist
npm run preview   # serve a pasta dist
npm run lint      # oxlint
```

### Variáveis de ambiente

O projeto roda sem `.env`: a URL pública da API é o valor reserva no código. Para apontar para outra API, copie `.env.example` para `.env`.

| Variável | Para quê |
|---|---|
| `VITE_API_URL` | URL da API Java do ColheAí |
| `VITE_IA_URL` | Opcional. URL da API Flask de IA; sem ela, o card de risco do painel fica escondido |

Tudo que começa com `VITE_` é público no navegador: URL pode, senha nunca.

### Para testar a demonstração

Entre com o CAF **`SIM-CAF-PF-0001`** (Maria Aparecida dos Santos). Ela já vendeu R$ 27.800 para a Prefeitura de São Paulo em 2026, então sobram R$ 12.200. Na chamada 003/2026, uma proposta de 2.000 kg de tomate (R$ 15.000) passa do limite e mostra o aviso e a resposta 409 da API.

## Páginas e rotas

| Rota | Página | O que faz |
|---|---|---|
| `/` | Início | Preços da chamada aberta, como funciona, regra dos R$ 40 mil e meta de 45% |
| `/chamadas` | Chamadas | Lista com filtro por situação e por prefeitura |
| `/chamadas/:id` | Chamada | **Rota com parâmetro.** Itens, saldo do CAF e formulário de proposta |
| `/painel` | Painel da meta | Repasse, meta, contratado e falta de cada prefeitura |
| `/minhas-propostas` | Minhas propostas | **Rota protegida.** Propostas do agricultor, com retirada |
| `/entrar` | Entrar | Identificação pelo CAF |
| `/sobre` | Sobre | Problema, público e ODS, com fontes |
| `/faq` | FAQ | Perguntas frequentes |
| `/integrantes` | Integrantes | Quem fez |
| `/contato` | Contato | Formulário com validação (envio simulado) |
| qualquer outra | 404 | Página não encontrada |

No celular e no tablet, o menu fica numa barra fixa embaixo da tela, com o botão "Menu" abrindo as demais páginas.

## Integração com a API Java

Todas as chamadas passam por `src/services/http.ts`, o único arquivo que usa `fetch`. As respostas são tipadas em `src/types`.

| Método | Endpoint | Onde é usado |
|---|---|---|
| GET | `/chamadas` e `/chamadas?status=ABERTA` | Início, Chamadas |
| GET | `/chamadas/{id}` e `/chamadas/{id}/itens` | Chamada |
| GET | `/entidades` e `/entidades/{id}/meta` | Início, Painel |
| GET | `/agricultores` | Entrar (busca pelo CAF) |
| GET | `/agricultores/{id}/propostas` | Chamada (saldo), Minhas propostas |
| **POST** | `/itens/{id}/propostas` | Chamada (enviar proposta) |
| **DELETE** | `/propostas/{id}` | Minhas propostas (retirar) |

Toda tela com dados trata os quatro estados: carregando (skeleton e aviso de servidor acordando), erro, vazio e sucesso. Um id que não existe (`/chamadas/999`) mostra "Esta chamada não existe".

A API devolve os erros em JSON (`{ erro, detalhe, campos }`). O `HttpError` guarda esse corpo, e a tela mostra a mensagem: o 409 do limite diz quanto ainda dá para vender, e o 400 aponta o campo.

## Estrutura de pastas

```
src/
├── types/        interfaces dos dados da API (chamada, agricultor, proposta, meta, erro)
├── services/     http.ts (fetch + HttpError) e as funções de cada recurso
├── hooks/        useChamadas, useChamada, useMetas, usePropostasDoAgricultor, useAuth, useDemora
├── contexts/     AuthContext e AuthProvider (agricultor identificado)
├── layouts/      MainLayout (Header, Outlet, Footer, BarraInferior)
├── components/   componentes reutilizáveis
├── pages/        uma página por rota (XPage.tsx)
├── utils/        format.ts, limite.ts, menu.ts
├── App.tsx       rotas
├── main.tsx      ponto de entrada
└── index.css     Tailwind e identidade visual
```

Componentes reutilizados em mais de um lugar:

| Componente | Onde aparece |
|---|---|
| `Plaquinha` | Início e Chamada |
| `BarraMeta` | Início e Painel |
| `Mensagem` | todas as telas com dados e o Contato |
| `Skeleton` | Início, Chamadas, Chamada, Painel, Minhas propostas |
| `AvisoServidor` | Início, Chamadas, Chamada, Painel, Entrar, Minhas propostas |
| `StatusBadge` | Chamadas e Minhas propostas |
| `CampoErro` | Contato, Entrar e formulário de proposta |
| `Toldo` | Início e Chamada |
| `Marca` | Header e Footer |

## Responsividade e acessibilidade

- Testado em 390 × 844, 768 × 1024 e 1440 × 900, sem rolagem horizontal.
- Todo campo tem `label`. Erros de formulário usam `role="alert"` e `aria-describedby`.
- Foco visível em links, botões e campos. Botões e campos com pelo menos 44 px de altura.
- Texto base de 17 px e fonte Atkinson Hyperlegible Next, feita para leitura fácil.
- Sem fotos pesadas: as ilustrações são SVG, pensando em quem acessa com pacote de dados curto.

## Deploy

Publicado na Vercel a partir da branch `main` (framework Vite, build `npm run build`, saída `dist`). O `vercel.json` reescreve todas as rotas para o `index.html`, para o F5 funcionar em qualquer página.

## Versionamento

Git Flow: `main` (produção) ← `develop` (integração) ← `feature/*`. Cada funcionalidade entrou por Pull Request na `develop`. Mensagens no padrão Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `perf:`).

## Limitações conhecidas

- **A entrada pelo CAF é uma simulação.** Não tem senha nem token; a sessão fica no `localStorage`. Num produto real, a identificação seria pelo login gov.br.
- A API não tem busca por CAF, então o front pede a lista de agricultores e procura nela.
- Agricultores, repasses, chamadas e propostas são dados simulados. Nomes e códigos IBGE das prefeituras são reais.
- O formulário de contato não envia e-mail: a API não tem rota de contato, e a tela avisa.
- A conta do limite feita no front serve de aviso. Quem decide é a API (resposta 409).

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Artur Bianchini Esteves (representante) | 569450 | 1TDSPV-2026 | [EstevesArtur](https://github.com/EstevesArtur) | [perfil](https://www.linkedin.com/in/artur-esteves-31bb4130a/) |
| João Vitor Oliveira Fontenele Martins | 570783 | 1TDSPV-2026 | [joaofontenele06](https://github.com/joaofontenele06) | [perfil](https://www.linkedin.com/in/jo%C3%A3o-fontenele-65b1913a8/) |

## Contato

arturbianchini21@gmail.com

## Uso de IA

O grupo usou o Claude (Anthropic) como apoio para planejar a arquitetura, propor o design e escrever e revisar código, sempre seguindo o material das aulas da disciplina. O grupo testou a aplicação contra a API real, revisou o código antes de cada commit e é responsável pelo resultado. O registro completo (prompts, o que foi aceito, corrigido ou descartado) está no documento de Software Engineering and Business Model.
