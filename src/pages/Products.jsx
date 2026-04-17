import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/mockData'

const sortOptions = [
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'price_asc', label: 'Menor Preço' },
  { value: 'price_desc', label: 'Maior Preço' },
  { value: 'rating', label: 'Melhor Avaliados' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('newest')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const activeCategory = searchParams.get('categoria') || 'all'

  useEffect(() => {
    document.title = 'Produtos — LN Réplicas'
  }, [])

  const setCategory = (cat) => {
    if (cat === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ categoria: cat })
    }
  }

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)

    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [activeCategory, sort])

  const allCategories = [{ id: 'all', name: 'Todos', icon: '✦' }, ...categories]

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Loja</span>
          <h1 className="font-display text-4xl sm:text-5xl text-pearl mt-2">Todos os Produtos</h1>
          <div className="w-12 h-px bg-gold/40 mt-3" />
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Category pills — desktop */}
          <div className="flex-1 flex flex-wrap gap-2 hidden sm:flex">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded text-xs font-body font-medium tracking-widest uppercase transition-all duration-300
                  ${activeCategory === cat.id
                    ? 'bg-gold text-obsidian'
                    : 'border border-white/15 text-pearl/50 hover:border-gold/40 hover:text-gold'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 border border-white/15 rounded text-pearl/60 text-xs font-body tracking-widest uppercase"
          >
            <SlidersHorizontal size={14} />
            Filtrar
            {activeCategory !== 'all' && (
              <span className="w-4 h-4 rounded-full bg-gold text-obsidian text-[10px] flex items-center justify-center font-bold">1</span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-white/15 rounded text-pearl/60 text-xs font-body tracking-wider"
            >
              {sortOptions.find((s) => s.value === sort)?.label}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-graphite border border-gold/20 rounded shadow-xl z-20 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false) }}
                    className={`w-full text-left px-4 py-3 text-xs font-body tracking-wider transition-colors
                      ${sort === opt.value ? 'text-gold bg-gold/10' : 'text-pearl/60 hover:text-gold hover:bg-gold/5'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter pills */}
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mb-6 sm:hidden"
          >
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setMobileFilterOpen(false) }}
                className={`px-3 py-1.5 rounded text-xs font-body tracking-widest uppercase transition-all
                  ${activeCategory === cat.id
                    ? 'bg-gold text-obsidian'
                    : 'border border-white/15 text-pearl/50 hover:border-gold/40 hover:text-gold'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* Count */}
        <p className="font-body text-pearl/30 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          {activeCategory !== 'all' && (
            <button onClick={() => setCategory('all')} className="ml-2 text-gold hover:underline">
              <X size={12} className="inline" /> limpar filtro
            </button>
          )}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 0.05} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-pearl/30 mb-3">Nenhum produto encontrado</p>
            <button onClick={() => setCategory('all')} className="text-gold font-body text-sm hover:underline">
              Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
