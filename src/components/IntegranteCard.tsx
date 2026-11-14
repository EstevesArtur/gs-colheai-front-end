// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Cartão de um integrante: foto, nome, RM, turma e links.
import type { Integrante } from '@/types/integrante'

interface IntegranteCardProps {
  integrante: Integrante
}

export function IntegranteCard({ integrante }: IntegranteCardProps) {
  return (
    <article className="card flex flex-col items-center p-6 text-center">
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        width={144}
        height={144}
        loading="lazy"
        className="h-36 w-36 rounded-full object-cover"
      />
      <h2 className="mt-4 font-display text-xl font-bold">{integrante.nome}</h2>
      <p className="mt-1 text-grafite">{integrante.papel}</p>

      <dl className="mt-4 flex gap-6 text-sm">
        <div>
          <dt className="text-grafite">RM</dt>
          <dd className="font-bold">{integrante.rm}</dd>
        </div>
        <div>
          <dt className="text-grafite">Turma</dt>
          <dd className="font-bold">{integrante.turma}</dd>
        </div>
      </dl>

      {/* Links para outros sites: <a> com target="_blank", não <Link> */}
      <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
        <a href={integrante.github} target="_blank" rel="noreferrer" className="btn-secondary flex-1">
          GitHub
        </a>
        <a href={integrante.linkedin} target="_blank" rel="noreferrer" className="btn-secondary flex-1">
          LinkedIn
        </a>
      </div>
    </article>
  )
}
