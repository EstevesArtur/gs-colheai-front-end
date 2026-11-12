// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Barra de progresso da meta de 45% de uma prefeitura.
// A barra enche até a META (45% do repasse), não até 100% do repasse:
// quem chegou em 45% já cumpriu a lei e vê a barra cheia.
import type { MetaEntidade } from '@/types/meta'
import { formatarMoedaCurta, formatarPercentual } from '@/utils/format'

interface BarraMetaProps {
  meta: MetaEntidade
}

const META_EM_PORCENTO = 45

export function BarraMeta({ meta }: BarraMetaProps) {
  // Largura da parte verde, de 0 a 100% da barra
  const preenchido = Math.min((meta.percentualContratado / META_EM_PORCENTO) * 100, 100)

  return (
    <div className="py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="flex flex-wrap items-center gap-2 font-semibold">
          {meta.entidade.municipio}
          {meta.metaAtingida && (
            <span className="rounded-md bg-salvia px-2 py-0.5 text-sm font-bold text-mata">
              Meta atingida
            </span>
          )}
        </h3>
        <p className="font-display text-2xl font-extrabold">
          {formatarPercentual(meta.percentualContratado)}{' '}
          <span className="text-base font-semibold text-grafite">de {META_EM_PORCENTO}%</span>
        </p>
      </div>

      <div
        role="progressbar"
        aria-label={`${meta.entidade.municipio}: ${formatarPercentual(meta.percentualContratado)} do repasse comprado da agricultura familiar; a meta é ${META_EM_PORCENTO}%`}
        aria-valuemin={0}
        aria-valuemax={META_EM_PORCENTO}
        aria-valuenow={Math.min(meta.percentualContratado, META_EM_PORCENTO)}
        className="mt-3 h-2.5 rounded-full bg-concreto"
      >
        {/* min-w-1.5: mesmo um valor muito pequeno aparece como um filete */}
        <div className="h-2.5 min-w-1.5 rounded-full bg-horta" style={{ width: `${preenchido}%` }} />
      </div>

      <p className="mt-2 text-sm text-grafite">
        {meta.metaAtingida
          ? `${formatarMoedaCurta(meta.contratado)} contratados de agricultores familiares.`
          : `Faltam ${formatarMoedaCurta(meta.falta)} para a meta.`}
      </p>
    </div>
  )
}
