# 🎬 Landing Page Matrix

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Gulp](https://img.shields.io/badge/Gulp-4.0-red.svg)](https://gulpjs.com/)
[![SCSS](https://img.shields.io/badge/SCSS-1.62-pink.svg)](https://sass-lang.com/)

Landing page temática inspirada no filme **The Matrix (1999)**, criada como projeto educacional com foco em boas práticas de desenvolvimento front-end.

## 🎯 Objetivo

Criar uma landing page responsiva e acessível aplicando técnicas modernas de HTML5, CSS3/SCSS e JavaScript vanilla, incluindo:

- ✅ Semântica HTML5 e ARIA para acessibilidade
- ✅ Arquitetura CSS com SCSS (variáveis, mixins, partials)
- ✅ JavaScript modular com padrão de módulos
- ✅ Automação de build com Gulp
- ✅ Design responsivo mobile-first
- ✅ Performance e otimização de assets

## ✨ Funcionalidades

### 1. Curiosidades sobre o Filme
- Sistema de accordion expansível com informações detalhadas
- Conteúdo rico sobre conceitos, personagens e produção
- Animações suaves de abertura/fechamento
- ARIA labels para acessibilidade completa

### 2. Header Sticky Inteligente
- Header fixo que some ao rolar a página
- Botões de ação (Assistir/Trailer) ocultam junto
- Transições suaves com opacity e visibility
- Z-index gerenciado para sobreposição correta

### 3. Carousel Infinito de Personagens
- Navegação circular sem limites (último→primeiro, primeiro→último)
- Botões sempre ativos para rolagem contínua
- Responsivo (1 card no mobile, 3 no desktop)
- Debounce no resize para performance otimizada

### 4. Modals Interativos
- Modals para conteúdo adicional (sobre, elenco, trilogia, etc.)
- Fechar com ESC, click fora ou botão X
- Trap de foco para acessibilidade
- Animações suaves de entrada/saída

### 5. Design Responsivo
- Breakpoint mobile: 768px
- Media queries organizadas por componente
- Ajustes de tipografia e espaçamento
- Layout adaptativo com Flexbox

### 6. Links Externos
- Link para Wikipedia sobre as pílulas (com hover effect)
- Link para GitHub do projeto no rodapé
- Todos com `target="_blank"` e `rel="noopener noreferrer"`

## 📁 Estrutura do Projeto

```
exercicio-landing-page/
├── src/
│   ├── images/              # Imagens originais
│   ├── scripts/
│   │   └── main.js          # JavaScript modular
│   └── styles/
│       ├── _variables.scss  # Variáveis SCSS
│       ├── _mixins.scss     # Mixins reutilizáveis
│       ├── _base.scss       # Reset e base
│       ├── _header.scss     # Estilos do header
│       ├── _hero.scss       # Seção hero
│       ├── _personagens.scss # Carousel
│       ├── _faq.scss        # FAQ accordion
│       ├── _footer.scss     # Rodapé
│       ├── _modals.scss     # Modals
│       └── main.scss        # Import principal
├── dist/                    # Assets compilados (gerados)
│   ├── css/
│   ├── images/
│   └── js/
├── index.html               # Página principal
├── gulpfile.js              # Configuração Gulp
├── package.json             # Dependências
├── .gitignore               # Arquivos ignorados
├── .editorconfig            # Configuração do editor
├── .prettierrc              # Formatação de código
└── README.md                # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Fryansb/Matrix.git

# Entre na pasta
cd exercicio-landing-page

# Instale as dependências
npm install
```

### Comandos Disponíveis

```bash
# Desenvolvimento (watch mode)
npm run dev

# Build para produção
npm run build

# Executar apenas estilos
npx gulp styles

# Executar apenas scripts
npx gulp scripts

# Executar apenas imagens
npx gulp images
```

### Visualização

Abra `index.html` no navegador ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server

# Com Live Server (VS Code)
# Click direito no index.html > Open with Live Server
```

## 🎨 Customizações

### Paleta de Cores

```scss
$color-primary: #00ff41;      // Verde Matrix
$color-bg-dark: #0d0d0d;      // Preto profundo
$color-bg-medium: #1a1a1a;    // Cinza escuro
$color-text-primary: #f9f9f9; // Branco
$color-text-secondary: silver; // Cinza claro
```

### Tipografia

- Base: Arial, sans-serif
- Logo: 'Courier New', monospace
- Tamanhos: 12px (small), 16px (base), 18px (large), 32px (title)

### Breakpoints

```scss
$breakpoint-mobile: 768px;
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Semântica e acessibilidade (ARIA)
- **SCSS** - Pré-processador CSS com arquitetura modular
- **JavaScript ES6+** - Módulos, arrow functions, const/let
- **Gulp** - Task runner para automação
  - gulp-sass - Compilação SCSS
  - gulp-uglify - Minificação JS
  - gulp-imagemin - Otimização de imagens

## ♿ Acessibilidade

Este projeto implementa diversas práticas de acessibilidade:

- ✅ Semântica HTML5 (header, nav, section, article, footer)
- ✅ ARIA roles e labels
- ✅ Navegação por teclado
- ✅ Estados de foco visíveis
- ✅ Contraste de cores adequado (WCAG AA)
- ✅ Textos alternativos em imagens
- ✅ Suporte a leitores de tela

## 📝 Boas Práticas Aplicadas

### HTML
- Meta tags para SEO e redes sociais
- Loading lazy para imagens
- Atributos aria-* para acessibilidade
- Estrutura semântica

### CSS/SCSS
- Arquitetura modular (partials)
- Variáveis para manutenibilidade
- Mixins para reutilização
- BEM-like naming convention
- Mobile-first approach

### JavaScript
- Módulos independentes
- Debounce para performance
- Event delegation
- Comentários JSDoc
- Tratamento de erros

### Build/Tooling
- Gulp para automação
- Minificação de assets
- Otimização de imagens
- Watch mode para desenvolvimento
- EditorConfig para consistência

## 🌐 Deploy

Plataformas recomendadas para deploy:

- **Netlify**: Arraste a pasta ou conecte o Git
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Ative nas settings do repositório
- **Cloudflare Pages**: Deploy via dashboard

## 📚 Aprendizados

- Uso de pseudo-elementos (::after) para ícones
- Controle de altura com height: 0 e overflow: hidden
- Position sticky vs fixed
- Transições CSS para UX suave
- JavaScript DOM manipulation avançada
- Mobile-first thinking
- Arquitetura CSS escalável
- Padrões de código limpo

## 🔄 Melhorias Futuras

- [ ] Implementar testes automatizados (Jest)
- [ ] Adicionar Lighthouse CI para métricas
- [ ] Service Worker para PWA
- [ ] Internacionalização (i18n)
- [ ] Tema claro/escuro
- [ ] Animações mais elaboradas
- [ ] Integração com API de filmes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Fryansb** (Ryan)
- Email: ryan.sbv2@gmail.com
- GitHub: [@Fryansb](https://github.com/Fryansb)

## 🙏 Agradecimentos

- Warner Bros. pelo universo Matrix
- EBAC pela formação
- Comunidade open source

---

**Desenvolvido com 💚 como exercício do curso EBAC - Engenheiro Front-End**
