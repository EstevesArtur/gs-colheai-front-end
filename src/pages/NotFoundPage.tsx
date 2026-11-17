// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página 404: qualquer endereço que não bateu com nenhuma rota.
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-salvia-media">404</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold">Página não encontrada</h1>
      <p className="mx-auto mt-2 max-w-md text-grafite">
        Este endereço não existe no ColheAí. Confira o link ou volte para o início.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          Voltar ao início
        </Link>
        <Link to="/chamadas" className="btn-secondary">
          Ver chamadas
        </Link>
      </div>
    </section>
  )
}
