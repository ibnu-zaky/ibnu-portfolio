import Image from "next/image";
import Link from "next/link";
import TypedText from "@/components/TypedText";
import ProjectGrid from "@/components/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data/projects";

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-bg">
          <img src="/img/Ibnu-Lrt.jpg" alt="" />
        </div>
        <div className="hero-left">
          <Reveal className="eyebrow">Available for freelance · Depok, Indonesia</Reveal>
          <Reveal delay={1} as="h1" className="h1">
            <span>Ibnu</span>
            <span className="ghost">Zaky</span>
          </Reveal>
          <Reveal delay={2} className="sub">
            <TypedText phrases={["Web Designer.", "Front End Developer.", "UI/UX Enthusiast."]} /><br />
            Membangun pengalaman web yang bersih, fungsional &amp; indah dari ide ke piksel.
          </Reveal>
          <Reveal delay={3} className="btns">
            <Link href="/#projects" className="btn-f">Lihat Karya</Link>
            <Link href="/tools" className="btn-o">Tools →</Link>
          </Reveal>
        </div>
        <div className="hero-right">
          <div className="profile-box">
            <img src="/img/Miror-Image.jpg" alt="Ibnu Zaky" />
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <Reveal className="sec-lbl">Tentang Saya</Reveal>
        <Reveal delay={1} as="h2" className="sec-ttl">Skill &amp;<br />Pengalaman</Reveal>
        <div className="about-grid">
          <div>
            <Reveal className="bio" as="p">
              Saya adalah Web Designer &amp; Front End Developer yang fokus membangun pengalaman digital yang menarik dan berorientasi pengguna. Dengan keahlian di Figma, HTML, CSS, dan Bootstrap, saya membuat interface yang estetis sekaligus fungsional.
            </Reveal>
            <div className="stats">
              <Reveal delay={1} className="stat">
                <div className="n">3+</div>
                <div className="l">Projects</div>
              </Reveal>
              <Reveal delay={2} className="stat">
                <div className="n">2+</div>
                <div className="l">Tahun Exp</div>
              </Reveal>
              <Reveal delay={3} className="stat">
                <div className="n">∞</div>
                <div className="l">Passion</div>
              </Reveal>
            </div>
          </div>
          <div className="skills">
            <Reveal>
              <div className="sk-row">
                <span className="sk-n">Figma</span><span className="sk-p">90%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="90"></div></div>
            </Reveal>
            <Reveal delay={1}>
              <div className="sk-row">
                <span className="sk-n">HTML</span><span className="sk-p">80%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="80"></div></div>
            </Reveal>
            <Reveal delay={2}>
              <div className="sk-row">
                <span className="sk-n">CSS</span><span className="sk-p">80%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="80"></div></div>
            </Reveal>
            <Reveal delay={3}>
              <div className="sk-row">
                <span className="sk-n">Bootstrap</span><span className="sk-p">80%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="80"></div></div>
            </Reveal>
            <Reveal delay={4}>
              <div className="sk-row">
                <span className="sk-n">Tailwind CSS</span><span className="sk-p">25%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="25"></div></div>
            </Reveal>
            <Reveal delay={5}>
              <div className="sk-row">
                <span className="sk-n">PHP</span><span className="sk-p">15%</span>
              </div>
              <div className="sk-track"><div className="sk-fill" data-w="15"></div></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="projects">
        <Reveal className="sec-lbl" as="p">Karya Saya</Reveal>
        <Reveal delay={1} as="h2" className="sec-ttl">Project<br />Terbaru</Reveal>
        <ProjectGrid projects={projects} />
      </section>

      <section className="section" id="contact">
        <Reveal className="sec-lbl" as="p">Hubungi Saya</Reveal>
        <Reveal delay={1} as="h2" className="sec-ttl">Let&apos;s Work<br />Together</Reveal>
        <div className="contact-wrap">
          <ContactForm />
          <Reveal delay={3} className="socials">
            <a href="https://wa.me/6285186660950" target="_blank" className="soc" rel="noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://www.instagram.com/ibnuzzkyy" target="_blank" className="soc" rel="noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.linkedin.com/in/ibnu-zaky/" target="_blank" className="soc" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://twitter.com/markopetualang" target="_blank" className="soc" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
