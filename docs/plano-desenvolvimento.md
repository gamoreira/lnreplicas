# LN Réplicas — Plano de Desenvolvimento Completo

> **Status atual:** Frontend MVP (React + Vite + Tailwind) — dados mockados, sem backend, sem painel admin.
> **Objetivo:** Transformar o MVP em produto completo com backend, CMS admin e integração de pagamento.

---

## Visão Geral do Sistema

```
Cliente (Browser)
    │
    ├── Frontend (React) — já existe
    │
    ├── Painel Admin (React) — a criar
    │
    └── Backend API (Node.js / Next.js API Routes)
            │
            ├── Banco de Dados (PostgreSQL ou Supabase)
            ├── Storage de Imagens (Cloudinary ou Supabase Storage)
            └── Gateway de Pagamento (Mercado Pago / Cielo / Stripe)
```

---

## FASE 1 — Backend & Banco de Dados

**Objetivo:** Substituir os dados mockados por dados reais persistidos em banco.

### 1.1 Tecnologia Recomendada
| Recurso | Opção Principal | Alternativa |
|---|---|---|
| Backend | Next.js (App Router + API Routes) | Node.js + Express |
| Banco | Supabase (PostgreSQL gerenciado) | PlanetScale / Railway |
| ORM | Prisma | Drizzle |
| Auth | NextAuth.js ou Supabase Auth | Firebase Auth |
| Storage | Supabase Storage | Cloudinary |

### 1.2 Modelos de Dados
- **Product** — id, name, slug, description, price, priceOriginal, category, badge, images[], variants[], active, createdAt
- **Category** — id, name, slug, order, active
- **Section** — id, type (hero/collection/gallery/banner), title, order, active, config (JSON)
- **User** — id, name, email, passwordHash, role (admin/customer), createdAt
- **Order** — id, userId, items[], total, status, paymentId, address, createdAt
- **Address** — id, userId, street, number, complement, city, state, zip

### 1.3 Entregáveis
- [ ] Setup projeto Next.js (ou migração do Vite para Next.js)
- [ ] Schema Prisma com todos os modelos
- [ ] Migrations iniciais + seed com dados atuais
- [ ] API REST/GraphQL: CRUD de produtos, categorias, seções
- [ ] Auth real com JWT / sessions

---

## FASE 2 — Painel Administrativo (CMS)

**Objetivo:** Interface para o dono gerenciar todo o conteúdo sem código.

### 2.1 Acesso
- Rota protegida: `/admin` (middleware de role = admin)
- Login separado ou mesmo sistema de auth com role check

### 2.2 Páginas do Painel

#### `/admin` — Dashboard
- Resumo: total de pedidos, receita do mês, produtos ativos, visitantes
- Atalhos rápidos para ações frequentes

#### `/admin/produtos` — Gestão de Produtos
- Tabela com busca, filtro por categoria, status (ativo/inativo)
- Ações: Criar, Editar, Duplicar, Ativar/Desativar, Excluir
- Upload de múltiplas fotos (drag & drop, reordenar)
- Variações (cor, tamanho, material) com estoque e preço próprio
- Preview ao vivo do card do produto

#### `/admin/produtos/novo` e `/admin/produtos/:id` — Editor de Produto
- Campos: Nome, Slug, Descrição, Preço, Preço Original, Categoria, Badge
- Gallery: upload de imagens, arrastar para reordenar, definir foto principal
- Variações: adicionar combinações com estoque
- SEO: meta title, meta description, alt das imagens

#### `/admin/categorias` — Gestão de Categorias
- Criar / renomear / reordenar / ativar-desativar categorias
- Upload de imagem da categoria

#### `/admin/secoes` — Construtor de Seções (Home Builder)
- Lista das seções da home em ordem (drag & drop para reordenar)
- Tipos de seção disponíveis:
  - **Hero** — título, subtítulo, CTA, imagem de fundo
  - **Coleção** — título, subtítulo, lista de produtos selecionados
  - **Banner Slide** — carrossel de imagens com link e texto
  - **Grid de Categorias** — seleção e ordem das categorias exibidas
  - **Depoimentos** — lista de avaliações com foto, nome, texto
  - **Novidades** — produtos com badge NEW filtrados automaticamente
- Botões: Adicionar Seção, Editar, Mover Cima/Baixo, Ativar/Desativar, Excluir
- Preview da home sem sair do painel

#### `/admin/paginas` — Gestão de Páginas
- Criar novas páginas com URL customizada (ex: `/rolex`, `/colecao-verao`)
- Editor de conteúdo: blocos de texto, imagem, galeria, produtos em destaque
- Cada produto pode ter sua própria página gerada (já existe `/produto/:id`)
- Páginas de coleção: `/colecao/:slug` com layout de grade + hero

