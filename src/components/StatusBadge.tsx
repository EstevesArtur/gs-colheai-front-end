// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Etiqueta de situação, usada para chamadas e para propostas.
// A API manda o código (ABERTA, ENVIADA…); aqui ele vira texto e cor.
// A cor nunca vai sozinha: o texto sempre diz a situação.

interface StatusBadgeProps {
  status: string
}

const SITUACOES: Record<string, { rotulo: string; estilo: string }> = {
  // Chamadas
  ABERTA: { rotulo: 'Aberta', estilo: 'bg-salvia text-mata' },
  HOMOLOGADA: { rotulo: 'Encerrada', estilo: 'bg-concreto text-tinta' },
  FRACASSADA: { rotulo: 'Fracassada', estilo: 'bg-terra-clara text-terra' },
  // Propostas
  ENVIADA: { rotulo: 'Enviada', estilo: 'bg-milho text-tinta' },
  CONTRATADA: { rotulo: 'Contratada', estilo: 'bg-salvia text-mata' },
  RECUSADA: { rotulo: 'Recusada', estilo: 'bg-terra-clara text-terra' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  // Código que não conhecemos aparece como veio, em cinza
  const situacao = SITUACOES[status] ?? { rotulo: status, estilo: 'bg-concreto text-tinta' }

  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-sm font-bold ${situacao.estilo}`}>
      {situacao.rotulo}
    </span>
  )
}
