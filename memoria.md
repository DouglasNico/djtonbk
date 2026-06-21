# DJ Ton B.K — Memória do Projeto

## Stack
- HTML + CSS + JS vanilla
- Firebase Firestore (banco de dados)
- Firebase Auth (login admin)
- Cloudinary (upload de imagens)
- Firebase Hosting

## Estrutura de Arquivos
```
/
├── index.html          → Site principal (~1050 linhas)
├── admin.html          → Painel administrativo
├── css/style.css       → Todos os estilos (~2740 linhas)
├── js/script.js        → Scroll reveal, navbar, hamburger, partículas, equalizer (~250 linhas)
├── img/                → Imagens (logo, capa-video.jpg)
├── favicon.svg
└── memoria.md          ← Este arquivo
```

---

## Funcionalidades Implementadas

### Site (index.html)

#### Pré-loader
- Removido — site abre direto no hero sem tela preta

#### Navbar
- Glass morphism (blur 35px, fundo rgba 0.6)
- Borda inferior com glow cyan **sempre visível**
- Logo + links centralizados dentro de `.nav-container` (max-width: 1200px)
- Hover feedback: `scale(1.05)` + glow (sem underline `::after`)
- Active tracking por scroll com indicador tipo pill (`.nav-indicator`)
- Link "PRESS KIT" estilizado como badge (borda arredondada com outline) em desktop; normal no mobile
- Scroll suave com `scrollIntoView({ behavior: 'smooth', block: 'start' })`

#### Scroll Progress Bar
- Barra fina cyan no topo da navbar que preenche conforme o scroll

#### Hamburger (Mobile)
- 3 spans animados → "X" ao abrir
- Drawer lateral (280px) com glass morphism + overlay
- Links com fade+slide em sequência (stagger: 0.05s–0.3s)
- Fecha ao clicar em link, no fundo escuro, ou no toggle
- `body overflow: hidden` evita scroll duplo

#### Hero
- Imagem `capa-video.jpg` com zoom lento (`heroBgZoom`)
- Gradiente overlay animado (`heroOverlayShift`)
- Equalizer bars: 40 barras (20 mobile) com alturas aleatórias (0.8–2.3s)
- Feixes de luz: dois gradientes diagonais varrendo o fundo em 14s
- Partículas flutuantes cyan **apenas no hero** (`.site-particles` movido para dentro do `<header>`)
- Badge "DJ / PRODUTOR"
- Título "TON B.K" com:
  - Fonte Orbitron (Google Fonts)
  - Gradiente animado `#fff → #00cec9 → #fff` com `background-position` shift (5s)
  - Pulso suave (scale 1.025 + brightness 1.15) a cada 3s
  - Text-shadow glow cyan
- 2 CTAs (VER PACOTES / FALE COMIGO)
- Stats: 10+ ANOS · 500+ EVENTOS · 100% SATISFAÇÃO (com linha divisória sutil)

#### Partículas Flutuantes
- `.site-particles` absoluto dentro do hero, `z-index: 2`, `overflow: hidden`
- 45 partículas em desktop, 25 em mobile
- Bolinhas cyan com gradiente radial, sobem do bottom ao topo
- Início rápido (delay máximo 3s) e durações variadas (6-16s)
- `pointer-events: none`

#### Press Kit Modal
- Link "PRESS KIT" na navbar abre modal com 3 botões de download
- Botões: Logo Oficial (PNG), Fotos Oficiais (PNG), Release / Rider Técnico (PDF)
- Fecha com X, clique fora ou ESC
- Responsivo mobile

#### Serviços (Firestore) — Tempo Real
- Grid responsivo de cards
- Card com: imagem, badge categoria, nome, preço, features
- Features parseadas de linhas com "- " na descrição
- Modal com header gradiente + fundo escuro
- Preço formatado como moeda BR
- Ordenados por preço (mais barato primeiro)
- **Dados em tempo real via `onSnapshot`** — alterações no Firestore refletem automaticamente

