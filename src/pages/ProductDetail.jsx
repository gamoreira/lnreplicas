import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Zap, Star, ChevronLeft, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react'
import { products, formatPrice } from '../data/mockData'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = products.find((p) => p.id === parseInt(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — LN Réplicas`
      if (product.variations) setSelectedVariation(product.variations[0])
    }
  }, [product])

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <p className="font-display text-3xl text-pearl/40">Produto não encontrado</p>
        <button onClick={() => navigate('/produtos')} className="text-gold font-body text-sm mt-4 hover:underline">
          ← Voltar aos produtos
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({ ...product, variation: selectedVariation, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem({ ...product, variation: selectedVariation, quantity })
    navigate('/checkout')
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-pearl/40 hover:text-gold text-xs font-body tracking-widest uppercase transition-colors mb-8"
        >
          <ChevronLeft size={14} /> Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative overflow-hidden rounded-xl bg-graphite border border-white/5 aspect-square"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge type={product.badge} />
                </div>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm
                  flex items-center justify-center hover:bg-gold/20 transition-all duration-300"
              >
                <Heart size={18} className={wishlisted ? 'fill-gold text-gold' : 'text-pearl/60'} />
              </button>
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0
                      ${selectedImage === i ? 'border-gold' : 'border-white/10 hover:border-gold/40'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-pearl font-semibold leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-white/20'}
                    />
                  ))}
                </div>
                <span className="font-body text-pearl/50 text-xs">{product.rating} ({product.reviews} avaliações)</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-white/10 py-5">
              <div className="flex items-baseline gap-3">
                <span className="gold-text font-display text-4xl font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-pearl/30 text-lg line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="font-body text-pearl/50 text-xs mt-1">
                ou 12x de {formatPrice(product.price / 12)} sem juros no cartão
              </p>
              {product.originalPrice && (
                <p className="text-green-400 text-sm font-body font-medium mt-1">
                  ✓ Economize {formatPrice(product.originalPrice - product.price)}
                </p>
              )}
            </div>

            {/* Variations */}
            {product.variations && (
              <div>
                <p className="font-body text-xs text-pearl/60 uppercase tracking-widest mb-3">
                  {product.variationType === 'cor' ? 'Cor' : 'Tamanho'}:{' '}
                  <span className="text-champagne">{selectedVariation}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariation(v)}
                      className={`px-4 py-2 rounded text-sm font-body font-medium transition-all duration-300
                        ${selectedVariation === v
                          ? 'bg-gold text-obsidian border-2 border-gold'
                          : 'border border-white/20 text-pearl/60 hover:border-gold/50 hover:text-gold'
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-body text-xs text-pearl/60 uppercase tracking-widest mb-3">Quantidade</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/20 rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-pearl/60 hover:text-gold hover:bg-gold/10 transition-colors font-body text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-body text-pearl text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-pearl/60 hover:text-gold hover:bg-gold/10 transition-colors font-body text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                variant={added ? 'ghost' : 'outline'}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart size={16} />
                {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
              </Button>
              <Button onClick={handleBuyNow} size="lg" className="flex-1">
                <Zap size={16} /> Comprar Agora
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, label: 'Qualidade Garantida' },
                { icon: Truck, label: 'Frete para todo Brasil' },
                { icon: RotateCcw, label: 'Troca em 7 dias' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded border border-white/8 text-center">
                  <Icon size={16} className="text-gold/60" />
                  <span className="font-body text-[10px] text-pearl/40 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-white/10 pt-5">
              <h3 className="font-display text-pearl text-lg mb-2">Descrição</h3>
              <p className="font-body text-pearl/60 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Você também pode gostar</span>
              <h2 className="font-display text-3xl text-pearl mt-2">Produtos Relacionados</h2>
              <div className="w-12 h-px bg-gold/40 mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
