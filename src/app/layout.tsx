import Header from '@/components/Header/Header';
import './globals.css';

export const metadata = {
  title: 'DevVerse | Blog Tecnológico',
  description: 'Artigos sobre Next.js, React, SEO e Engenharia de Software.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}