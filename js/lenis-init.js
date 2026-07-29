// js/lenis-init.js
(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Hormati preferensi aksesibilitas pengguna — jangan paksa smooth scroll
  if (prefersReducedMotion) return;

  window.lenis = new Lenis({
    autoRaf: true,            // Lenis urus requestAnimationFrame loop-nya sendiri
    anchors: { offset: -80 }, // offset karena nav fixed setinggi 64px
    stopInertiaOnNavigate: true,
  });
})();
