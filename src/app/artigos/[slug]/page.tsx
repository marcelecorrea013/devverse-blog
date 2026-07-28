import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArtigoBySlug, getArtigos } from '@/lib/artigos';

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. SSG: Gerar os caminhos estáticos durante o build
export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

// 2. SEO Dinâmico por artigo
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    return {
      title: 'Artigo não encontrado | DevVerse',
    };
  }

  return {
    title: `${artigo.titulo} | DevVerse`,
    description: artigo.descricao,
    openGraph: {
      title: artigo.titulo,
      description: artigo.descricao,
      type: 'article',
      publishedTime: artigo.data,
      authors: [artigo.autor],
    },
  };
}

// 3. Server Component da página do artigo
export default async function PageArtigo({ params }: Props) {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    notFound();
  }

  return (
    <article style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        ← Voltar para a lista
      </Link>
      
      <h1 style={{ fontSize: '2.2rem', margin: '1rem 0 0.5rem 0' }}>{artigo.titulo}</h1>
      
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Escrito por <strong>{artigo.autor}</strong> em {new Date(artigo.data).toLocaleDateString('pt-BR')}
      </p>

      <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#e2e8f0' }}>
        {artigo.conteudo}
      </div>
    </article>
  );
}