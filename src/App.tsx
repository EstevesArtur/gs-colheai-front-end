// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Mapa de rotas da aplicação. Todas ficam dentro do MainLayout (rota mãe).
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthProvider'
import { MainLayout } from '@/layouts/MainLayout'
import { ChamadaPage } from '@/pages/ChamadaPage'
import { ChamadasPage } from '@/pages/ChamadasPage'
import { ContatoPage } from '@/pages/ContatoPage'
import { EntrarPage } from '@/pages/EntrarPage'
import { FaqPage } from '@/pages/FaqPage'
import { HomePage } from '@/pages/HomePage'
import { IntegrantesPage } from '@/pages/IntegrantesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SobrePage } from '@/pages/SobrePage'

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
            <Route path="entrar" element={<EntrarPage />} />

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
