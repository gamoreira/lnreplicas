import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}) {
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'btn-gold rounded',
    outline: 'btn-outline-gold rounded',
    ghost: 'bg-transparent text-pearl/70 hover:text-gold border border-transparent hover:border-gold/30 rounded font-body font-medium tracking-widest uppercase text-xs transition-all duration-300 cursor-pointer',
    danger: 'bg-red-900/30 text-red-400 border border-red-800/50 hover:bg-red-900/50 rounded font-body font-medium tracking-widest uppercase text-xs transition-all duration-300 cursor-pointer',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
        inline-flex items-center justify-center gap-2
      `}
    >
      {children}
    </motion.button>
  )
}
