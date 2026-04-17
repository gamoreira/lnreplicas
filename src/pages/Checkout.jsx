import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle, Copy } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockData'
import Stepper from '../components/Stepper'
import Input from '../components/Input'
import Button from '../components/Button'
import PaymentOption from '../components/PaymentOption'

const STEPS = ['Identificação', 'Endereço', 'Pagamento']

const paymentMethods = [
  { id: 'pix', icon: '📱', title: 'Pix', subtitle: 'Aprovação instantânea — 5% de desconto' },
  { id: 'credit', icon: '💳', title: 'Cartão de Crédito', subtitle: 'Até 12x sem juros' },
  { id: 'debit', icon: '💳', title: 'Cartão de Débito', subtitle: 'Débito à vista' },
  { id: 'boleto', icon: '📄', title: 'Boleto Bancário', subtitle: 'Vencimento em 3 dias úteis' },
]

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [orderDone, setOrderDone] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', cpf: '', phone: '',
    cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
    payment: 'pix',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
    installments: '1',
  })

  useEffect(() => {
    document.title = 'Checkout — LN Réplicas'
  }, [])

  useEffect(() => {
    if (items.length === 0 && !orderDone) navigate('/carrinho')
  }, [items, orderDone, navigate])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const fetchCep = async (cep) => {
    const cleaned = cep.replace(/\D/g, '')
    if (cleaned.length !== 8) return
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm((f) => ({
          ...f,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }))
      }
    } catch {}
  }

  const shipping = total >= 299 ? 0 : 18.90
  const pixDiscount = form.payment === 'pix' ? total * 0.05 : 0
  const finalTotal = total + shipping - pixDiscount

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
    else handleFinish()
  }

  const handleFinish = () => {
    clearCart()
    setOrderDone(true)
  }

  if (orderDone) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={36} className="text-green-400" />
          </motion.div>
          <h2 className="font-display text-4xl text-pearl mb-3">Pedido Confirmado!</h2>
          <p className="font-body text-pearl/60 text-sm leading-relaxed mb-6">
            Seu pedido foi recebido com sucesso. Você receberá uma confirmação por email em breve.
          </p>
          <div className="bg-graphite border border-gold/20 rounded-xl p-4 mb-8">
            <p className="font-body text-pearl/50 text-xs uppercase tracking-widest mb-1">Número do Pedido</p>
            <p className="font-display text-gold text-xl">#LN-{Date.now().toString().slice(-6)}</p>
          </div>
          <Button onClick={() => navigate('/')} size="lg" fullWidth>
            Voltar à Loja
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-pearl mb-6">Finalizar Compra</h1>
          <Stepper steps={STEPS} currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0 — Identification */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl text-pearl mb-6">Seus Dados</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Nome Completo" value={form.name} onChange={set('name')} placeholder="Ana Carolina Silva" required className="sm:col-span-2" />
                    <Input label="Email" type="email" value={form.email} onChange={set('email')} placeholder="ana@email.com" required />
                    <Input label="CPF" value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" required />
                    <Input label="Telefone / WhatsApp" type="tel" value={form.phone} onChange={set('phone')} placeholder="(11) 99999-9999" required className="sm:col-span-2" />
                  </div>
                </motion.div>
              )}

              {/* Step 1 — Address */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl text-pearl mb-6">Endereço de Entrega</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="CEP"
                      value={form.cep}
                      onChange={(e) => { set('cep')(e); fetchCep(e.target.value) }}
                      placeholder="00000-000"
                      required
                    />
                    <Input label="Rua / Logradouro" value={form.street} onChange={set('street')} placeholder="Av. Paulista" required className="sm:col-span-2" />
                    <Input label="Número" value={form.number} onChange={set('number')} placeholder="1000" required />
                    <Input label="Complemento" value={form.complement} onChange={set('complement')} placeholder="Apto 42" />
                    <Input label="Bairro" value={form.neighborhood} onChange={set('neighborhood')} placeholder="Bela Vista" required />
                    <Input label="Cidade" value={form.city} onChange={set('city')} placeholder="São Paulo" required />
                    <Input label="Estado" value={form.state} onChange={set('state')} placeholder="SP" required />
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8"
                >
                  <h2 className="font-display text-2xl text-pearl mb-6">Forma de Pagamento</h2>
                  <div className="flex flex-col gap-3 mb-6">
                    {paymentMethods.map((m) => (
                      <PaymentOption
                        key={m.id}
                        {...m}
                        selected={form.payment === m.id}
                        onSelect={(id) => setForm((f) => ({ ...f, payment: id }))}
                      />
                    ))}
                  </div>

                  {/* Pix details */}
                  {form.payment === 'pix' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-black/30 rounded-lg p-5 border border-gold/15"
                    >
                      <p className="font-body text-xs text-gold uppercase tracking-widest mb-4">Chave Pix</p>
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                          <div className="grid grid-cols-7 gap-0.5 p-2">
                            {Array.from({ length: 49 }).map((_, i) => (
                              <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 rounded p-3">
                        <code className="text-pearl/70 text-xs font-body flex-1 break-all">lnreplicas@pagamentos.com.br</code>
                        <button className="text-gold hover:text-champagne transition-colors flex-shrink-0">
                          <Copy size={14} />
                        </button>
                      </div>
                      <p className="text-green-400 text-xs font-body mt-2 text-center">5% de desconto aplicado!</p>
                    </motion.div>
                  )}

                  {/* Card details */}
                  {(form.payment === 'credit' || form.payment === 'debit') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <Input label="Número do Cartão" value={form.cardNumber} onChange={set('cardNumber')} placeholder="0000 0000 0000 0000" className="sm:col-span-2" />
                      <Input label="Nome no Cartão" value={form.cardName} onChange={set('cardName')} placeholder="ANA C SILVA" className="sm:col-span-2" />
                      <Input label="Validade" value={form.cardExpiry} onChange={set('cardExpiry')} placeholder="MM/AA" />
                      <Input label="CVV" value={form.cardCvv} onChange={set('cardCvv')} placeholder="123" />
                      {form.payment === 'credit' && (
                        <div className="sm:col-span-2">
                          <label className="text-pearl/60 text-xs font-body font-medium tracking-widest uppercase block mb-1.5">
                            Parcelamento
                          </label>
                          <select
                            value={form.installments}
                            onChange={set('installments')}
                            className="input-dark rounded"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n} style={{ background: '#1E1E1E' }}>
                                {n}x de {formatPrice(finalTotal / n)}{n === 1 ? ' à vista' : ' sem juros'}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Boleto */}
                  {form.payment === 'boleto' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-6 bg-black/20 rounded-lg border border-white/8"
                    >
                      <p className="font-body text-pearl/60 text-sm mb-4">
                        O boleto será gerado após a confirmação do pedido. Vencimento em 3 dias úteis.
                      </p>
                      <Button variant="outline">📄 Gerar Boleto</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-5">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={16} /> Voltar
                </Button>
              ) : (
                <div />
              )}
              <Button onClick={handleNext} size="lg">
                {step === STEPS.length - 1 ? 'Confirmar Pedido' : 'Continuar'}
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-graphite rounded-xl border border-gold/15 p-6">
              <h3 className="font-display text-lg text-pearl mb-4">Resumo</h3>
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variation}`} className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-[#111]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-pearl/70 text-xs leading-snug truncate">{item.name}</p>
                      {item.variation && <p className="text-pearl/30 text-[10px]">{item.variation}</p>}
                      <p className="text-pearl/50 text-xs">×{item.quantity}</p>
                    </div>
                    <span className="font-body text-champagne text-xs font-semibold flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-sm font-body">
                <div className="flex justify-between text-pearl/50">
                  <span>Subtotal</span><span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-pearl/50">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                </div>
                {pixDiscount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Desconto Pix (5%)</span>
                    <span>−{formatPrice(pixDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                  <span className="text-pearl font-semibold">Total</span>
                  <span className="gold-text font-bold text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
