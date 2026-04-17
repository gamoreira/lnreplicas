import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockData'
import Button from '../components/Button'

export default function Cart() {
  const { items, total, removeItem, updateQuantity } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Carrinho — LN Réplicas'
  }, [])

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gold/40" />
          </div>
          <h2 className="font-display text-3xl text-pearl mb-3">Seu carrinho está vazio</h2>
          <p className="font-body text-pearl/50 text-sm leading-relaxed mb-8">
            Explore nossa coleção e adicione as peças que você amar.
          </p>
          <Link to="/produtos">
            <Button size="lg">Explorar Produtos <ArrowRight size={16} /></Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const shipping = total >= 299 ? 0 : 18.90

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-pearl/40 hover:text-gold text-xs font-body tracking-widest uppercase transition-colors mb-4"
          >
            <ChevronLeft size={14} /> Continuar Comprando
          </button>
          <h1 className="font-display text-4xl sm:text-5xl text-pearl">Meu Carrinho</h1>
          <div className="w-12 h-px bg-gold/40 mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.variation}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  layout
                  className="flex gap-4 p-4 bg-graphite rounded-xl border border-white/8 hover:border-gold/20 transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/produto/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#111]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${item.id}`}>
                      <h3 className="font-display text-pearl text-base hover:text-champagne transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    {item.variation && (
                      <p className="font-body text-pearl/40 text-xs mt-0.5">{item.variation}</p>
                    )}
                    <p className="gold-text font-body font-bold text-base mt-2">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      onClick={() => removeItem(item.id, item.variation)}
                      className="text-pearl/20 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="flex items-center border border-white/15 rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.variation, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-pearl/50 hover:text-gold hover:bg-gold/10 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-body text-pearl text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.variation, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-pearl/50 hover:text-gold hover:bg-gold/10 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <p className="font-body text-champagne font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-graphite rounded-xl border border-gold/15 p-6">
              <h2 className="font-display text-xl text-pearl mb-5">Resumo do Pedido</h2>

              <div className="flex flex-col gap-3 text-sm font-body">
                <div className="flex justify-between text-pearl/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-pearl/60">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-pearl/30 text-xs">
                    Frete grátis acima de {formatPrice(299)}
                  </p>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                  <span className="font-semibold text-pearl">Total</span>
                  <span className="gold-text font-bold text-xl">{formatPrice(total + shipping)}</span>
                </div>
                <p className="text-pearl/30 text-xs text-right">
                  ou 12x de {formatPrice((total + shipping) / 12)}
                </p>
              </div>

              <Button onClick={() => navigate('/checkout')} size="lg" fullWidth className="mt-6">
                Finalizar Compra <ArrowRight size={16} />
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4">
                {['Pix', 'Cartão', 'Boleto'].map((m) => (
                  <span key={m} className="text-pearl/30 text-[10px] font-body uppercase tracking-widest">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
