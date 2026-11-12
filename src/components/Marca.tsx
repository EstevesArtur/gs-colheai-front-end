// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Nome do produto. O "Aí" sai destacado e sublinhado porque faz alusão a AI
// (inteligência artificial), o diferencial do ColheAí.

interface MarcaProps {
  className?: string
}

export function Marca({ className = '' }: MarcaProps) {
  return (
    <span className={`font-display font-extrabold tracking-[-0.025em] text-white ${className}`}>
      Colhe<span className="marca-ai text-milho-vivo">Aí</span>
    </span>
  )
}
