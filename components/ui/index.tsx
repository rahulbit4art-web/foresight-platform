// ── Button ────────────────────────────────────────────────────────────────────
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'teal' | 'ghost'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[#c84b2f] hover:bg-[#b33f24] text-white border border-[#c84b2f]',
    teal: 'bg-[#2d6a6a] hover:bg-[#245555] text-white border border-[#2d6a6a]',
    ghost: 'bg-transparent text-stone-600 border border-stone-300 hover:bg-stone-100',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

// ── TextArea ──────────────────────────────────────────────────────────────────
import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  qNum: string
  qNumColor?: string
}

export function TextArea({ label, qNum, qNumColor = 'text-stone-400', className = '', ...props }: TextAreaProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden mb-2 focus-within:border-[#c84b2f] focus-within:ring-2 focus-within:ring-[#c84b2f]/10 transition-all">
      <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 border-b border-stone-100">
        <span className={`text-xs font-semibold ${qNumColor} min-w-[14px]`}>{qNum}</span>
        <span className="text-xs font-medium text-stone-700">{label}</span>
      </div>
      <textarea
        className={`w-full px-3 py-2.5 text-xs text-stone-800 bg-transparent border-none outline-none resize-y leading-relaxed placeholder:text-stone-300 min-h-[56px] ${className}`}
        {...props}
      />
    </div>
  )
}

// ── Chip ──────────────────────────────────────────────────────────────────────
interface ChipProps {
  label: string
  isAuto?: boolean
  onRemove?: () => void
}

export function Chip({ label, isAuto = false, onRemove }: ChipProps) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-100 border border-stone-200 rounded-md text-xs text-stone-700 group hover:border-red-200 transition-colors">
      <span className="flex-1 leading-snug">{label}</span>
      {isAuto && (
        <span className="text-[9px] text-stone-400 bg-stone-200 px-1 rounded shrink-0">auto</span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-stone-400 hover:bg-red-100 hover:text-red-500 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  )
}

// ── Error Banner ──────────────────────────────────────────────────────────────
export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
      <span className="shrink-0 mt-0.5">⚠</span>
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="shrink-0 text-red-400 hover:text-red-600">×</button>
    </div>
  )
}

// ── Section Divider ───────────────────────────────────────────────────────────
export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-stone-200" />
      <span className="text-[9px] font-medium tracking-widest uppercase text-stone-400">{label}</span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  )
}

// ── Tag ───────────────────────────────────────────────────────────────────────
type TagColor = 'red' | 'amber' | 'teal' | 'stone'

const tagColors: Record<TagColor, string> = {
  red: 'bg-red-50 text-red-700',
  amber: 'bg-amber-50 text-amber-700',
  teal: 'bg-teal-50 text-teal-700',
  stone: 'bg-stone-100 text-stone-600',
}

export function Tag({ label, color = 'stone' }: { label: string; color?: TagColor }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${tagColors[color]}`}>
      {label}
    </span>
  )
}
