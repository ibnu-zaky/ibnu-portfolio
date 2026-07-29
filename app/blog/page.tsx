
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/data/posts';

export default function BlogList() {
  return (
    <main className="section" style={{ paddingTop: '120px' }}>
      <Reveal className="sec-lbl" as="p">Tulisan Saya</Reveal>
      <Reveal delay={1} as="h1" className="sec-ttl">Blog &amp;<br />Artikel</Reveal>
      <div className="blog-list" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i + 1 > 3 ? 3 : i + 1} className="blog-card" as="div" style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>{post.date}</span>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              <Link href={`/blog/${post.slug}`} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{post.title}</Link>
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: '1.6' }}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>Baca selengkapnya →</Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
