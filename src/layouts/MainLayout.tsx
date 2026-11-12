// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Moldura de todas as páginas: cabeçalho, conteúdo da rota atual e rodapé.
import { Outlet } from 'react-router-dom'
import { BarraInferior } from '@/components/BarraInferior'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* Cada página decide a própria largura: algumas têm faixas de cor de ponta a ponta */}
      <main id="conteudo" className="flex-1">
        {/* Aqui entra a página da rota atual */}
        <Outlet />
      </main>

      <Footer />
      <BarraInferior />
    </div>
  )
}
