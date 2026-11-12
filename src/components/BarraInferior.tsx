// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Barra fixa embaixo da tela (celular e tablet). Tem os três destinos que o
// agricultor mais usa e o botão "Menu", que abre as outras páginas.
// É o menu mobile do projeto.
import { useState } from 'react'
import { Home, List, Menu, Tag, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { LINKS_DO_MENU } from '@/utils/menu'

// Atalhos fixos da barra; o resto dos links aparece dentro do menu.
const ATALHOS = [
  { para: '/', rotulo: 'Início', Icone: Home },
  { para: '/chamadas', rotulo: 'Chamadas', Icone: Tag },
  { para: '/minhas-propostas', rotulo: 'Propostas', Icone: List },
]

const atalhoClass = ({ isActive }: { isActive: boolean }) =>
  `relative flex min-h-16 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold ${
    isActive ? 'text-mata' : 'text-grafite'
  }`

export function BarraInferior() {
  // Controla se a lista de páginas está aberta
  const [menuAberto, setMenuAberto] = useState(false)

  const caminhosDosAtalhos = ATALHOS.map((atalho) => atalho.para)
  const outrosLinks = LINKS_DO_MENU.filter((link) => !caminhosDosAtalhos.includes(link.para))

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <div className="lg:hidden">
      {menuAberto && (
        <nav
          id="menu-mobile"
          aria-label="Todas as páginas"
          className="fixed inset-x-0 bottom-16 z-30 border-t border-concreto bg-white px-5 pb-3 pt-5"
        >
          <p className="text-sm font-semibold text-grafite">Todas as páginas</p>
          <ul className="mt-1 font-semibold">
            {outrosLinks.map((link) => (
              <li key={link.para}>
                <NavLink
                  to={link.para}
                  onClick={fecharMenu}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center border-b border-concreto ${isActive ? 'text-horta' : ''}`
                  }
                >
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/entrar" onClick={fecharMenu} className="flex min-h-12 items-center text-horta">
                Entrar com meu CAF
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <nav
        aria-label="Atalhos"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-concreto bg-white"
      >
        {ATALHOS.map(({ para, rotulo, Icone }) => (
          <NavLink key={para} to={para} end={para === '/'} onClick={fecharMenu} className={atalhoClass}>
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-mata" />}
                <Icone size={24} aria-hidden="true" />
                {rotulo}
              </>
            )}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold ${
            menuAberto ? 'text-mata' : 'text-grafite'
          }`}
        >
          {menuAberto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>
      </nav>
    </div>
  )
}
