// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Desenhos dos três passos de "como vender": o cartão do CAF, a cesta de
// produtos e o celular com a proposta enviada. Decorativos (aria-hidden).

interface IlustracaoPassoProps {
  tipo: 'caf' | 'cesta' | 'envio'
}

export function IlustracaoPasso({ tipo }: IlustracaoPassoProps) {
  return (
    <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-salvia">
      <svg aria-hidden="true" viewBox="0 0 64 64" className="h-12 w-12">
        {tipo === 'caf' && (
          <>
            <rect x="6" y="14" width="52" height="36" rx="6" fill="#fff" stroke="#14432F" strokeWidth="3" />
            <circle cx="22" cy="29" r="6" fill="#F5C84C" stroke="#14432F" strokeWidth="3" />
            <path
              d="M12 43c2-5 6-7 10-7s8 2 10 7M38 26h14M38 34h14M38 42h8"
              stroke="#14432F"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
        {tipo === 'cesta' && (
          <>
            <path d="M10 28h44l-5 26H15z" fill="#fff" stroke="#14432F" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="24" cy="22" r="9" fill="#D8442F" stroke="#14432F" strokeWidth="3" />
            <circle cx="41" cy="20" r="8" fill="#5FA963" stroke="#14432F" strokeWidth="3" />
            <path d="M20 38v8M32 38v8M44 38v8" stroke="#14432F" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        {tipo === 'envio' && (
          <>
            <rect x="18" y="6" width="28" height="52" rx="6" fill="#fff" stroke="#14432F" strokeWidth="3" />
            <circle cx="32" cy="30" r="9" fill="#F5C84C" stroke="#14432F" strokeWidth="3" />
            <path
              d="M27.5 30.5l3 3 5.5-6"
              stroke="#14432F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M28 50h8" stroke="#14432F" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  )
}
