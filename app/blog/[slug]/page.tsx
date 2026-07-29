
import Link from 'next/link';
import { posts } from '@/lib/data/posts';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="section" style={{ paddingTop: '120px', maxWidth: '800px', margin: '0 auto' }}>
      <Reveal>
        <Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
          ← Kembali ke Blog
        </Link>
      </Reveal>
      <Reveal delay={1} as="h1" className="h1" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</Reveal>
      <Reveal delay={2} style={{ display: 'flex', gap: '1rem', color: 'var(--muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.tags.join(', ')}</span>
      </Reveal>
      <Reveal delay={3} className="content" as="div" style={{ lineHeight: '1.8', color: 'var(--fg)', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </Reveal>
    </main>
  );
}
