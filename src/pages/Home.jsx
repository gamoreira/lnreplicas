import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Instagram, MessageCircle, Mail, Star, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { products, categories, formatPrice } from '../data/mockData'

// Floating gold particles
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.15,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, #F0D080 0%, #C9A84C 60%, transparent 100%)`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
          alt="Hero"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-obsidian" />
      </div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-gold/70 font-body text-xs tracking-[0.4em] uppercase">
            <Sparkles size={12} />
            Coleção Exclusiva 2026
            <Sparkles size={12} />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-4"
        >
          <span className="text-pearl block">LN Réplicas</span>
          <span className="gold-shimmer block mt-1">Sofisticação</span>
          <span className="text-pearl/80 font-light block text-3xl sm:text-4xl md:text-5xl mt-2">
            que você merece
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="border border-gold/20 rounded-lg px-6 py-5 bg-black/30 backdrop-blur-sm
            relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <p className="font-display text-pearl/90 text-lg sm:text-xl leading-relaxed italic">
              Feminilidade, presença e sofisticação
            </p>
            <p className="font-body text-pearl/60 text-sm tracking-wide mt-1">
              Réplicas Premium com estética de joalheria
            </p>
            <p className="font-display text-champagne text-base sm:text-lg mt-3 font-semibold tracking-wide">
              ✨ Luxo Silencioso
            </p>
            <p className="font-body text-pearl/50 text-xs tracking-widest uppercase mt-1">
              Para Mulheres que sabem quem são
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link to="/produtos">
            <Button size="lg" className="min-w-44">
              Explorar Coleções <ChevronRight size={16} />
            </Button>
          </Link>
          <a
            href="https://www.instagram.com/ln.replicas/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4 rounded inline-flex items-center gap-2 text-sm"
          >
            <Instagram size={16} />
            @ln.replicas
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-14"
        >
          {[
            { value: '1.200+', label: 'Clientes' },
            { value: '4.9★', label: 'Avaliação' },
            { value: '100%', label: 'Qualidade' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="gold-text font-display text-2xl sm:text-3xl font-semibold">{stat.value}</div>
              <div className="font-body text-pearl/40 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}

// New Collections
function NewCollections() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Recém Chegados</span>
        <h2 className="section-title text-pearl mt-2">Novas Coleções</h2>
        <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {newProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 0.1} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link to="/produtos">
          <Button variant="outline">Ver Todas as Peças <ChevronRight size={14} /></Button>
        </Link>
      </motion.div>
    </section>
  )
}

// Categories
function CategoriesSection() {
  return (
    <section className="py-20 bg-graphite/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Explore por</span>
          <h2 className="section-title text-pearl mt-2">Categorias</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
        </motion.div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-6 md:overflow-visible">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 md:flex-shrink"
            >
              <Link to={`/produtos?categoria=${cat.id}`}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="group relative w-36 md:w-auto rounded-xl overflow-hidden border border-white/5
                    hover:border-gold/40 transition-all duration-400 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <p className="font-display text-pearl text-base font-semibold group-hover:text-champagne transition-colors">
                      {cat.name}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured / Best Sellers
function FeaturedSection() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 4)

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">🔥 Destaques</span>
        <h2 className="section-title text-pearl mt-2">Mais Vendidos</h2>
        <div className="w-16 h-px bg-gold/40 mx-auto mt-4" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

// About
function AboutSection() {
  return (
    <section className="py-20 bg-graphite/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-gold font-bold text-xl">LN</span>
          </div>
          <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Nossa História</span>
          <h2 className="section-title text-pearl mt-3 mb-6">Sobre a LN Réplicas</h2>
          <p className="font-body text-pearl/60 text-base leading-relaxed max-w-2xl mx-auto">
            Nascemos da paixão por estilo e beleza acessível. Na LN Réplicas, acreditamos que toda pessoa merece se sentir sofisticada — por isso selecionamos as melhores réplicas de joias e relógios com acabamento premium, materiais de alta qualidade e atenção a cada detalhe.
          </p>
          <p className="font-body text-pearl/60 text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Cada peça passa por rigoroso controle de qualidade antes de chegar até você. Brilhe com confiança, todos os dias.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <a
              href="https://www.instagram.com/ln.replicas/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-7 py-3 rounded inline-flex items-center gap-2 text-sm"
            >
              <Instagram size={16} />
              Seguir @ln.replicas
            </a>
          </div>

          {/* Reviews */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
            <span className="font-body text-pearl/50 text-sm ml-2">4.9 de 5 — mais de 1.200 clientes satisfeitos</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Newsletter + WhatsApp
function ContactSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-graphite/50 to-obsidian" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Fique por dentro</span>
          <h2 className="section-title text-pearl mt-3 mb-3">Receba Novidades</h2>
          <p className="font-body text-pearl/50 text-sm mb-8">
            Cadastre seu email e receba promoções exclusivas, lançamentos e ofertas especiais.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-gold font-body"
            >
              ✦ Cadastro realizado com sucesso! Em breve você receberá novidades.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com.br"
                required
                className="input-dark flex-1 rounded"
              />
              <Button type="submit" className="flex-shrink-0">
                <Mail size={14} /> Cadastrar
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="flex-1 h-px bg-white/10 max-w-24" />
            <span className="font-body text-pearl/30 text-xs uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-white/10 max-w-24" />
          </div>

          <a
            href="https://wa.me/5511999999999?text=Olá! Vim do site da LN Réplicas e gostaria de mais informações."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded bg-green-600/20 border border-green-500/30
              text-green-400 hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-300 font-body text-sm font-medium"
          >
            <MessageCircle size={20} className="fill-green-400" />
            Falar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'LN Réplicas — Sofisticação que você merece'
  }, [])

  return (
    <>
      <HeroSection />
      <NewCollections />
      <CategoriesSection />
      <FeaturedSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
