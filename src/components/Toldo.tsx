// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Toldo listrado da barraca de feira. É só decoração (aria-hidden).

interface ToldoProps {
  // "claro" para fundo escuro (hero); "escuro" para fundo branco
  variante?: 'claro' | 'escuro'
}

export function Toldo({ variante = 'claro' }: ToldoProps) {
  const corDaListra = variante === 'claro' ? '#FFFFFF' : '#14432F'
  // Cada variante precisa de um id próprio para o <pattern> não se misturar na página
  const idDoPadrao = `toldo-${variante}`

  return (
    <div aria-hidden="true" className="overflow-hidden rounded-t-2xl">
      <svg className="block h-9 w-full" preserveAspectRatio="none" viewBox="0 0 400 36">
        <defs>
          <pattern id={idDoPadrao} width="50" height="36" patternUnits="userSpaceOnUse">
            <path d="M0 0h25v24a12.5 12.5 0 0 1-25 0z" fill={corDaListra} />
            <path d="M25 0h25v24a12.5 12.5 0 0 1-25 0z" fill="#A9D3B9" />
          </pattern>
        </defs>
        <rect width="400" height="36" fill={`url(#${idDoPadrao})`} />
      </svg>
    </div>
  )
}
