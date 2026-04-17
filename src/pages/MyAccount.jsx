import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Package, User, MapPin, Heart, LogOut,
  ChevronRight, Eye, ExternalLink
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { mockOrders, formatPrice } from '../data/mockData'
import Input from '../components/Input'
import Button from '../components/Button'

const statusConfig = {
  entregue: { label: 'Entregue', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  em_transito: { label: 'Em Trânsito', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  processando: { label: 'Processando', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  cancelado: { label: 'Cancelado', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

const navItems = [
  { id: 'orders', label: 'Meus Pedidos', icon: Package },
  { id: 'data', label: 'Meus Dados', icon: User },
  { id: 'addresses', label: 'Endereços', icon: MapPin },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
]

export default function MyAccount() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('orders')

  useEffect(() => {
    if (!isAuthenticated) navigate('/conta')
    document.title = 'Minha Conta — LN Réplicas'
  }, [isAuthenticated, navigate])

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-gold/60 font-body text-xs tracking-[0.4em] uppercase">Olá, {user.name.split(' ')[0]}</span>
          <h1 className="font-display text-4xl text-pearl mt-1">Minha Conta</h1>
          <div className="w-12 h-px bg-gold/40 mt-3" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-graphite rounded-xl border border-white/8 overflow-hidden">
              {/* User info */}
              <div className="p-5 border-b border-white/8">
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center mb-3">
                  <span className="font-display text-gold font-bold text-lg">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <p className="font-display text-pearl text-base">{user.name}</p>
                <p className="font-body text-pearl/40 text-xs mt-0.5 truncate">{user.email}</p>
              </div>

              {/* Nav */}
              <nav className="p-2">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body transition-all duration-300
                      ${activeSection === id
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-pearl/50 hover:text-pearl hover:bg-white/5'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body
                    text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 mt-1"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* Orders */}
            {activeSection === 'orders' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-graphite rounded-xl border border-white/8 overflow-hidden"
              >
                <div className="p-5 border-b border-white/8">
                  <h2 className="font-display text-2xl text-pearl">Meus Pedidos</h2>
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/8">
                        {['Pedido', 'Data', 'Itens', 'Total', 'Status', ''].map((h) => (
                          <th key={h} className="px-5 py-3 text-left font-body text-xs text-pearl/30 uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => {
                        const status = statusConfig[order.status]
                        return (
                          <tr key={order.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                            <td className="px-5 py-4 font-body text-gold text-sm">{order.id}</td>
                            <td className="px-5 py-4 font-body text-pearl/50 text-sm">
                              {new Date(order.date).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-5 py-4 font-body text-pearl/50 text-sm">{order.items.length} item(s)</td>
                            <td className="px-5 py-4 font-body text-champagne font-semibold text-sm">{formatPrice(order.total)}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-body font-semibold border ${status.color}`}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <button className="text-pearl/30 hover:text-gold transition-colors">
                                <Eye size={15} />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-white/5">
                  {mockOrders.map((order) => {
                    const status = statusConfig[order.status]
                    return (
                      <div key={order.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-body text-gold text-sm font-semibold">{order.id}</span>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body border ${status.color}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="font-body text-pearl/40 text-xs">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                        <p className="font-body text-champagne font-semibold text-sm mt-1">{formatPrice(order.total)}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* My Data */}
            {activeSection === 'data' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl text-pearl mb-6">Meus Dados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Nome Completo" defaultValue={user.name} className="sm:col-span-2" />
                  <Input label="Email" type="email" defaultValue={user.email} />
                  <Input label="CPF" defaultValue={user.cpf || ''} />
                  <Input label="Telefone" defaultValue={user.phone || ''} />
                </div>
                <Button className="mt-6">Salvar Alterações</Button>
              </motion.div>
            )}

            {/* Addresses */}
            {activeSection === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl text-pearl mb-6">Endereços</h2>
                {user.address ? (
                  <div className="p-4 border border-gold/20 rounded-lg bg-gold/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-body text-pearl text-sm font-semibold">Endereço Principal</p>
                        <p className="font-body text-pearl/60 text-sm mt-1">
                          {user.address?.street}, {user.address?.number} — {user.address?.complement}
                        </p>
                        <p className="font-body text-pearl/60 text-sm">
                          {user.address?.neighborhood}, {user.address?.city} — {user.address?.state}
                        </p>
                        <p className="font-body text-pearl/40 text-xs mt-1">CEP: {user.address?.cep}</p>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-body text-gold border border-gold/30 rounded">Principal</span>
                    </div>
                  </div>
                ) : (
                  <p className="font-body text-pearl/40 text-sm">Nenhum endereço cadastrado.</p>
                )}
                <Button variant="outline" className="mt-4">+ Adicionar Endereço</Button>
              </motion.div>
            )}

            {/* Favorites */}
            {activeSection === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-graphite rounded-xl border border-white/8 p-8 text-center"
              >
                <Heart size={40} className="text-gold/20 mx-auto mb-4" />
                <h2 className="font-display text-2xl text-pearl mb-2">Lista de Favoritos</h2>
                <p className="font-body text-pearl/50 text-sm mb-6">
                  Salve suas peças favoritas clicando no ♡ nos produtos.
                </p>
                <Link to="/produtos">
                  <Button variant="outline">Explorar Produtos <ChevronRight size={14} /></Button>
                </Link>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
