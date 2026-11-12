// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Mapa de rotas da aplicação. Todas ficam dentro do MainLayout (rota mãe).
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SobrePage } from '@/pages/SobrePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota mãe: sem path, só desenha a moldura */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="sobre" element={<SobrePage />} />

          {/* Coringa: qualquer URL que não bateu com as rotas acima */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
