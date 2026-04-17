import { Check } from 'lucide-react'

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`
                w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 font-body font-semibold text-sm
                ${isCompleted ? 'bg-gold border-gold text-obsidian' : ''}
                ${isActive ? 'border-gold text-gold bg-gold/10' : ''}
                ${!isCompleted && !isActive ? 'border-white/20 text-white/30' : ''}
              `}>
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className={`text-[10px] font-body tracking-wider uppercase whitespace-nowrap hidden sm:block
                ${isActive ? 'text-gold' : isCompleted ? 'text-gold/60' : 'text-white/30'}
              `}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-all duration-500 ${isCompleted ? 'bg-gold/60' : 'bg-white/10'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
