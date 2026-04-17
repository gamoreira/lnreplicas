export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-pearl/60 text-xs font-body font-medium tracking-widest uppercase">
          {label}{required && <span className="text-gold ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-dark ${error ? 'border-red-500/60' : ''}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs font-body">{error}</p>}
    </div>
  )
}
