"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function ProjectGrid({ projects }: { projects: any[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : projects.filter(p => p.categories.includes(filter));

  return (
    <>
      <Reveal delay={2}>
        <div className="filter-row">
          <button className={`f-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Semua</button>
          <button className={`f-btn ${filter === "frontend" ? "active" : ""}`} onClick={() => setFilter("frontend")}>Front End</button>
          <button className={`f-btn ${filter === "design" ? "active" : ""}`} onClick={() => setFilter("design")}>Apps Design</button>
          <button className={`f-btn ${filter === "teamwork" ? "active" : ""}`} onClick={() => setFilter("teamwork")}>Team Work</button>
        </div>
      </Reveal>
      <div className="cards" id="projectCards">
        {filtered.map((project, i) => (
          <Reveal key={project.title} delay={i + 1 > 3 ? 3 : i + 1} className="card">
            {project.image ? (
              <div className="card-thumb">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
            ) : project.placeholder ? (
              <div className="card-thumb" style={{ background: "linear-gradient(135deg,#0a0a1a,#12122a)" }}>
                <div className="card-ph">
                  <span className="ph-t">{project.placeholder.title}</span>
                  <span className="ph-s">{project.placeholder.subtitle}</span>
                </div>
              </div>
            ) : (
              <div className="card-thumb"></div>
            )}
            <div className="card-body">
              <div className="card-tags">
                {project.categories.map((c: string) => <span key={c} className="tag">{c}</span>)}
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
              <div className="card-foot">
                <span className="card-date">{project.date}</span>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer" className="card-link">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                ) : (
                  <span className="card-link" style={{ opacity: 0.3 }}>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
