// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Desenho do produto na plaquinha. Desenho literal ajuda quem lê pouco:
// a pessoa reconhece o tomate antes de ler "Tomate".
// São SVGs leves (sem foto), porque muita gente acessa com pacote de dados curto.
import type { Produto } from '@/types/chamada'

interface IconeProdutoProps {
  produto: Produto
  className?: string
}

type Desenho = 'tomate' | 'folha' | 'fruta' | 'raiz' | 'grao' | 'ovo'

// O tomate tem desenho próprio; os outros produtos usam o desenho da categoria.
function escolherDesenho(produto: Produto): Desenho {
  if (produto.nome.toLowerCase().includes('tomate')) return 'tomate'
  switch (produto.categoria) {
    case 'HORTALICA':
      return 'folha'
    case 'FRUTA':
      return 'fruta'
    case 'RAIZ_TUBERCULO':
      return 'raiz'
    case 'GRAO':
      return 'grao'
    case 'ORIGEM_ANIMAL':
      return 'ovo'
  }
}

export function IconeProduto({ produto, className = 'h-10 w-10' }: IconeProdutoProps) {
  const desenho = escolherDesenho(produto)

  return (
    // aria-hidden: o nome do produto já está escrito ao lado
    <svg aria-hidden="true" viewBox="0 0 48 48" className={`shrink-0 ${className}`}>
      {desenho === 'tomate' && (
        <>
          <circle cx="24" cy="27" r="16" fill="#D8442F" />
          <path d="M24 13l3 5 6-2-4 5-5-2-5 2-4-5 6 2z" fill="#2F7A57" />
          <path d="M24 6v8" stroke="#2F7A57" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {desenho === 'folha' && (
        <>
          <path
            d="M24 44C10 44 4 34 6 22c4 2 6 1 7-3 3 3 6 2 7-3 2 3 6 3 8 0 1 5 4 6 7 3 1 4 3 5 7 3 2 12-4 22-18 22z"
            fill="#5FA963"
          />
          <path
            d="M24 42V24M24 34l-7-7M24 31l7-6"
            stroke="#14432F"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
      {desenho === 'fruta' && (
        <>
          <path
            d="M24 14c-5-4-15-2-15 10 0 10 6 19 12 19 1.5 0 2-.8 3-.8s1.5.8 3 .8c6 0 12-9 12-19 0-12-10-14-15-10z"
            fill="#E8973A"
          />
          <path d="M24 14c0-4 2-7 5-9" stroke="#14432F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M26 9c3-2 7-1 8 1-3 2-6 2-8-1z" fill="#5FA963" />
        </>
      )}
      {desenho === 'raiz' && (
        <>
          <path
            d="M5 30c-2-8 6-16 17-17 12-1 22 3 22 10 0 9-10 15-22 15-9 0-15-2-17-8z"
            fill="#B5653A"
          />
          <path
            d="M15 24l3 1M26 20l3 1M30 29l3-1M19 31l2 1"
            stroke="#7A3F22"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
      {desenho === 'grao' && (
        <>
          <path d="M13 10c9-2 17 5 15 15-1 7-7 11-12 9-6-2-9-9-8-15 .5-4 2-8 5-9z" fill="#B5653A" />
          <path d="M30 22c7-1 12 4 11 11-1 6-6 9-10 7-5-2-7-7-6-12 .5-3 2-5.5 5-6z" fill="#8A4B2A" />
          <path d="M15 17c3 1 5 4 5 8M32 28c2 1 3 3 3 6" stroke="#F4E7C2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {desenho === 'ovo' && (
        <>
          <path
            d="M24 5c8 0 14 13 14 23 0 9-6 15-14 15S10 37 10 28C10 18 16 5 24 5z"
            fill="#FFF7E6"
            stroke="#24302B"
            strokeWidth="2.5"
          />
          <path d="M17 26c0-5 2-9 4-11" stroke="#E4D3AC" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  )
}