#### `/admin/pedidos` — Gestão de Pedidos
- Tabela de pedidos com filtro por status, data, valor
- Detalhe do pedido: itens, cliente, endereço, forma de pagamento
- Atualizar status: Aguardando → Em separação → Enviado → Entregue → Cancelado
- Envio de notificação por email ao mudar status

#### `/admin/clientes` — Gestão de Clientes
- Lista de clientes com histórico de compras
- Visualizar dados, bloquear conta

#### `/admin/configuracoes` — Configurações Gerais
- Nome da loja, logo, favicon
- **Contato & Redes Sociais:**
  - Número do WhatsApp (exibido no botão flutuante e rodapé)
  - Instagram, TikTok, Facebook, YouTube — campos individuais com URL
  - Email de contato da loja (exibido no rodapé)
- Configurações de frete (tabela de preços por CEP ou integração)
- Configurações de pagamento (chaves da API do gateway)
- Textos institucionais: Sobre, Política de Trocas, Privacidade, Termos de Uso
- Rodapé: textos e links extras

### 2.3 Entregáveis
- [ ] Rota `/admin` protegida com layout separado
- [ ] CRUD de produtos com upload de imagens
- [ ] CRUD de categorias
- [ ] Construtor de seções (home builder) com drag & drop
- [ ] Gestão de pedidos e atualização de status
- [ ] Configurações gerais da loja

---

## FASE 3 — Novas Páginas (Frontend)

### Páginas a criar
| Página | Rota | Descrição |
|---|---|---|
| Coleção | `/colecao/:slug` | Hero + grade de produtos da coleção |
| Nova Coleção | `/nova-colecao` | Landing especial com slideshow + produtos |
| Sobre | `/sobre` | História da marca, diferenciais |
| Contato | `/contato` | Formulário + WhatsApp + redes sociais |
| Política de Privacidade | `/privacidade` | Texto legal |
| Termos de Uso | `/termos` | Texto legal |
| Rastreio de Pedido | `/rastreio` | Input de código + status visual |
| Busca | `/busca?q=` | Resultados de pesquisa com filtros |

### Melhorias nas páginas existentes
- **Home** — Seções dinâmicas vindas do banco (substituir mock)
- **Produtos** — Paginação server-side, filtros de preço, ordenação real
- **Produto** — Galeria com zoom, seletor de variações com estoque, seção "Veja também"
- **Checkout** — Cálculo de frete real, integração de pagamento real
- **Minha Conta** — Pedidos reais, edição de dados, troca de senha

---

## FASE 4 — Integração de Pagamento

- Configurar gateway escolhido pelo cliente (Mercado Pago / Cielo / Stripe)
- Implementar Checkout Transparente (sem redirecionar para site do gateway)
- Suporte a: Cartão de crédito, PIX, Boleto
- Webhook para confirmação de pagamento e atualização automática do pedido

---

## FASE 5 — Infraestrutura & Deploy

| Item | Recomendação |
|---|---|
| Hosting Frontend | Vercel (já configurado) |
| Hosting Backend | Vercel Functions ou Railway |
| Banco de Dados | Supabase (gratuito até 500 MB) |
| Storage Imagens | Supabase Storage ou Cloudinary |
| Email Transacional | Resend ou SendGrid |
| Domínio | Registro.br ou similar |
| SSL | Automático via Vercel / Let's Encrypt |
| CDN | Vercel Edge Network (incluso) |

---

## Cronograma Estimado

| Fase | Descrição | Estimativa |
|---|---|---|
| 1 | Backend + Banco de Dados | 2–3 semanas |
| 2 | Painel Admin (CMS) | 3–4 semanas |
| 3 | Novas Páginas Frontend | 1–2 semanas |
| 4 | Integração de Pagamento | 1 semana |
| 5 | Deploy + Domínio + Testes | 1 semana |
| **Total** | | **8–11 semanas** |

---

## Stack Final Recomendada

```
Frontend:    React + Vite (atual) ou migrar para Next.js
Styling:     Tailwind CSS (atual)
Animações:   Framer Motion (atual)
Backend:     Next.js API Routes ou Node.js + Express
ORM:         Prisma
Banco:       PostgreSQL via Supabase
Auth:        NextAuth.js ou Supabase Auth
Storage:     Supabase Storage ou Cloudinary
Pagamento:   A definir com cliente
Deploy:      Vercel + Supabase
Domínio:     A definir com cliente
```

---

*Documento gerado em: 2026-04-20*
*Próximo passo: validar perguntas com o cliente (ver `perguntas-cliente.md`)*
