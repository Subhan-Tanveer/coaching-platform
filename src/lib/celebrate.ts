import confetti from "canvas-confetti";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function celebrateLessonComplete() {
  if (prefersReducedMotion()) return;
  confetti({
    particleCount: 60,
    spread: 65,
    startVelocity: 35,
    origin: { x: 0.85, y: 0.15 },
    colors: ["#22d3ee", "#a855f7", "#edf1fb"],
    gravity: 1.1,
    scalar: 0.85,
    ticks: 150,
  });
}

export function celebrateQuizPassed() {
  if (prefersReducedMotion()) return;
  const colors = ["#22d3ee", "#a855f7", "#34d399", "#f59e0b"];
  const end = Date.now() + 600;

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function celebratePerfectQuiz() {
  if (prefersReducedMotion()) return;
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: ["#22d3ee", "#a855f7", "#34d399", "#f59e0b", "#edf1fb"],
    ticks: 200,
  });
}
