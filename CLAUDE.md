# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build
npm run preview   # preview production build locally
```

No test runner or linter is configured.

## Architecture

**Frontend-only SPA** — React 18 + Vite. All data is mocked; there is no backend or API.

### Data layer
`src/data/mockData.js` is the single source of truth for all product and category data. Products have: `id`, `name`, `category`, `price`, `originalPrice`, `images[]`, `badge`, `variations[]`, `variationType`, `rating`, `reviews`. Until a backend is built, every page reads from this file.

### State management
Two React Contexts, both persisted to `localStorage`:
- `AuthContext` (`ln_user` key) — mocked login/logout, exposes `user`, `isAuthenticated`, `login`, `logout`
- `CartContext` (`ln_cart` key) — `useReducer` with actions `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`, `LOAD_CART`. Items are keyed by `id + variation` to support product variants.

Both providers wrap the entire app in `src/main.jsx`.

### Routing
React Router v6, defined in `src/App.jsx`:

| Route | Page |
|---|---|
| `/` | Home |
| `/produtos` | Products (filter by category, sort) |
| `/produto/:id` | ProductDetail |
| `/carrinho` | Cart |
| `/checkout` | Checkout (3-step stepper, ViaCEP for address lookup) |
| `/conta` | Account (login / register) |
| `/minha-conta` | MyAccount (orders, addresses, profile) |

### Styling
Tailwind CSS with a custom luxury jewelry theme defined in `tailwind.config.js`:
- **Colors:** `gold`, `champagne`, `pearl`, `graphite`, `obsidian`
- **Font:** Cormorant Garamond (display), loaded via Google Fonts in `index.css`
- **Custom animations:** `shimmer`, `float`, `pulse-gold`

Prefer Tailwind utilities. Avoid inline styles.

### Components
Reusable primitives in `src/components/`: `Button` (variants: primary/outline/ghost/danger), `Badge` (NEW/BESTSELLER/PROMO), `Input`, `Modal`, `Stepper`, `ProductCard`, `Navbar`, `Footer`, `PaymentOption`.

## Planned Development (not yet built)

See `docs/plano-desenvolvimento.md` for the full roadmap. Key upcoming phases:
- **Backend:** Node.js + MySQL + Prisma (replace mock data)
- **Admin panel:** CMS at `/admin` — product/category/section/order management
- **Payment:** Gateway TBD (see `docs/perguntas-cliente.md`)
- **Hosting:** VPS Hostinger + `.com.br` domain

Client questions still open (gateway, shipping model) are tracked in `docs/perguntas-cliente.md`.
