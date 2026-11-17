// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Cartão de uma chamada pública na lista. O cartão inteiro é o link.
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/StatusBadge'
import type { ChamadaPublica } from '@/types/chamada'
import { formatarData, nomeCurtoDaEntidade, textoDoPrazo } from '@/utils/format'

interface ChamadaCardProps {
  chamada: ChamadaPublica
}

export function ChamadaCard({ chamada }: ChamadaCardProps) {
  const aberta = chamada.status === 'ABERTA'

  return (
    <Link
      to={`/chamadas/${chamada.id}`}
      className={`card flex items-center gap-4 p-5 transition hover:border-grafite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta ${
        aberta ? 'border-l-4 border-l-milho-vivo' : ''
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <StatusBadge status={chamada.status} />
          <span className="text-sm text-grafite">Chamada {chamada.numeroEdital}</span>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold leading-tight">
          {nomeCurtoDaEntidade(chamada.entidade.nome)}
        </h2>
        <p className="mt-1 text-grafite">{chamada.objeto}</p>
        <p className="mt-2 text-sm">
          {aberta ? (
            <>
              Recebe propostas até <strong>{formatarData(chamada.dataEncerramento)}</strong> (
              {textoDoPrazo(chamada.dataEncerramento)})
            </>
          ) : (
            <span className="text-grafite">
              Encerrou em {formatarData(chamada.dataEncerramento)}
            </span>
          )}
        </p>
      </div>
      <ChevronRight size={24} aria-hidden="true" className="shrink-0 text-grafite" />
    </Link>
  )
}
