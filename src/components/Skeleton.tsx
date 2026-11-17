// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Rascunho cinza do conteúdo que está chegando (Aula 9). Quem usa passa o
// tamanho pelo className, para o skeleton ocupar o mesmo espaço do conteúdo
// real e a página não "pular" quando os dados chegam.

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-concreto ${className}`} />
}
