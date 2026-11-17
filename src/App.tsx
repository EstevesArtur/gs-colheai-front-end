// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Mapa de rotas da aplicação. Todas ficam dentro do MainLayout (rota mãe).
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthProvider'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'

// Code splitting (Aula 9): a Home vem no pacote principal, porque é a porta de
// entrada. As outras páginas só são baixadas quando a pessoa navega até elas.
// O .then adapta o export nomeado (export function XPage) para o formato que o lazy espera.
const ChamadaPage = lazy(() =>
  import('@/pages/ChamadaPage').then((modulo) => ({ default: modulo.ChamadaPage })),
)
const ChamadasPage = lazy(() =>
  import('@/pages/ChamadasPage').then((modulo) => ({ default: modulo.ChamadasPage })),
)
const ContatoPage = lazy(() =>
  import('@/pages/ContatoPage').then((modulo) => ({ default: modulo.ContatoPage })),
)
const EntrarPage = lazy(() =>
  import('@/pages/EntrarPage').then((modulo) => ({ default: modulo.EntrarPage })),
)
const FaqPage = lazy(() =>
  import('@/pages/FaqPage').then((modulo) => ({ default: modulo.FaqPage })),
)
const IntegrantesPage = lazy(() =>
  import('@/pages/IntegrantesPage').then((modulo) => ({ default: modulo.IntegrantesPage })),
)
const MinhasPropostasPage = lazy(() =>
  import('@/pages/MinhasPropostasPage').then((modulo) => ({ default: modulo.MinhasPropostasPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((modulo) => ({ default: modulo.NotFoundPage })),
)
const PainelPage = lazy(() =>
  import('@/pages/PainelPage').then((modulo) => ({ default: modulo.PainelPage })),
)
const SobrePage = lazy(() =>
  import('@/pages/SobrePage').then((modulo) => ({ default: modulo.SobrePage })),
)

export default function App() {
  return (
    // O AuthProvider envolve as rotas: qualquer página sabe quem é o agricultor
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota mãe: sem path, só desenha a moldura */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />

            {/* Páginas da solução */}
            <Route path="chamadas" element={<ChamadasPage />} />
            {/* Rota com parâmetro: o :id é lido com useParams na página */}
            <Route path="chamadas/:id" element={<ChamadaPage />} />
            <Route path="painel" element={<PainelPage />} />
            <Route path="entrar" element={<EntrarPage />} />
            {/* Rota protegida: sem agricultor identificado, vai para /entrar */}
            <Route
              path="minhas-propostas"
              element={
                <ProtectedRoute>
                  <MinhasPropostasPage />
                </ProtectedRoute>
              }
            />

            {/* Páginas institucionais */}
            <Route path="sobre" element={<SobrePage />} />
            <Route path="integrantes" element={<IntegrantesPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contato" element={<ContatoPage />} />

            {/* Coringa: qualquer URL que não bateu com as rotas acima */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
