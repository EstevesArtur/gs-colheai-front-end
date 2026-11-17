// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Aviso amigável para quando a API está "acordando" no Render.
// Só aparece se o carregamento passar de 5 segundos.
import { Clock } from 'lucide-react'
import { useDemora } from '@/hooks/useDemora'

interface AvisoServidorProps {
  carregando: boolean
  // "escuro" para usar em cima de fundo verde
  fundo?: 'claro' | 'escuro'
}

export function AvisoServidor({ carregando, fundo = 'claro' }: AvisoServidorProps) {
  const demorou = useDemora(carregando)

  if (!demorou) return null

  return (
    <p
      role="status"
      className={`flex items-start gap-2 rounded-xl p-3 text-[0.95rem] ${
        fundo === 'escuro' ? 'bg-mata text-white' : 'bg-milho text-tinta'
      }`}
    >
      <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>
        <strong>Acordando o servidor.</strong> A primeira consulta pode levar até 1 minuto. Não
        precisa recarregar a página.
      </span>
    </p>
  )
}
