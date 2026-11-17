// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Cabeçalho fixo no topo. No desktop mostra o menu completo; no celular e no
// tablet o menu fica na BarraInferior, mais perto do dedo.
// Não recebe props: lê o agricultor identificado direto do Context (Aula 10).
import { Link, NavLink } from 'react-router-dom'
import { Marca } from '@/components/Marca'
import { useAuth } from '@/hooks/useAuth'
import { LINKS_DO_MENU } from '@/utils/menu'

// Função reaproveitada por todos os NavLinks (Aula 8): o link da página atual
// ganha um sublinhado amarelo.
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap px-3 py-2 text-[0.95rem] font-semibold transition ${
    isActive
      ? 'text-white underline decoration-milho-vivo decoration-2 underline-offset-8'
      : 'text-white/80 hover:text-white'
  }`

export function Header() {
  const { agricultor, sair } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-mata">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" aria-label="ColheAí, página inicial">
          <Marca className="text-2xl" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center lg:flex">
          {LINKS_DO_MENU.map((link) => (
            <NavLink key={link.para} to={link.para} end={link.para === '/'} className={linkClass}>
              {link.rotulo}
            </NavLink>
          ))}
        </nav>

        {agricultor ? (
          <div className="flex items-center gap-2">
            <Link
              to="/minhas-propostas"
              className="flex min-h-11 items-center gap-2 rounded-xl border border-white/25 py-1 pl-1.5 pr-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 font-display font-bold"
              >
                {agricultor.nome.charAt(0)}
              </span>
              {/* Só o primeiro nome, para caber no celular */}
              {agricultor.nome.split(' ')[0]}
            </Link>
            <button
              type="button"
              onClick={sair}
              className="hidden min-h-11 rounded-xl px-3 text-[0.95rem] font-semibold text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/entrar"
            className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-4 text-[0.95rem] font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Entrar com CAF
          </Link>
        )}
      </div>
    </header>
  )
}
