/**
 * Cenas do Estudo A — "O ponto de apoio".
 * A forma vermelha sólida é sempre o julgamento humano: fulcro da alavanca,
 * cone de foco, pilar da passagem, base da decisão, seta do ciclo.
 * Os pontos são o que se constrói sobre ele.
 */
import { type Scene, type Target, type Quad, bar, sphere, person, scatter, rng } from './dots';

const tri = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number): Quad => [ax, ay, ax, ay, bx, by, cx, cy];

interface Geo { cx: number; cy: number; s: number; mobile: boolean }

/** enquadramento: na abertura a arte fica no centro; nos capítulos, à direita (desktop) ou no alto (celular) */
/** caixa da arte na abertura, medida no DOM pela página (cx, cy, escala) */
export const heroBox: { box: { cx: number; cy: number; s: number } | null } = { box: null };

export function geo(w: number, h: number, chapter: boolean): Geo {
  const mobile = w < 760;
  if (!chapter && heroBox.box) return { ...heroBox.box, mobile };
  if (mobile) {
    const s = Math.min(w / 700, h / 900);
    return { cx: w / 2, cy: chapter ? h * 0.3 : h * 0.41, s, mobile };
  }
  const s = Math.min(w / 1250, h / 820);
  return { cx: chapter ? w * 0.66 : w / 2, cy: chapter ? h * 0.52 : h * 0.5, s, mobile };
}

const ground = (y: number, x0: number, x1: number) => (ctx: CanvasRenderingContext2D, a: number) => {
  ctx.globalAlpha = a; ctx.strokeStyle = '#1b1918'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y + 0.5); ctx.lineTo(x1, y + 0.5); ctx.stroke();
};

/** Abertura: alavanca. `state.f` = posição do apoio (0 = perto do esforço, 1 = perto do efeito). */
export const leverState = { f: 0.68 };

export const lever: Scene = (w, h) => {
  const { cx, cy, s } = geo(w, h, false);
  const L = 620 * s, x0 = cx - L / 2, x1 = cx + L / 2;
  const sp = 8.5 * s, r = 2.1 * s;
  const fx = x0 + L * (0.34 + leverState.f * 0.5);
  const thick = 3 * sp;
  const triH = 92 * s, base = cy + 120 * s, apexY = base - triH;
  const angle = -0.085; // lado do esforço desce
  // a viga gira em torno do ápice do fulcro
  const c = Math.cos(angle), sn = Math.sin(angle);
  const startU = x0 - fx; // coordenada ao longo da viga (u) do início
  const bx = fx + startU * c + thick * sn, by = apexY + startU * sn - thick * c;
  const beam = bar(bx, by, L, thick, angle, sp, r);
  const longArm = fx - x0, shortArm = x1 - fx;
  const ratio = longArm / shortArm; // ≈ alavancagem L
  // esforço: pequena figura na ponta longa (mesmo tamanho sempre — t constante)
  const ex = x0 + 40 * s, ey = apexY + (ex - fx) * Math.tan(angle) - thick / Math.cos(angle) + 2 * s;
  const fig = person(ex, ey, 118 * s, sp * 0.55, r * 0.75);
  // efeito: esfera na ponta curta; área ∝ L
  const R = Math.min(150 * s, 30 * s * Math.sqrt(ratio * 2.2));
  const sx = x1 - R * 0.9;
  const sy = apexY + (sx - fx) * Math.tan(angle) - thick / Math.cos(angle) - R + 1 * s;
  const ball = sphere(sx, sy, R, sp, r * 1.45);
  return {
    targets: [...beam, ...fig, ...ball],
    red: { quad: tri(fx, apexY + 2 * s, fx + 52 * s, base, fx - 52 * s, base), alpha: 1 },
    solids: ground(base, cx - 400 * s, cx + 400 * s),
    labels: [
      { text: 't · esforço', x: x0, y: base + 26 * s, align: 'left', tone: 'muted' },
      { text: 'L · apoio', x: fx, y: base + (w < 760 ? 46 : 26) * s, align: 'center', tone: 'red' },
      { text: 'U · efeito', x: x1, y: base + 26 * s, align: 'right', tone: 'muted' },
    ],
  };
};

/** 01 Julgamento: cone de foco; sob ele os pontos se organizam, fora dele ficam dispersos. */
export const judgment: Scene = (w, h) => {
  const { cx, cy, s } = geo(w, h, true);
  const base = cy + 150 * s, top = cy - 250 * s;
  const sp = 9 * s, r = 2.1 * s;
  const organized: Target[] = [];
  for (let y = base - 8 * sp; y < base - sp * 0.5; y += sp)
    for (let x = cx - 9 * sp; x <= cx + 9 * sp; x += sp) organized.push({ x, y, r: r * 1.15 });
  const loose = scatter(cx - 420 * s, cy - 260 * s, 840 * s, 420 * s, 900, 0.8 * s, 1.8 * s, 11)
    .filter((p) => { // fora do cone
      const t = (p.y - top) / (base - top); const half = 150 * s * t;
      return !(t > 0 && Math.abs(p.x - cx) < half + 14 * s);
    });
  return {
    targets: [...organized, ...loose],
    red: { quad: tri(cx, top, cx + 160 * s, base, cx - 160 * s, base), alpha: 0.13 },
    solids: (ctx, a) => {
      ground(base, cx - 470 * s, cx + 470 * s)(ctx, a);
      ctx.globalAlpha = a; ctx.fillStyle = '#910808';
      ctx.fillRect(cx - 22 * s, top - 10 * s, 44 * s, 10 * s); // luminária
    },
    labels: [{ text: 'o problema e o critério', x: cx, y: base + 26 * s, align: 'center', tone: 'red' }],
  };
};

