import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-gold/15 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo.svg"
                alt="Lu Niero — Réplicas de Jóias"
                className="h-20 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(40%) saturate(500%) hue-rotate(5deg) brightness(95%)' }}
              />
            </div>
            <p className="font-body text-pearl/50 text-sm leading-relaxed">
              Sofisticação e brilho acessíveis. Joias e réplicas premium que fazem você se sentir especial todos os dias.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/ln.replicas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-gold/30 flex items-center justify-center
                  text-gold/60 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-gold/30 flex items-center justify-center
                  text-gold/60 hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-body text-gold text-xs tracking-widest uppercase font-semibold mb-4">
              Navegação
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Início', to: '/' },
                { label: 'Todos os Produtos', to: '/produtos' },
                { label: 'Anéis', to: '/produtos?categoria=aneis' },
                { label: 'Colares', to: '/produtos?categoria=colares' },
                { label: 'Relógios', to: '/produtos?categoria=relogios' },
                { label: 'Kits', to: '/produtos?categoria=kits' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-pearl/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-body text-gold text-xs tracking-widest uppercase font-semibold mb-4">
              Informações
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                'Política de Troca',
                'Prazo de Entrega',
                'Formas de Pagamento',
                'Rastrear Pedido',
                'FAQ',
              ].map((item) => (
                <li key={item}>
                  <span className="font-body text-pearl/50 text-sm hover:text-gold transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-gold text-xs tracking-widest uppercase font-semibold mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-pearl/50 text-sm font-body">
                <Instagram size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/ln.replicas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @ln.replicas
                </a>
              </div>
              <div className="flex items-start gap-2 text-pearl/50 text-sm font-body">
                <Mail size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span>contato@lnreplicas.com.br</span>
              </div>
            </div>

            {/* Payment icons */}
            <div className="mt-6">
              <p className="font-body text-xs text-pearl/30 uppercase tracking-widest mb-2">
                Pagamentos
              </p>
              <div className="flex flex-wrap gap-2">
                {['Pix', 'Cartão', 'Boleto'].map((method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px]
                      font-body text-pearl/50 tracking-wider"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-pearl/30 text-xs">
            © {new Date().getFullYear()} LN Réplicas. Todos os direitos reservados.
          </p>
          <p className="font-body text-pearl/20 text-xs">
            Réplicas de alta qualidade — não somos afiliados às marcas originais.
          </p>
        </div>
      </div>
    </footer>
  )
}
