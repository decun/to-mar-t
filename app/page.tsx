"use client";

import { useEffect, useState } from "react";

const particles = [
  ["♥", "12%", "8%", "0s"],
  ["✦", "22%", "24%", ".18s"],
  ["♥", "34%", "4%", ".35s"],
  ["★", "48%", "20%", ".08s"],
  ["♥", "60%", "2%", ".3s"],
  ["✦", "72%", "22%", ".5s"],
  ["♥", "84%", "7%", ".12s"],
  ["★", "92%", "28%", ".4s"],
] as const;

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const started = performance.now();
    const duration = 2200;
    let frame = 0;

    const tick = (now: number) => {
      const value = Math.min(100, Math.round(((now - started) / duration) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setReady(true), 350);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="sky">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="cloud cloud-c" />

      <section className={`loader ${ready ? "loader-away" : ""}`} aria-hidden={ready}>
        <div className="loader-mark">♥</div>
        <p>Preparando algo especial…</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{progress}%</span>
      </section>

      <section className={`scene ${ready ? "scene-ready" : ""}`} aria-label="Una carta especial">
        <p className="eyebrow">PARA ALGUIEN ESPECIAL</p>
        <h1>{open ? "Esta cartita es para ti" : "Tienes una carta"}</h1>
        <p className="hint">{open ? "Espero que te saque una sonrisa ♡" : "Toca la rosa para abrirla"}</p>

        <div className={`envelope-stage ${open ? "is-open" : ""}`}>
          <div className="particles" aria-hidden="true">
            {particles.map(([symbol, left, top, delay], index) => (
              <i key={index} style={{ left, top, animationDelay: delay }}>{symbol}</i>
            ))}
          </div>

          <article className="letter" aria-hidden={!open}>
            <div className="letter-rule" />
            <span className="letter-date">un pedacito de lo que siento</span>
            <h2>Hola, tú ♡</h2>
            <p>
              Aquí va a vivir nuestra carta. Por ahora, solo quería guardar este
              espacio bonito para todas esas palabras que mereces leer.
            </p>
            <p className="signature">Con cariño, alguien que piensa en ti</p>
          </article>

          <div className="envelope">
            <div className="envelope-back" />
            <div className="envelope-flap" />
            <div className="envelope-front" />
            <button
              className="rose-seal"
              type="button"
              aria-label={open ? "Cerrar la carta" : "Abrir la carta"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="seal-glow" />
              <span className="rose">🌹</span>
            </button>
          </div>
        </div>

        <button className={`close-letter ${open ? "visible" : ""}`} onClick={() => setOpen(false)}>
          cerrar la carta
        </button>
      </section>
    </main>
  );
}
