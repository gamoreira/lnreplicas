export default function Badge({ type = 'NOVO' }) {
  const styles = {
    'NOVO': 'bg-gold/20 text-gold border border-gold/40',
    'MAIS VENDIDO': 'bg-orange-500/20 text-orange-400 border border-orange-500/40',
    'PROMOÇÃO': 'bg-red-500/20 text-red-400 border border-red-500/40',
  }

  const labels = {
    'NOVO': '✦ NOVO',
    'MAIS VENDIDO': '🔥 MAIS VENDIDO',
    'PROMOÇÃO': '⚡ PROMOÇÃO',
  }

  return (
    <span className={`
      inline-block px-2 py-0.5 rounded text-[10px] font-body font-semibold
      tracking-widest uppercase ${styles[type] || styles['NOVO']}
    `}>
      {labels[type] || type}
    </span>
  )
}
