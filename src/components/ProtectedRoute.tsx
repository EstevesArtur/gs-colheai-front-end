// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Protege páginas que só fazem sentido para quem se identificou (Aula 10).
// Sem agricultor, manda para /entrar e guarda de onde a pessoa veio, para
// voltar para lá depois da identificação.
// Não há estado de "carregando" aqui porque a sessão é lida do localStorage
// na hora (de forma síncrona) pelo AuthProvider.
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { agricultor } = useAuth()
  const location = useLocation()

  if (!agricultor) {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  }

  return children
}
