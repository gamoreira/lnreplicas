# LN Réplicas — Questionário para o Cliente

> **Atualizado em:** 2026-04-20
> Itens já definidos entre desenvolvedor e cliente foram removidos. Este documento contém **apenas o que o cliente precisa responder.**

---

## ✅ Já Definido (sem necessidade de consulta ao cliente)

| Item | Decisão |
|---|---|
| Formas de pagamento | Todas: crédito, débito, PIX, boleto |
| CNPJ | Confirmado — loja possui CNPJ |
| Domínio | `.com.br` — gerenciado pelo desenvolvedor |
| Hospedagem | VPS Hostinger — gerenciado pelo desenvolvedor |
| Stack técnica | React + Node.js + MySQL |
| Produtos | Cadastro contínuo conforme estoque/coleção, sem número fixo |
| Fotos iniciais | Imagens de referência — cliente substitui pelas reais no painel conforme for fotografando |
| Categorias | Atuais mantidas + cadastro livre de novas categorias no painel (ativar/inativar) |
| Coleções | Sistema criado no painel, coleções definidas e adicionadas depois |
| Variações | Sim (tamanhos e outros) — gerenciadas no painel por produto |
| Painel admin | Dono por ora + futuros usuários com permissões por nível |
| UX do painel | Interface simples para usuário com informática básica |
| Notificações de pedido | Email + WhatsApp ao dono quando novo pedido chegar |
| WhatsApp no site | Botão flutuante + rodapé — número cadastrado no painel |
| Redes sociais | Instagram, TikTok, Facebook, YouTube — campos no painel de configurações |
| Email de contato | Campo no painel de configurações |
| Google Analytics | Necessário — cliente ainda não possui conta (criar junto do desenvolvedor) |
| Meta Pixel | Cliente possui Página oficial da loja no Facebook — criar Business Manager + Pixel antes do lançamento |
| Descrições dos produtos | Cadastradas diretamente no painel pelo admin |
| Página "Sobre a Loja" | Sim — texto inicial criado pelo desenvolvedor, editável no painel depois |
| Cupons de desconto | Sim, sistema de cupons incluso |
| Wishlist / Favoritos | Sim, obrigatório |
| NF-e | Emitida em sistema externo — loja só precisa enviar o arquivo por email ao cliente via painel |
| Política de trocas | Texto criado depois, campo editável no painel de configurações |
| Promoções sazonais | Sim (Black Friday, Datas comemorativas) — sistema de banners e cupons preparado para isso |
| Rastreio de pedido | Admin cadastra o código dos Correios no painel → aparece automaticamente na área do cliente. Correios gera o código no ato do envio na agência. |
| Prazo e orçamento | Definidos e cobrados pelo desenvolvedor |
| Contrato de manutenção | Cobrado mensalmente pelo desenvolvedor |

---

## ❓ Perguntas para o Cliente

---

### 1. Pagamento

**1.1 — Qual gateway de pagamento você quer usar?**

O gateway é a empresa que processa os pagamentos. Você precisará criar uma conta e nos fornecer as credenciais de acesso à API. Como a loja possui CNPJ, todas as opções abaixo estão disponíveis:

| Gateway | Taxa crédito | Taxa PIX | Prazo repasse | Observação |
|---|---|---|---|---|
| Mercado Pago | ~4,98% | ~0,99% | D+2 a D+30 | Mais popular, conta fácil de abrir |
| PagSeguro | ~3,99% | ~1,99% | D+2 a D+14 | Boa reputação, suporte nacional |
| Cielo | ~2,99% a ~4,5% | ~1,29% | D+1 a D+30 | Exige contrato formal, melhor taxa |
| Rede (Itaú) | ~2,5% a ~4% | ~0,99% | D+1 a D+2 | Indicado para maior volume de vendas |

> Já possui conta aberta em algum desses? Se sim, qual?

---

**1.2 — Parcelamento no cartão de crédito**

- Quantas parcelas no máximo? *(ex: 3x, 6x, 12x)*
- Quem paga os juros do parcelamento — **a loja** (sem juros para o cliente, loja absorve a taxa) ou **o cliente** (vê o valor acrescido de juros)?

> Exemplo: produto de R$ 300 em 6x sem juros = R$ 50/parcela, mas a loja paga ~3,5% de taxa ao gateway.

---

**1.3 — Existe um valor mínimo de compra?**

- A loja aceita qualquer valor ou há um mínimo para finalizar o pedido?
- *(Ex: pedido mínimo de R$ 50,00)*

---

### 2. Frete e Entrega

**2.1 — Como o frete será calculado?**

Escolha uma ou mais opções:

- [ ] **Frete fixo** — valor único para todo o Brasil *(ex: R$ 18,00 por pedido)*
- [ ] **Grátis acima de X reais** — *(ex: frete grátis em compras acima de R$ 250)*
- [ ] **Por região** — tabela manual que definimos juntos *(ex: Sudeste R$15, Norte R$28)*
- [ ] **Correios automático (PAC / SEDEX)** — calculado por peso e CEP do cliente *(requer contrato com os Correios)*
- [ ] **Transportadora parceira** — qual? _______________

> Qual a cidade e estado de onde os produtos serão enviados?

---

**2.2 — Qual o prazo médio de entrega?**

Essa informação aparece na página do produto e no checkout.

- Se souber por região: Sudeste ___ / Sul ___ / Nordeste ___ / Norte-CO ___ dias úteis
- Se não souber: usaremos uma faixa genérica como **"5 a 15 dias úteis"** — confirma?

---

### 3. Operacional

**3.1 — Onde os produtos estão estocados?**

- Em casa, em galpão, ou são feitos sob encomenda?
- Existe estoque físico ou os produtos são comprados após o pedido?

> Isso define como configuraremos o controle de estoque no painel.

---

## Prioridade de Resposta

Responda estes primeiro — bloqueiam o início do desenvolvimento:

| Prioridade | Pergunta | Por quê trava |
|---|---|---|
| 🔴 Alta | 1.1 — Gateway de pagamento | Sem definir, não dá para desenvolver o checkout |
| 🔴 Alta | 2.1 — Modelo de frete | Impacta o checkout e os custos do cliente |
| 🟡 Média | 1.2 — Parcelamento | Regra de negócio do checkout |
| 🟡 Média | 1.3 — Valor mínimo | Regra de negócio do carrinho |
| 🟡 Média | 2.2 — Prazo de entrega | Exibido na página do produto |
| 🟢 Pode esperar | 3.1 — Estoque | Definir antes de abrir vendas |

---

*Referência cruzada: [`plano-desenvolvimento.md`](plano-desenvolvimento.md)*
