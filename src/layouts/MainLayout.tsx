// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Moldura de todas as páginas: cabeçalho, conteúdo da rota atual e rodapé.
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router-dom'
import { BarraInferior } from '@/components/BarraInferior'
import { ErrorFallback } from '@/components/ErrorFallback'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Skeleton } from '@/components/Skeleton'

export function MainLayout() {
  const location = useLocation()

  // Ao trocar de página, volta para o topo (o navegador não faz isso numa SPA)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
        {/* Error Boundary: se uma página quebrar, só o miolo vira o aviso de erro.
            resetKeys: ao navegar para outra página, o erro é esquecido. */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(erro) => console.error('Erro capturado pelo Error Boundary:', erro)}
          resetKeys={[location.pathname]}
        >
          {/* Suspense: enquanto o código de uma página lazy é baixado */}
          <Suspense
            fallback={
              <div role="status" aria-label="Carregando a página" className="mx-auto max-w-6xl px-4 py-10">
                <Skeleton className="h-12 w-2/3" />
                <Skeleton className="mt-4 h-5 w-1/2" />
                <Skeleton className="mt-8 h-64 rounded-2xl" />
              </div>
            }
          >
            {/* Aqui entra a página da rota atual */}
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <BarraInferior />
    </div>
  )
}
