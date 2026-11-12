// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Caixa de aviso reaproveitada em todas as telas: erro de requisição,
// lista vazia e confirmação de sucesso.
import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Inbox } from 'lucide-react'

type TipoDeMensagem = 'erro' | 'vazio' | 'sucesso'

interface MensagemProps {
  tipo: TipoDeMensagem
  titulo: string
  // Texto que diz o que a pessoa pode fazer agora
  children?: ReactNode
}

const ESTILOS: Record<TipoDeMensagem, string> = {
  erro: 'border-terra/30 bg-terra-clara',
  vazio: 'border-concreto bg-nevoa',
  sucesso: 'border-horta bg-salvia/50',
}

const ICONES = {
  erro: CircleAlert,
  vazio: Inbox,
  sucesso: CircleCheck,
}

export function Mensagem({ tipo, titulo, children }: MensagemProps) {
  const Icone = ICONES[tipo]

  return (
    <div
      // role="alert" faz o leitor de tela anunciar o erro na hora; os outros esperam a vez
      role={tipo === 'erro' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-xl border p-4 text-tinta ${ESTILOS[tipo]}`}
    >
      <Icone
        size={22}
        aria-hidden="true"
        className={`mt-0.5 shrink-0 ${tipo === 'erro' ? 'text-terra' : 'text-horta'}`}
      />
      <div>
        <p className="font-bold">{titulo}</p>
        {children && <div className="mt-1 text-[0.95rem]">{children}</div>}
      </div>
    </div>
  )
}
