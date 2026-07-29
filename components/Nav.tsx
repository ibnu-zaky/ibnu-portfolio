"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <Link href="/#home" className="logo">Ibnu<em>.</em></Link>
      <ul className={`nav-links ${isOpen ? "open" : ""}`} id="navLinks">
        <li><Link href="/#about" onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link href="/#projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
        <li><Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
        <li><Link href="/tools" onClick={() => setIsOpen(false)}>Tools</Link></li>
        <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
      </ul>
      <div className="nav-right">
        <a href="https://wa.me/6285186660950" target="_blank" className="hire-btn" rel="noreferrer">
          Hire Me ↗
        </a>
        <ThemeToggle />
        <div className="ham" id="ham" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
