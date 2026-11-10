/**
 * Cena do Estudo B — "A equação".
 * t = um trecho de tempo (barra vermelha sólida, sempre do mesmo tamanho).
 * L = três camadas de repertório em pontos (negócio, técnica, IA), ativáveis.
 * U = esfera de pontos cuja área acompanha L · t; o núcleo vermelho lembra
 *     que o esforço humano continua no centro do efeito.
 */
import { type Scene, type Target, type Quad, sphere } from './dots';

export const eqState = { layers: [true, true, true] };

/** posições horizontais das três colunas (fração da largura) — usadas também pelo HTML */
export const cols = (w: number) => (w < 760 ? [0.14, 0.47, 0.8] : [0.16, 0.47, 0.79]);

export const equation: Scene = (w, h) => {
  const mobile = w < 760;
  const s = mobile ? Math.min(w / 640, h / 300) : Math.min(w / 1200, h / 380);
  const [ct, cl, cu] = cols(w).map((f) => f * w);
  const cy = h * 0.5;
  const sp = 8 * s, r = 1.9 * s;
  const targets: Target[] = [];

  // L: três planos inclinados (paralelogramos) empilhados
  const pw = (mobile ? 170 : 210) * s, pd = 70 * s, gap = 44 * s;
  const n = eqState.layers.filter(Boolean).length;
  eqState.layers.forEach((on, k) => {
    const y0 = cy + gap - k * gap; // de baixo para cima: negócio, técnica, IA
    const rows = 6;
    for (let row = 0; row < rows; row++) {
      for (let u = 0; u < pw; u += sp) {
        const x = cl - pw / 2 + u + row * sp * 0.5 - rows * sp * 0.25;
        const y = y0 - row * sp * 0.5 + rows * sp * 0.25;
        targets.push({ x, y, r: on ? r * (0.8 + (row / rows) * 0.35) : r * 0.32 });
      }
    }
  });

  // U: esfera; área ∝ n (t constante)
  const R = 46 * s * Math.sqrt(Math.max(n, 0.35) * 1.6);
  const ball = sphere(cu, cy, R, sp, r * 1.5);
  const core = 20 * s;
  ball.forEach((p) => { if ((p.x - cu) ** 2 + (p.y - cy) ** 2 < core * core) { p.red = 1; p.r = r * 1.35; } });
  targets.push(...ball);

  const tw = 64 * s, th = 16 * s;
  return {
    targets,
    red: { quad: [ct - tw / 2, cy - th / 2, ct + tw / 2, cy - th / 2, ct + tw / 2, cy + th / 2, ct - tw / 2, cy + th / 2] as Quad, alpha: 1 },
    solids: (ctx, a) => {
      // régua de tempo sob t: o trecho vermelho é sempre o mesmo
      ctx.globalAlpha = a; ctx.strokeStyle = '#1b1918'; ctx.lineWidth = 1;
      const y = cy + th / 2 + 12 * s;
      ctx.beginPath(); ctx.moveTo(ct - 70 * s, y + 0.5); ctx.lineTo(ct + 70 * s, y + 0.5);
      for (let k = -7; k <= 7; k++) { ctx.moveTo(ct + k * 10 * s + 0.5, y); ctx.lineTo(ct + k * 10 * s + 0.5, y + (k % 7 === 0 ? 8 : 4) * s); }
      ctx.stroke();
    },
    labels: mobile ? [] : eqState.layers.map((on, k) => ({
      text: ['negócio', 'técnica', 'IA'][k],
      x: cl + pw / 2 + 26 * s, y: cy + gap - k * gap + 2 * s, align: 'left' as const, tone: on ? ('ink' as const) : ('muted' as const),
    })),
  };
};
