// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página "Sobre": o problema, quem o ColheAí atende e a ligação com os ODS.
// Todo número tem a fonte ao lado, com link.
import { Link } from 'react-router-dom'

// ODS (Objetivos de Desenvolvimento Sustentável da ONU) ligados à solução
const ODS = [
  {
    numero: 2,
    nome: 'Fome zero e agricultura sustentável',
    texto:
      'A merenda é comida de verdade no prato do estudante, e o PNAE é um mercado garantido para o pequeno produtor.',
  },
  {
    numero: 10,
    nome: 'Redução das desigualdades',
    texto:
      'Renda para famílias agricultoras, com a prioridade que a lei já dá a assentados, indígenas, quilombolas e grupos de mulheres.',
  },
  {
    numero: 11,
    nome: 'Cidades e comunidades sustentáveis',
    texto: 'Liga a zona rural de São Paulo às escolas da própria cidade.',
  },
  {
    numero: 4,
    nome: 'Educação de qualidade',
    texto: 'De forma indireta: aluno bem alimentado tem mais condição de aprender.',
  },
]

const FONTES = [
  {
    rotulo: 'Lei 15.226/2025 (mínimo de 45%)',
    url: 'https://www.gov.br/fnde/pt-br/assuntos/noticias/lei-amplia-compra-da-agricultura-familiar-para-o-pnae',
  },
  {
    rotulo: 'TCM-SP, auditoria da agricultura familiar no PNAE',
    url: 'https://portal.tcm.sp.gov.br/Pagina/28513',
  },
  {
    rotulo: 'Prefeitura de São Paulo, Sampa+Rural',
    url: 'https://prefeitura.sp.gov.br/desenvolvimento/w/coordenadoria_de_agricultura/153588',
  },
]

export function SobrePage() {
  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="max-w-3xl font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            A lei manda comprar do agricultor familiar. Falta o caminho.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            O ColheAí aproxima quem planta de quem compra a merenda: o agricultor encontra a chamada
            pública e envia a proposta, e a prefeitura acompanha a meta.
          </p>
        </div>
      </section>

      <section aria-labelledby="titulo-problema" className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <h2 id="titulo-problema" className="font-display text-3xl font-extrabold tracking-[-0.015em]">
          O problema
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="border-t-4 border-milho-vivo pt-4">
            <p className="font-display text-5xl font-extrabold">45%</p>
            <p className="mt-2 leading-relaxed">
              do dinheiro federal da merenda precisa ir para compras diretas da agricultura familiar
              desde janeiro de 2026. Antes eram 30%.
            </p>
            <p className="mt-2 text-sm text-grafite">Lei 15.226/2025</p>
          </div>
          <div className="border-t-4 border-milho-vivo pt-4">
            <p className="font-display text-5xl font-extrabold">26,8%</p>
            <p className="mt-2 leading-relaxed">
              foi o que a cidade de São Paulo comprou em 2019, abaixo até do mínimo antigo. A
              justificativa foram chamadas públicas fracassadas.
            </p>
            <p className="mt-2 text-sm text-grafite">Auditoria do TCM-SP, publicada em 2021</p>
          </div>
          <div className="border-t-4 border-milho-vivo pt-4">
            <p className="font-display text-5xl font-extrabold">2.600</p>
            <p className="mt-2 leading-relaxed">
              locais de agricultura, ou mais, já estão mapeados dentro da cidade de São Paulo. O
              agricultor existe. O que falta é ele ficar sabendo da chamada e conseguir participar.
            </p>
            <p className="mt-2 text-sm text-grafite">Sampa+Rural, 2025</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-para-quem" className="bg-nevoa">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <h2
            id="titulo-para-quem"
            className="font-display text-3xl font-extrabold tracking-[-0.015em]"
          >
            Para quem é o ColheAí
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="card p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold">Agricultor familiar e cooperativa</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                <li>Vê as chamadas abertas com o preço de cada produto.</li>
                <li>Envia a proposta pelo celular, entrando só com o CAF.</li>
                <li>Sabe quanto ainda pode vender dentro do limite de R$ 40 mil por ano.</li>
              </ul>
              <Link to="/chamadas" className="btn-primary mt-5">
                Ver chamadas
              </Link>
            </article>
            <article className="card p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold">Prefeitura</h3>
              <p className="mt-1 text-sm text-grafite">
                EEx (Entidade Executora): quem recebe o repasse e compra a merenda
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                <li>Acompanha quanto falta para cumprir os 45%.</li>
                <li>Recebe propostas já conferidas contra o limite por CAF.</li>
              </ul>
              <Link to="/painel" className="btn-secondary mt-5">
                Abrir o painel da meta
              </Link>
            </article>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-grafite">
            O Contrata+Brasil, do governo federal, é onde a chamada acontece. O ColheAí é o que faz
            ela dar certo: avisa o agricultor, mostra o preço e faz a conta do limite.
          </p>
        </div>
      </section>

      <section aria-labelledby="titulo-ods" className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <h2 id="titulo-ods" className="font-display text-3xl font-extrabold tracking-[-0.015em]">
          Objetivos de Desenvolvimento Sustentável
        </h2>
        <ul className="mt-6 grid gap-x-8 md:grid-cols-2">
          {ODS.map((ods) => (
            <li key={ods.numero} className="flex gap-4 border-t border-concreto py-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mata font-display text-xl font-extrabold text-white">
                {ods.numero}
              </span>
              <div>
                <h3 className="font-semibold">{ods.nome}</h3>
                <p className="mt-1 leading-relaxed text-grafite">{ods.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-demo" className="bg-nevoa">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <h2 id="titulo-demo" className="font-display text-3xl font-extrabold tracking-[-0.015em]">
            O que é real e o que é demonstração
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed">
            Este site é um projeto acadêmico da Global Solution 2026/2 da FIAP. As regras (45%,
            limite de R$ 40 mil por CAF) e os nomes das prefeituras são reais. Agricultores,
            repasses, chamadas e propostas são dados simulados. A entrada pelo CAF também é
            simulada: não tem senha, e um produto de verdade usaria o login gov.br.
          </p>
          <h3 className="mt-8 font-semibold">Fontes</h3>
          <ul className="mt-2 space-y-2">
            {FONTES.map((fonte) => (
              <li key={fonte.url}>
                {/* Link para outro site: aqui é <a>, não <Link> */}
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-horta underline underline-offset-4"
                >
                  {fonte.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
