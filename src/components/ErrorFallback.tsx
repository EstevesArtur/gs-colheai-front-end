// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// O que aparece quando uma página quebra durante a renderização (Aula 9).
// O Error Boundary do MainLayout troca só o miolo por este aviso: o cabeçalho
// e o menu continuam funcionando.
import type { FallbackProps } from 'react-error-boundary'

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <section role="alert" className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-extrabold">Algo deu errado nesta página</h1>
      <p className="mx-auto mt-2 max-w-md text-grafite">
        Tente de novo ou volte para o início.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={resetErrorBoundary} className="btn-primary">
          Tentar de novo
        </button>
        {/* <a> de propósito: recarrega o app inteiro e limpa o estado quebrado */}
        <a href="/" className="btn-secondary">
          Voltar ao início
        </a>
      </div>
    </section>
  )
}
