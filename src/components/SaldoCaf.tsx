// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Cartão do saldo: quanto o agricultor ainda pode vender para a prefeitura
// neste ano, dentro do limite do PNAE. A barra tem três partes: o que já foi
// vendido, a proposta que está sendo montada e o que sobra.
import type { Agricultor } from '@/types/agricultor'
import { formatarMoeda } from '@/utils/format'

interface SaldoCafProps {
  agricultor: Agricultor
  nomeDaPrefeitura: string
  ano: number
  teto: number
  // Soma das propostas enviadas e contratadas nesta prefeitura
  comprometido: number
  // Valor da proposta que está sendo digitada agora (0 se nenhuma)
  estaProposta?: number
}

export function SaldoCaf({
  agricultor,
  nomeDaPrefeitura,
  ano,
  teto,
  comprometido,
  estaProposta = 0,
}: SaldoCafProps) {
  const livre = Math.max(teto - comprometido, 0)
  const passou = estaProposta > livre
  const sobra = passou ? 0 : livre - estaProposta

  // Larguras em % da barra. A parte da proposta nunca passa do espaço livre.
  const larguraComprometido = Math.min((comprometido / teto) * 100, 100)
  const larguraProposta = (Math.min(estaProposta, livre) / teto) * 100

  return (
    <aside aria-labelledby="titulo-saldo" className="card p-5 sm:p-6">
      <p className="flex items-center gap-3 border-b border-concreto pb-4">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mata font-display text-lg font-bold text-white"
        >
          {agricultor.nome.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-tight">{agricultor.nome}</span>
          <span className="text-sm text-grafite">CAF {agricultor.caf}</span>
        </span>
      </p>

      <h2 id="titulo-saldo" className="mt-4 text-grafite">
        Você ainda pode vender para a {nomeDaPrefeitura} em {ano}
      </h2>
      {/* aria-live: o leitor de tela anuncia o saldo quando a quantidade muda */}
      <p
        aria-live="polite"
        className={`font-display text-[2.4rem] font-extrabold leading-tight tracking-tight ${
          passou ? 'text-terra' : ''
        }`}
      >
        {formatarMoeda(sobra)}
      </p>

      <div
        role="img"
        aria-label={`Limite de ${formatarMoeda(teto)} por ano: ${formatarMoeda(comprometido)} já vendidos e ${formatarMoeda(estaProposta)} nesta proposta`}
        className="mt-3 flex h-3 overflow-hidden rounded-full bg-concreto"
      >
        <div className="bg-mata" style={{ width: `${larguraComprometido}%` }} />
        <div
          className={passou ? 'bg-terra' : 'bg-milho-vivo'}
          style={{ width: `${larguraProposta}%` }}
        />
      </div>

      <ul className="mt-4 space-y-2 text-[0.95rem]">
        <li className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-mata" />
            Já vendido
          </span>
          <strong>{formatarMoeda(comprometido)}</strong>
        </li>
        <li className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-sm ${passou ? 'bg-terra' : 'bg-milho-vivo'}`}
            />
            Esta proposta
          </span>
          <strong>{formatarMoeda(estaProposta)}</strong>
        </li>
        <li className="flex items-center justify-between gap-3 border-t border-concreto pt-2 text-grafite">
          <span>Limite por ano (regra do PNAE)</span>
          <strong className="whitespace-nowrap text-tinta">{formatarMoeda(teto)}</strong>
        </li>
      </ul>
    </aside>
  )
}
