// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Mensagem de erro que aparece embaixo de um campo de formulário.
// Recebe o id para o campo apontar para ela com aria-describedby.

interface CampoErroProps {
  id: string
  mensagem?: string
}

export function CampoErro({ id, mensagem }: CampoErroProps) {
  // Sem erro, não desenha nada
  if (!mensagem) return null

  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.95rem] font-semibold text-terra">
      {mensagem}
    </p>
  )
}
