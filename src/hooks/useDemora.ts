// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Avisa quando um carregamento está demorando mais que o normal.
// A API fica no plano gratuito do Render, que "dorme" sem uso: a primeira
// requisição pode levar até 1 minuto. Depois de alguns segundos de espera,
// a tela usa este hook para explicar a demora em vez de parecer travada.
import { useEffect, useState } from 'react'

export function useDemora(carregando: boolean, esperaEmMs = 5000): boolean {
  const [demorou, setDemorou] = useState(false)

  useEffect(() => {
    if (!carregando) return

    const timer = setTimeout(() => setDemorou(true), esperaEmMs)

    // Cleanup: roda quando o carregamento termina ou a tela fecha.
    // Cancela o timer e apaga o aviso para a próxima vez.
    return () => {
      clearTimeout(timer)
      setDemorou(false)
    }
  }, [carregando, esperaEmMs])

  return demorou
}
