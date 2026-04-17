import { motion } from 'framer-motion'

export default function PaymentOption({ id, icon, title, subtitle, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full flex items-center gap-4 p-4 rounded border text-left transition-all duration-300
        ${selected
          ? 'border-gold bg-gold/10 shadow-[0_0_16px_#C9A84C22]'
          : 'border-white/10 bg-graphite hover:border-gold/40'
        }
      `}
    >
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-pearl text-sm">{title}</p>
        {subtitle && <p className="font-body text-xs text-pearl/50 mt-0.5">{subtitle}</p>}
      </div>
      <div className={`
        w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-300
        ${selected ? 'border-gold bg-gold' : 'border-white/30'}
      `} />
    </motion.button>
  )
}
