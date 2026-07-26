import artigosData from '@/data/artigos.json';

export interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  conteudo: string;
}

export async function getArtigos(): Promise<Artigo[]> {
  return artigosData;
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  return artigosData.find((artigo) => artigo.slug === slug);
}
