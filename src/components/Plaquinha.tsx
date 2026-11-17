// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Plaquinha de preço, igual às da feira: produto, preço grande e unidade.
// O agricultor já lê preço assim, então não precisa aprender nada novo.
//
// Tem três usos, conforme as props:
//   - com "para": é um link (Home, leva para a chamada);
//   - com "onSelecionar": é um botão que marca o produto (tela da chamada);
//   - sem nenhum dos dois: só mostra o preço (chamada encerrada).
import { Link } from 'react-router-dom'
import { IconeProduto } from '@/components/IconeProduto'
import type { ItemChamada } from '@/types/chamada'
import { formatarPreco, unidadeNoPreco } from '@/utils/format'

interface PlaquinhaProps {
  item: ItemChamada
  // Posição na lista: serve só para alternar a inclinação, como plaquinhas penduradas
  indice: number
  para?: string
  onSelecionar?: () => void
  selecionada?: boolean
}

// Inclinações leves que se repetem a cada quatro plaquinhas
const INCLINACOES = ['-rotate-1', 'rotate-1', 'rotate-1', '-rotate-1']

export function Plaquinha({ item, indice, para, onSelecionar, selecionada = false }: PlaquinhaProps) {
  const conteudo = (
    <>
      {/* Furinho por onde a plaquinha fica pendurada */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-mata/70"
      />

      <span className="flex items-center justify-between gap-2">
        <span className="font-display text-lg font-extrabold leading-tight">{item.produto.nome}</span>
        <IconeProduto produto={item.produto} className="h-9 w-9 sm:h-10 sm:w-10" />
      </span>

      <span className="mt-2 block font-display font-extrabold leading-none tracking-tight">
        <span className="text-base font-bold">R$</span>{' '}
        <span className="text-[2.3rem] sm:text-[2.6rem]">{formatarPreco(item.precoUnitario)}</span>
      </span>

      <span className="mt-1 block text-[0.95rem] font-semibold">
        {unidadeNoPreco(item.produto.unidadeMedida)}
      </span>
    </>
  )

  if (para) {
    return (
      <Link to={para} className={`plaquinha hover:brightness-95 ${INCLINACOES[indice % 4]}`}>
        {conteudo}
      </Link>
    )
  }

  if (onSelecionar) {
    return (
      <button
        type="button"
        onClick={onSelecionar}
        // aria-pressed diz ao leitor de tela qual produto está marcado
        aria-pressed={selecionada}
        // A selecionada fica reta e ganha um contorno branco
        className={`plaquinha w-full hover:brightness-95 ${
          selecionada ? 'ring-4 ring-white' : INCLINACOES[indice % 4]
        }`}
      >
        {conteudo}
      </button>
    )
  }

  return <div className={`plaquinha ${INCLINACOES[indice % 4]}`}>{conteudo}</div>
}
