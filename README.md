# LN Réplicas — Frontend MVP

Loja online de joias e réplicas premium. Tema **Dark Luxury / Jewel House**.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Router v6
- Lucide React (ícones)

## Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Deploy na Vercel

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. O arquivo `vercel.json` já está configurado para SPA routing

## Estrutura de Pastas

```
src/
  components/
    Navbar.jsx         — Header fixo com menu mobile drawer
    Footer.jsx         — Rodapé completo com links e formas de pagamento
    ProductCard.jsx    — Card de produto com hover animado
    Button.jsx         — Botão reutilizável (primary/outline/ghost/danger)
    Badge.jsx          — Badges NOVO / MAIS VENDIDO / PROMOÇÃO
    Input.jsx          — Input estilizado dark
    Modal.jsx          — Modal com backdrop e animação
    Stepper.jsx        — Stepper visual para checkout
    PaymentOption.jsx  — Card de forma de pagamento
  pages/
    Home.jsx           — Página inicial completa (hero, coleções, categorias, etc.)
    Products.jsx       — Listagem com filtro por categoria e ordenação
    ProductDetail.jsx  — Detalhe do produto com galeria e variações
    Cart.jsx           — Carrinho com controle de quantidade
    Checkout.jsx       — Checkout em 3 etapas com ViaCEP
    Account.jsx        — Login / Cadastro
    MyAccount.jsx      — Área do cliente (pedidos, dados, endereços)
  context/
    CartContext.jsx    — Carrinho com localStorage
    AuthContext.jsx    — Autenticação mockada com localStorage
  data/
    mockData.js        — 12 produtos, 6 categorias, 3 pedidos mockados
```

## Funcionalidades

- [x] Hero com partículas douradas animadas
- [x] Grid de produtos responsivo (2 mobile / 4 desktop)
- [x] Filtro por categoria e ordenação
- [x] Detalhe de produto com galeria e variações
- [x] Carrinho persistido no localStorage
- [x] Checkout em 3 etapas (stepper)
- [x] Busca automática de CEP via ViaCEP API
- [x] Pagamento: Pix (QR mockup + 5% desconto), Cartão, Boleto
- [x] Login / Cadastro com localStorage
- [x] Área do cliente com histórico de pedidos
- [x] Menu hambúrguer mobile com drawer
- [x] Animações com Framer Motion
- [x] Mobile-first responsivo
- [x] Lazy loading em imagens

## Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| `obsidian` | `#0a0a0a` | Fundo principal |
| `graphite` | `#1E1E1E` | Cards, sections |
| `gold` | `#C9A84C` | Destaque, CTAs |
| `champagne` | `#F0D080` | Preços, hover |
| `pearl` | `#F8F4EC` | Texto principal |
