// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página Integrantes: quem fez o ColheAí.
import { IntegranteCard } from '@/components/IntegranteCard'
import type { Integrante } from '@/types/integrante'

const INTEGRANTES: Integrante[] = [
  {
    nome: 'Artur Bianchini Esteves',
    rm: '569450',
    turma: '1TDSPV-2026',
    papel: 'Representante do grupo',
    foto: '/img/integrantes/artur.jpg',
    github: 'https://github.com/EstevesArtur',
    linkedin: 'https://www.linkedin.com/in/artur-esteves-31bb4130a/',
  },
  {
    nome: 'João Vitor Oliveira Fontenele Martins',
    rm: '570783',
    turma: '1TDSPV-2026',
    papel: 'Desenvolvedor',
    foto: '/img/integrantes/joao.jpg',
    github: 'https://github.com/joaofontenele06',
    linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-fontenele-65b1913a8/',
  },
]

export function IntegrantesPage() {
  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Quem fez o ColheAí
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Somos a Since Young, grupo do 1º ano de Análise e Desenvolvimento de Sistemas da FIAP.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {INTEGRANTES.map((integrante) => (
            <IntegranteCard key={integrante.rm} integrante={integrante} />
          ))}
        </div>
      </section>
    </>
  )
}
