import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import styles from './Hex.module.css';

/**
 * HoneycombCanvas — rejilla hexagonal reactiva (guía TAR).
 *
 * - Spotlight y celdas encendidas cerca del puntero, celdas que "respiran".
 * - Ondas expansivas vía ref.pulso(clientX, clientY, fuerza).
 * Rendimiento:
 * - Rejilla base pre-renderizada en un canvas oculto (1 drawImage por frame).
 * - Solo se pintan celdas encendidas; desvanecido por celda (sin mask-image).
 * - DPR ≤ 1.5, ~30 fps en reposo, se detiene fuera de vista o con pestaña oculta.
 * - Rect cacheado; respeta prefers-reduced-motion (solo rejilla estática).
 */

const R = 26; // radio del hexágono de la rejilla (px CSS)
const HEX_H = Math.sqrt(3) * R;
const DPR_MAX = 1.5;
const INTENSIDAD_ONDA = 0.45;
const MAX_ONDAS = 3;
const VEL_ONDA = 0.55; // px por ms
const RADIO_SPOT = 170;
const FPS_REPOSO = 30;

const trazarHex = (ctx, cx, cy, r) => {
  ctx.moveTo(cx + r, cy);
  for (let k = 1; k < 6; k += 1) {
    const a = (Math.PI / 3) * k;
    ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
};

const HoneycombCanvas = forwardRef(function HoneycombCanvas(_, ref) {
  const canvasRef = useRef(null);
  const api = useRef({ pulso: () => {} });

  useImperativeHandle(ref, () => ({
    pulso: (x, y, f) => api.current.pulso(x, y, f),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const base = document.createElement('canvas');
    const bctx = base.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let rect = canvas.getBoundingClientRect();
    let celdas = [];
    let raf = 0;
    let visible = true;
    let ultimo = 0;
    const mouse = { x: -9999, y: -9999, activo: false, t: 0 };
    let ondas = [];

    /* ---- Construcción de la rejilla (solo al cambiar tamaño) ---- */
    const construir = () => {
      rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
      w = rect.width;
      h = rect.height;
      [canvas, base].forEach((c) => {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      });
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      celdas = [];
      const cols = Math.ceil(w / (R * 1.5)) + 2;
      const filas = Math.ceil(h / HEX_H) + 2;
      for (let c = -1; c < cols; c += 1) {
        for (let f = -1; f < filas; f += 1) {
          celdas.push({
            x: c * R * 1.5,
            y: f * HEX_H + (c % 2 ? HEX_H / 2 : 0),
            v: 0, // intensidad actual (se desvanece por celda)
            fase: Math.random() * Math.PI * 2,
            respira: Math.random() < 0.06, // ~6 % de celdas respiran
          });
        }
      }

      // Rejilla base pre-renderizada
      bctx.clearRect(0, 0, w, h);
      bctx.beginPath();
      celdas.forEach((cel) => trazarHex(bctx, cel.x, cel.y, R - 1.5));
      bctx.strokeStyle = 'rgba(11, 31, 58, 0.055)';
      bctx.lineWidth = 1;
      bctx.stroke();
      pintar(performance.now(), true);
    };

    /* ---- Ondas ---- */
    api.current.pulso = (clientX, clientY, fuerza = 1) => {
      if (reduce) return;
      ondas.forEach((o) => {
        o.f *= 0.35; // cada onda nueva atenúa las anteriores
      });
      ondas.push({ x: clientX - rect.left, y: clientY - rect.top, t0: performance.now(), f: fuerza });
      if (ondas.length > MAX_ONDAS) ondas = ondas.slice(-MAX_ONDAS);
      despertar();
    };

    /* ---- Pintado ---- */
    const pintar = (ahora, soloBase = false) => {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(base, 0, 0, w, h);
      if (soloBase || reduce) return false;

      // Spotlight suave bajo el puntero
      if (mouse.activo) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, RADIO_SPOT * 1.4);
        g.addColorStop(0, 'rgba(30, 64, 175, 0.07)');
        g.addColorStop(1, 'rgba(30, 64, 175, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - RADIO_SPOT * 1.4, mouse.y - RADIO_SPOT * 1.4, RADIO_SPOT * 2.8, RADIO_SPOT * 2.8);
      }

      ondas = ondas.filter((o) => (ahora - o.t0) * VEL_ONDA < Math.max(w, h) * 0.9);

      let hayActividad = mouse.activo || ondas.length > 0;
      ctx.beginPath();
      const encendidas = [];

      for (let i = 0; i < celdas.length; i += 1) {
        const c = celdas[i];
        let objetivo = 0;

        if (mouse.activo) {
          const d = Math.hypot(c.x - mouse.x, c.y - mouse.y);
          if (d < RADIO_SPOT) objetivo = (1 - d / RADIO_SPOT) ** 1.6;
        }
        for (let k = 0; k < ondas.length; k += 1) {
          const o = ondas[k];
          const radio = (ahora - o.t0) * VEL_ONDA;
          const d = Math.abs(Math.hypot(c.x - o.x, c.y - o.y) - radio);
          if (d < 46) {
            const caida = 1 - radio / (Math.max(w, h) * 0.9);
            objetivo = Math.max(objetivo, (1 - d / 46) * INTENSIDAD_ONDA * o.f * caida);
          }
        }
        if (c.respira) {
          objetivo = Math.max(objetivo, 0.16 + 0.14 * Math.sin(ahora / 1400 + c.fase));
        }

        // Desvanecido por celda (sube rápido, baja suave)
        c.v += (objetivo - c.v) * (objetivo > c.v ? 0.25 : 0.07);
        if (c.v > 0.012) {
          encendidas.push(c);
          if (!c.respira && c.v > 0.02) hayActividad = true;
        }
      }

      for (let i = 0; i < encendidas.length; i += 1) {
        const c = encendidas[i];
        ctx.beginPath();
        trazarHex(ctx, c.x, c.y, R - 1.5);
        ctx.fillStyle = `rgba(30, 58, 138, ${(c.v * 0.12).toFixed(3)})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(30, 64, 175, ${(c.v * 0.45).toFixed(3)})`;
        ctx.stroke();
      }
      return hayActividad;
    };

    const bucle = (ahora) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const activo = mouse.activo || ondas.length > 0;
      // ~30 fps en reposo, frame completo con actividad
      if (activo || ahora - ultimo >= 1000 / FPS_REPOSO) {
        ultimo = ahora;
        pintar(ahora);
      }
      raf = requestAnimationFrame(bucle);
    };

    const despertar = () => {
      if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(bucle);
    };

    /* ---- Eventos ---- */
    const onMove = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.activo = x >= 0 && y >= 0 && x <= w && y <= h;
      mouse.x = x;
      mouse.y = y;
      if (mouse.activo) despertar();
    };
    const onLeave = () => {
      mouse.activo = false;
    };
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };
    // Pestaña oculta: se detiene (ahorro). Hay que limpiar raf; si queda el id cancelado,
    // despertar() cree que el bucle sigue vivo y la animación no vuelve al regresar.
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        rect = canvas.getBoundingClientRect();
        despertar();
      }
    };

    const ro = new ResizeObserver(construir);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        rect = canvas.getBoundingClientRect();
        despertar();
      }
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    construir();
    despertar();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
});

export default HoneycombCanvas;
