
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
