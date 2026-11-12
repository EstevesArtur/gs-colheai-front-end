// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Cabeçalho fixo no topo. No desktop mostra o menu completo; no celular e no
// tablet o menu fica na BarraInferior, mais perto do dedo.
import { Link, NavLink } from 'react-router-dom'
import { Marca } from '@/components/Marca'
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

        <Link
          to="/entrar"
          className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-4 text-[0.95rem] font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Entrar com CAF
        </Link>
      </div>
    </header>
  )
}
