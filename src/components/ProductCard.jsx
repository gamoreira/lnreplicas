import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Badge from './Badge'
import { formatPrice } from '../data/mockData'

export default function ProductCard({ product, delay = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ ...product, variation: null })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-graphite border border-white/5
          group-hover:border-gold/40 transition-all duration-500
          group-hover:shadow-[0_8px_40px_#C9A84C18]">

          {/* Image */}
          <div className="relative overflow-hidden aspect-square bg-[#111]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <Badge type={product.badge} />
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted) }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm
                flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300
                hover:bg-gold/20"
            >
              <Heart
                size={14}
                className={wishlisted ? 'fill-gold text-gold' : 'text-pearl/70'}
              />
            </button>

            {/* Add to cart overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAdd}
                className={`w-full py-2.5 rounded text-xs font-body font-semibold tracking-widest uppercase
                  flex items-center justify-center gap-2 transition-all duration-300
                  ${added
                    ? 'bg-green-600/80 text-white'
                    : 'btn-gold'
                  }`}
              >
                <ShoppingCart size={14} />
                {added ? 'Adicionado!' : 'Adicionar'}
              </button>
            </div>
          </div>

          {/* Info — altura fixa para todos os cards ficarem iguais */}
          <div className="p-4 flex flex-col" style={{ minHeight: '108px' }}>
            <h3 className="font-display text-pearl text-base leading-snug mb-1 group-hover:text-champagne transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mt-auto pt-2">
              <span className="gold-text font-body font-bold text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-pearl/30 text-xs line-through font-body">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs font-body mt-0.5" style={{ minHeight: '16px' }}>
              {product.originalPrice ? (
                <span className="text-green-400">
                  Economize {formatPrice(product.originalPrice - product.price)}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
