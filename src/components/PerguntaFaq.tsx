// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Uma pergunta do FAQ que abre e fecha ao toque (acordeão).
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface PerguntaFaqProps {
  // Número usado para ligar o botão à resposta (aria-controls)
  id: number
  pergunta: string
  resposta: string
}

export function PerguntaFaq({ id, pergunta, resposta }: PerguntaFaqProps) {
  const [aberta, setAberta] = useState(false)
  const idDaResposta = `resposta-${id}`

  return (
    <div className="border-b border-concreto">
      <h2>
        <button
          type="button"
          onClick={() => setAberta(!aberta)}
          // aria-expanded avisa o leitor de tela se a resposta está aberta
          aria-expanded={aberta}
          aria-controls={idDaResposta}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-display text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta"
        >
          {pergunta}
          <ChevronDown
            size={22}
            aria-hidden="true"
            className={`shrink-0 text-horta transition ${aberta ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      {aberta && (
        <p id={idDaResposta} className="pb-5 leading-relaxed text-grafite">
          {resposta}
        </p>
      )}
    </div>
  )
}
