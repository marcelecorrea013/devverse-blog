import Link from 'next/link';
import { getArtigos } from '@/lib/artigos';

export const revalidate = 3600; // Revalidação a cada 1 hora (ou force-static)

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Últimos Artigos</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {artigos.map((artigo) => (
          <article 
            key={artigo.slug} 
            style={{ 
              border: '1px solid #334155', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              backgroundColor: '#1e293b' 
            }}
          >
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              <Link href={`/artigos/${artigo.slug}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                {artigo.titulo}
              </Link>
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              Por {artigo.autor} em {new Date(artigo.data).toLocaleDateString('pt-BR')}
            </p>
            <p style={{ color: '#cbd5e1' }}>{artigo.descricao}</p>
          </article>
        ))}
      </div>
    </div>
  );
}