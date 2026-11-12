// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Rodapé. O pb-20 no celular deixa espaço para a BarraInferior não cobrir o texto.
import { Link } from 'react-router-dom'
import { Marca } from '@/components/Marca'

const LINKS_DO_RODAPE = [
  { para: '/sobre', rotulo: 'Sobre' },
  { para: '/faq', rotulo: 'FAQ' },
  { para: '/integrantes', rotulo: 'Integrantes' },
  { para: '/contato', rotulo: 'Contato' },
]

export function Footer() {
  return (
    <footer className="bg-mata pb-20 text-white lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-[1fr_auto]">
        <div className="max-w-md space-y-2 text-[0.95rem]">
          <Marca className="text-2xl" />
          <p>Feito pela Since Young na Global Solution 2026/2 da FIAP, turma 1TDSPV-2026.</p>
          <p className="text-white/70">
            Agricultores, repasses e propostas desta demonstração são simulados. Nomes e códigos
            IBGE das prefeituras são reais.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 self-end text-[0.95rem] font-semibold">
          {LINKS_DO_RODAPE.map((link) => (
            <li key={link.para}>
              <Link to={link.para} className="hover:underline">
                {link.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
