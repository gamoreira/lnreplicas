import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Account() {
  const [mode, setMode] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', cpf: '', phone: '', password: '', confirmPassword: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/minha-conta')
    document.title = 'Minha Conta — LN Réplicas'
  }, [isAuthenticated, navigate])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      const ok = login(form.email, form.password)
      if (!ok) setError('Email ou senha inválidos.')
    } else {
      if (form.password !== form.confirmPassword) {
        setError('As senhas não coincidem.')
        return
      }
      register({ name: form.name, email: form.email, cpf: form.cpf, phone: form.phone })
    }
  }

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-gold font-bold text-xl">LN</span>
          </div>
          <h1 className="font-display text-4xl text-pearl">Minha Conta</h1>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden border border-white/10 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 font-body text-sm tracking-wider transition-all duration-300
              ${mode === 'login' ? 'bg-gold text-obsidian font-semibold' : 'text-pearl/50 hover:text-pearl'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 font-body text-sm tracking-wider transition-all duration-300
              ${mode === 'register' ? 'bg-gold text-obsidian font-semibold' : 'text-pearl/50 hover:text-pearl'}`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-graphite rounded-xl border border-white/8 p-6 sm:p-8 flex flex-col gap-4">
          {mode === 'register' && (
            <>
              <Input label="Nome Completo" value={form.name} onChange={set('name')} placeholder="Ana Carolina Silva" required />
              <Input label="CPF" value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" required />
              <Input label="Telefone / WhatsApp" type="tel" value={form.phone} onChange={set('phone')} placeholder="(11) 99999-9999" required />
            </>
          )}

          <Input label="Email" type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" required />

          <div className="relative">
            <Input
              label="Senha"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={set('password')}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 bottom-2.5 text-pearl/30 hover:text-gold transition-colors"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {mode === 'register' && (
            <Input
              label="Confirmar Senha"
              type="password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              placeholder="••••••••"
              required
            />
          )}

          {error && (
            <p className="text-red-400 text-xs font-body bg-red-500/10 border border-red-500/20 rounded p-3">
              {error}
            </p>
          )}

          {mode === 'login' && (
            <button type="button" className="text-gold/60 hover:text-gold text-xs font-body text-right transition-colors">
              Esqueci minha senha
            </button>
          )}

          <Button type="submit" size="lg" fullWidth className="mt-2">
            {mode === 'login' ? (
              <><LogIn size={16} /> Entrar</>
            ) : (
              <><UserPlus size={16} /> Criar Conta</>
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-pearl/30 text-xs font-body">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social login (visual only) */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded border border-white/15
              text-pearl/60 hover:border-gold/30 hover:text-pearl transition-all duration-300 font-body text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>
        </form>
      </motion.div>
    </div>
  )
}