/** 02 Trabalho com IA: duas margens e uma passagem pontilhada construída entre elas. */
export const building: Scene = (w, h) => {
  const { cx, cy, s, mobile } = geo(w, h, true);
  const gap = (mobile ? 300 : 320) * s, mw = 210 * s, top = cy, base = cy + 170 * s;
  const lx1 = cx - gap / 2, rx0 = cx + gap / 2;
  const sp = 8.5 * s, r = 2 * s;
  const deck = bar(lx1 - 6 * s, top - 3 * sp, gap + 12 * s, 3 * sp, 0, sp, r);
  // treliça: diagonais em pontos sob o tabuleiro
  const truss: Target[] = [];
  const segs = 6;
  for (let k = 0; k < segs; k++) {
    const xa = lx1 + (gap * k) / segs, xb = lx1 + (gap * (k + 1)) / segs;
    for (let t = 0; t <= 1; t += 0.12) {
      const down = k % 2 === 0;
      truss.push({ x: xa + (xb - xa) * t, y: top + (down ? t : 1 - t) * 46 * s, r: r * 0.9 });
    }
  }
  // quem atravessa: figura em pontos no meio da passagem
  const fig = person(cx - 20 * s, top - 3 * sp, 100 * s, sp * 0.55, r * 0.75);
  const field = scatter(cx - 460 * s, cy - 230 * s, 920 * s, 120 * s, 120, 0.6 * s, 1.2 * s, 5);
  return {
    targets: [...deck, ...truss, ...fig, ...field],
    red: { quad: tri(cx, top + 46 * s, cx + 42 * s, base, cx - 42 * s, base), alpha: 1 },
    solids: (ctx, a) => {
      ctx.globalAlpha = a; ctx.fillStyle = '#dcd6cd';
      ctx.fillRect(lx1 - mw, top, mw, base - top);
      ctx.fillRect(rx0, top, mw, base - top);
      ground(base, cx - 470 * s, cx + 470 * s)(ctx, a);
    },
    labels: [
      { text: 'negócio', x: lx1 - mw / 2, y: top + 30 * s, align: 'center', tone: 'ink' },
      { text: 'técnica', x: rx0 + mw / 2, y: top + 30 * s, align: 'center', tone: 'ink' },
    ],
  };
};

/** 03 Decisão e uso: a estrutura encontra apoio sólido e passa a agir (saída em uso). */
export const decision: Scene = (w, h) => {
  const { cx, cy, s } = geo(w, h, true);
  const base = cy + 150 * s, plinthTop = base - 40 * s;
  const sp = 8.5 * s, r = 2.1 * s;
  const bx = cx - 150 * s;
  const tower: Target[] = [];
  // três placas empilhadas (revisão → incorporação → em uso), levemente deslocadas
  for (let k = 0; k < 3; k++) {
    tower.push(...bar(bx + k * 16 * s, plinthTop - (k + 1) * 62 * s, 150 * s, 50 * s, 0, sp, r * (1 - k * 0.12)));
  }
  const fig = person(bx - 70 * s, base, 118 * s, sp * 0.55, r * 0.75);
  // saída: fluxo de pontos crescendo para a direita
  const out: Target[] = [];
  for (let i = 0; i < 26; i++) {
    const x = bx + 200 * s + i * 11 * s;
    out.push({ x, y: plinthTop - 110 * s, r: r * (0.6 + i / 26) });
    if (i > 16) out.push({ x, y: plinthTop - 110 * s - (i - 16) * 6 * s, r: r * 0.9 }, { x, y: plinthTop - 110 * s + (i - 16) * 6 * s, r: r * 0.9 });
  }
  return {
    targets: [...tower, ...fig, ...out],
    red: { quad: [bx - 20 * s, plinthTop, bx + 210 * s, plinthTop, bx + 230 * s, base, bx - 40 * s, base] as Quad, alpha: 1 },
    solids: ground(base, cx - 470 * s, cx + 470 * s),
    labels: [{ text: 'em uso', x: bx + 200 * s + 26 * 11 * s, y: plinthTop - 140 * s, align: 'right', tone: 'muted' }],
  };
};

/** 04 Aprendizado: os pontos formam um ciclo; parte deles volta organizada para a base. */
export const learning: Scene = (w, h) => {
  const { cx, cy, s } = geo(w, h, true);
  const R = 170 * s, sp = 8.5 * s, r = 2 * s;
  const ring: Target[] = [];
  const rand = rng(17);
  for (let band = 0; band < 3; band++) {
    const rr = R - band * sp;
    const n = Math.floor((2 * Math.PI * rr) / sp);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      if (a > -0.2 && a < 0.25) continue; // abertura onde fica a seta
      ring.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, r: r * (0.75 + 0.5 * rand()) });
    }
  }
  // conhecimento acumulado no centro: grade densa que cresce
  const core: Target[] = [];
  for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) if (x * x + y * y <= 26) core.push({ x: cx + x * sp, y: cy + y * sp, r: r * 1.1 });
  const ax = cx + R - sp, ay = cy;
  return {
    targets: [...ring, ...core],
    red: { quad: tri(ax, ay + 30 * s, ax + 26 * s, ay - 14 * s, ax - 26 * s, ay - 14 * s), alpha: 1 },
    labels: [{ text: 'volta para o próximo trabalho', x: cx, y: cy + R + 34 * s, align: 'center', tone: 'muted' }],
  };
};

export const scenesA = [lever, judgment, building, decision, learning];
