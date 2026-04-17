import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Menu, X, Instagram } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Início', path: '/' },
  { label: 'Produtos', path: '/produtos' },
  { label: 'Anéis', path: '/produtos?categoria=aneis' },
  { label: 'Relógios', path: '/produtos?categoria=relogios' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${scrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/20 py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="Lu Niero — Réplicas de Jóias"
              className="h-12 w-auto brightness-0 invert sepia saturate-[3] hue-rotate-[5deg]
                opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(40%) saturate(500%) hue-rotate(5deg) brightness(95%)' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-xs tracking-widest uppercase transition-all duration-300
                  ${location.pathname === link.path
                    ? 'text-gold'
                    : 'text-pearl/60 hover:text-gold'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/ln.replicas/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-pearl/50 hover:text-gold transition-colors p-1.5"
            >
              <Instagram size={18} />
            </a>

            <Link
              to={user ? '/minha-conta' : '/conta'}
              className="text-pearl/50 hover:text-gold transition-colors p-1.5"
            >
              <User size={18} />
            </Link>

            <Link to="/carrinho" className="relative text-pearl/50 hover:text-gold transition-colors p-1.5">
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-obsidian text-[10px]
                    font-body font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-pearl/50 hover:text-gold transition-colors p-1.5"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-graphite border-l border-gold/20 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <img
                  src="/logo.svg"
                  alt="Lu Niero"
                  className="h-10 w-auto"
                  style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(40%) saturate(500%) hue-rotate(5deg) brightness(95%)' }}
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-pearl/50 hover:text-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      className="block py-3 px-4 rounded font-body text-sm tracking-widest uppercase
                        text-pearl/70 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto p-6 border-t border-white/10 flex flex-col gap-3">
                <Link
                  to={user ? '/minha-conta' : '/conta'}
                  className="flex items-center gap-3 py-3 px-4 rounded text-pearl/60
                    hover:text-gold hover:bg-gold/5 transition-all duration-300 font-body text-sm"
                >
                  <User size={16} />
                  {user ? user.name : 'Entrar / Cadastrar'}
                </Link>
                <a
                  href="https://www.instagram.com/ln.replicas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-4 rounded text-pearl/60
                    hover:text-gold hover:bg-gold/5 transition-all duration-300 font-body text-sm"
                >
                  <Instagram size={16} />
                  @ln.replicas
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
