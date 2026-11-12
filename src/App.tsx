// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Mapa de rotas da aplicação. Todas ficam dentro do MainLayout (rota mãe).
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota mãe: sem path, só desenha a moldura */}
        <Route element={<MainLayout />}>
          {/* As páginas entram aqui nas próximas features */}

          {/* Coringa: qualquer URL que não bateu com as rotas acima */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
