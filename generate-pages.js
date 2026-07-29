const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'app');
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// 1. Blog List Page
ensureDir(path.join(root, 'blog'));
fs.writeFileSync(path.join(root, 'blog', 'page.tsx'), `
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
              <Link href={\`/blog/\${post.slug}\`} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{post.title}</Link>
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: '1.6' }}>{post.excerpt}</p>
            <Link href={\`/blog/\${post.slug}\`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>Baca selengkapnya →</Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
`);

// 2. Blog Detail Page
ensureDir(path.join(root, 'blog', '[slug]'));
fs.writeFileSync(path.join(root, 'blog', '[slug]', 'page.tsx'), `
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
`);

// 3. Tools Page
ensureDir(path.join(root, 'tools'));
fs.writeFileSync(path.join(root, 'tools', 'page.tsx'), `
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function Tools() {
  return (
    <main className="section" style={{ paddingTop: '120px' }}>
      <Reveal className="sec-lbl" as="p">Utilities</Reveal>
      <Reveal delay={1} as="h1" className="sec-ttl">Mini<br />Tools</Reveal>
      <div className="cards" style={{ marginTop: '3rem' }}>
        <Reveal delay={2} className="card">
          <div className="card-body">
            <h3 className="card-title">Kalkulator Harga Website</h3>
            <p className="card-desc">Estimasi biaya pembuatan website berdasarkan fitur dan kompleksitas.</p>
            <div className="card-foot" style={{ marginTop: '1.5rem' }}>
              <Link href="/kalkulator-harga-website" className="btn-o" style={{ padding: '0.5rem 1rem' }}>Buka Tool →</Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={3} className="card">
          <div className="card-body">
            <h3 className="card-title">Penghitung HPP</h3>
            <p className="card-desc">Hitung Harga Pokok Penjualan untuk produk fisik maupun digital.</p>
            <div className="card-foot" style={{ marginTop: '1.5rem' }}>
              <Link href="/penghitung-hpp" className="btn-o" style={{ padding: '0.5rem 1rem' }}>Buka Tool →</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
`);

// 4. API Routes
ensureDir(path.join(root, 'api', 'contact'));
fs.writeFileSync(path.join(root, 'api', 'contact', 'route.ts'), `
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi." }, { status: 400 });
    }

    console.log(\`[Contact] \${name} <\${email}>: \${message}\`);
    return NextResponse.json({ success: true, message: "Pesan berhasil diterima! Terima kasih." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Format data tidak valid." }, { status: 400 });
  }
}
`);

ensureDir(path.join(root, 'api', 'pageview'));
fs.writeFileSync(path.join(root, 'api', 'pageview', 'route.ts'), `
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(\`[Pageview] \${body.path} | ref: \${body.referrer} | at: \${body.timestamp}\`);
    return NextResponse.json({ tracked: true });
  } catch (error) {
    return NextResponse.json({ tracked: false }, { status: 400 });
  }
}
`);
console.log('Pages generated successfully!');