#### Agenda (Firestore) — Tempo Real
- Cards com mini-calendário (dia + mês)
- Badge de categoria
- Contagem regressiva: HOJE / AMANHÃ / FALTAM X DIAS alinhada com o botão "Ver Detalhes"
- Eventos passados somem do site
- Ordenados por data crescente
- Modal premium: flyer com glow, fundo blur, status tag, zoom na imagem
- **Dados em tempo real via `onSnapshot`**

#### Galeria (Firestore) — Tempo Real
- Grid de cards com overlay mostrando título, data/local e **contagem de fotos**
- Lightbox com navegação por setas, teclado (← →) e **swipe touch**
- VER MAIS modal com **preload de imagens** (promise all)
- Lightbox aberta do VER MAIS: ao fechar (X, ESC, clique fora), **retorna ao modal**
- **Dados em tempo real via `onSnapshot`**

#### Seção Sobre
- Layout flex com `align-items: stretch` para altura igual entre imagem e texto
- Imagem com moldura decorativa (`::before` borda cyan) que anima no hover
- Glow cyan atrás da imagem (`::after` radial-gradient)
- Hover só ativa no pixel da foto (`pointer-events: none` na div, `auto` na img)
- Glass card: `backdrop-filter: blur(8px)`, borda sutil, padding 32px
- Título com gradiente `#fff → #00cec9`

#### Contato
- Formulário com select + textarea
- Background gradiente `#0a0a0a → #0f0f0f`

#### Footer
- Logo + links + direitos reservados

#### Cache Busting
- CSS link usa query string `?v=N` (ex: `style.css?v=16`)

#### Scrollbar Customizada
- WebKit: thumb #00cec9, hover #00e6e0, track #111, 8px
- Firefox: `scrollbar-width: thin`
- Mobile: scrollbar visível

#### Back-to-top
- Botão fixo no canto inferior direito
- Menu "Inicio" e logo também rolam suavemente ao topo (via `scrollIntoView`)

---

### Responsividade

| Breakpoint | Largura | Ajustes |
|---|---|---|
| Large | ≥1400px | Fontes maiores, grid 3 colunas |
| Desktop | 1024-1400px | Layout padrão |
| Notebook (HiDPI) | 769-1600px + ≥1.25dppx | Layout compacto para escalas 125%/150% |
| Tablet | 768-1024px | Grid 2 colunas, hero menor |
| Mobile | ≤768px | Hamburger, empilha tudo, padding reduzido |
| Small | ≤480px | Fontes menores, stats compactos |

---

### Admin (admin.html)

#### Login
- Firebase Auth (email + senha)
- Auto-logout por inatividade (5 min)

#### CRUD Eventos
- Campos: título, dataReal, categoria, cidade + estado, imagem, descrição
- Data de exibição e local gerados automaticamente
- Lista separa PRÓXIMOS / ARQUIVADOS
- Upload de imagem via Cloudinary

#### CRUD Serviços
- Campos: nome, categoria, preço, imagem, descrição
- Preço com formatação BR automática
- Upload via Cloudinary

#### CRUD Galeria
- Campos: título, data, cidade, estado, capa, fotos (array)
- Upload de múltiplas imagens via Cloudinary
- Preview das fotos antes de salvar

#### Toasts
- Criar / atualizar / excluir / erro

---

### Firebase

#### Coleção `eventos`
```js
{
  titulo: "String",
  data: "15 JUN",
  dataReal: "2026-08-15",
  categoria: "CLUB",
  cidade: "Campinas",
  estado: "SP",
  local: "Campinas, SP",
  imagem: "https://...",
  descricao: "String"
}
```

#### Coleção `servicos`
```js
{
  nome: "String",
  categoria: "String",
  preco: "2.500",
  imagem: "https://...",
  descricao: "String\n- Item 1\n- Item 2"
}
```

#### Coleção `galeria`
```js
{
  titulo: "String",
  data: "2026-06-15",
  cidade: "Campinas",
  estado: "SP",
  capa: "https://...",
  fotos: [
    { url: "https://...", publicId: "..." },
    ...
  ]
}
```

---

### Próximos Passos Possíveis
- Encontrar imagem de background DJ ideal (Unsplash/Pexels)
- Integrar formulário de contato com e-mail real
- Sistema de depoimentos/clientes
- Blog ou página de setlists
- Integração com redes sociais
