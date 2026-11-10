/**
 * DotField — escultura de pontos em Canvas 2D.
 *
 * Um conjunto fixo de N pontos persiste durante toda a página. Cada "cena"
 * fornece alvos (posição, raio, cor) e, opcionalmente, um polígono sólido
 * (a forma vermelha protagonista) e formas cinzas de apoio. A rolagem define
 * `progress` (0…cenas-1); os pontos interpolam entre cenas vizinhas com um
 * leve escalonamento da esquerda para a direita, o que faz a mudança ler como
 * reorganização e não como fade. O ponteiro empurra os pontos, que voltam
 * por mola (referência: Illuminare Studio).
 */

export interface Target { x: number; y: number; r: number; red?: number }
export interface Label { text: string; x: number; y: number; align?: 'left' | 'center' | 'right'; tone?: 'ink' | 'muted' | 'red' }
export type Quad = [number, number, number, number, number, number, number, number];
export interface Frame {
  targets: Target[];
  /** forma sólida vermelha (4 vértices; triângulo = vértice repetido) */
  red?: { quad: Quad; alpha: number };
  /** desenho de formas neutras de apoio (chão, margens), recebe alpha 0…1 */
  solids?: (ctx: CanvasRenderingContext2D, a: number) => void;
  labels?: Label[];
}
export type Scene = (w: number, h: number) => Frame;

export interface FieldOptions {
  count?: number;
  ink?: string;
  red?: string;
  onLabels?: (labels: { l: Label; a: number }[]) => void;
}

const prefersReduced = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/** Normaliza qualquer lista de alvos para exatamente n pontos, ordenados por x. */
function normalize(t: Target[], n: number): Target[] {
  const s = [...t].sort((a, b) => a.x - b.x || a.y - b.y);
  if (s.length === 0) return Array.from({ length: n }, () => ({ x: 0, y: 0, r: 0 }));
  if (s.length >= n) {
    const out: Target[] = [];
    for (let i = 0; i < n; i++) out.push(s[Math.floor((i * s.length) / n)]);
    return out;
  }
  // Faltam pontos: os excedentes ficam invisíveis (r = 0) sobre pontos existentes,
  // intercalados para não concentrar a "reserva" num lado.
  const out: Target[] = [];
  const extra = n - s.length;
  let e = 0;
  for (let i = 0; i < s.length; i++) {
    out.push(s[i]);
    const want = Math.floor(((i + 1) * extra) / s.length);
    while (e < want) { out.push({ x: s[i].x, y: s[i].y, r: 0, red: s[i].red }); e++; }
  }
  return out;
}

export class DotField {
  private ctx: CanvasRenderingContext2D;
  private w = 0; private h = 0; private dpr = 1;
  private n: number;
  private px: Float32Array; private py: Float32Array;
  private vx: Float32Array; private vy: Float32Array;
  private pr: Float32Array; private pred: Float32Array;
  private frames: (Frame & { t: Target[] })[] = [];
  private progress = 0;
  private pointer = { x: -9999, y: -9999, active: false };
  private raf = 0;
  private visible = true;
  private settledFrames = 0;
  private ink: string; private redColor: string;
  private onLabels?: FieldOptions['onLabels'];
  /** movimento reduzido (preferência do sistema ou botão de pausa) */
  still = prefersReduced();

  constructor(private canvas: HTMLCanvasElement, private scenes: Scene[], opts: FieldOptions = {}) {
    this.ctx = canvas.getContext('2d')!;
    const small = Math.min(innerWidth, innerHeight) < 640 || (navigator.hardwareConcurrency || 8) <= 4;
    this.n = opts.count ?? (small ? 900 : 1700);
    this.ink = opts.ink ?? '#1b1918';
    this.redColor = opts.red ?? '#910808';
    this.onLabels = opts.onLabels;
    const N = this.n;
    this.px = new Float32Array(N); this.py = new Float32Array(N);
    this.vx = new Float32Array(N); this.vy = new Float32Array(N);
    this.pr = new Float32Array(N); this.pred = new Float32Array(N);

    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.kick(); }, { rootMargin: '100px' }).observe(canvas);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.kick(); });
    addEventListener('pointermove', (e) => this.onPointer(e), { passive: true });
    addEventListener('pointerdown', (e) => this.onPointer(e), { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { this.pointer.active = false; this.kick(); });
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (m) => { this.still = m.matches; this.kick(); });
    this.resize(true);
  }

  private onPointer(e: PointerEvent) {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    this.pointer.active = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    this.pointer.x = x; this.pointer.y = y;
    if (this.pointer.active) this.kick();
  }

  /** Recalcula os alvos (após resize ou mudança de parâmetro de uma cena). */
  rebuild(only?: number) {
    this.frames = this.scenes.map((s, i) => {
      if (only !== undefined && i !== only && this.frames[i]) return this.frames[i];
      const f = s(this.w, this.h);
      return { ...f, t: normalize(f.targets, this.n) };
    });
    this.kick();
  }

  private resize(first = false) {
    const r = this.canvas.getBoundingClientRect();
    if (r.width === 0) return;
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = r.width; this.h = r.height;
    this.canvas.width = Math.round(r.width * this.dpr);
    this.canvas.height = Math.round(r.height * this.dpr);
    this.rebuild();
    if (first || this.still) this.snap();
    this.kick();
  }

  setProgress(p: number) {
    p = clamp(p, 0, this.scenes.length - 1);
    if (p === this.progress) return;
    this.progress = p;
    this.kick();
  }

  /** pausa o loop (ex.: painel de entrega aberto por cima) */
  setActive(v: boolean) { this.visible = v; if (v) this.kick(); }

  setStill(v: boolean) { this.still = v || prefersReduced(); this.kick(); }

  /** Alvo interpolado do ponto i para o progresso atual. */
  private target(i: number, out: { x: number; y: number; r: number; red: number }) {
    const p = this.progress;
    const a = Math.floor(p), b = Math.min(a + 1, this.frames.length - 1);
    const A = this.frames[a].t[i], B = this.frames[b].t[i];
    const lt = p - a;
    const d = i / this.n; // escalonamento esquerda → direita (alvos ordenados por x)
    const t = this.still ? (lt < 0.5 ? 0 : 1) : ease(clamp((lt - d * 0.35) / 0.65));
    out.x = A.x + (B.x - A.x) * t;
    out.y = A.y + (B.y - A.y) * t;
    out.r = A.r + (B.r - A.r) * t;
    out.red = (A.red ?? 0) + ((B.red ?? 0) - (A.red ?? 0)) * t;
  }

  private snap() {
    const o = { x: 0, y: 0, r: 0, red: 0 };
    for (let i = 0; i < this.n; i++) {
      this.target(i, o);
      this.px[i] = o.x; this.py[i] = o.y; this.pr[i] = o.r; this.pred[i] = o.red;
      this.vx[i] = 0; this.vy[i] = 0;
    }
  }

  kick() {
    this.settledFrames = 0;
    if (!this.raf) this.raf = requestAnimationFrame(() => this.tick());
  }

  private tick() {
    this.raf = 0;
    if (!this.visible || document.hidden || !this.frames.length) return;
    const o = { x: 0, y: 0, r: 0, red: 0 };
    let energy = 0;
    const { x: mx, y: my, active } = this.pointer;
    const R = Math.max(70, Math.min(this.w, this.h) * 0.11), R2 = R * R;
    const usePointer = active && !this.still;
    for (let i = 0; i < this.n; i++) {
      this.target(i, o);
      if (this.still) {
        this.px[i] = o.x; this.py[i] = o.y; this.pr[i] = o.r; this.pred[i] = o.red;
        continue;
      }
      let fx = (o.x - this.px[i]) * 0.085, fy = (o.y - this.py[i]) * 0.085;
      if (usePointer) {
        const dx = this.px[i] - mx, dy = this.py[i] - my, d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2), f = (1 - d / R) * (1 - d / R) * 9;
          fx += (dx / d) * f; fy += (dy / d) * f;
        }
      }
      this.vx[i] = (this.vx[i] + fx) * 0.78; this.vy[i] = (this.vy[i] + fy) * 0.78;
      this.px[i] += this.vx[i]; this.py[i] += this.vy[i];
      this.pr[i] += (o.r - this.pr[i]) * 0.2;
      this.pred[i] += (o.red - this.pred[i]) * 0.15;
      energy += Math.abs(this.vx[i]) + Math.abs(this.vy[i]) + Math.abs(o.r - this.pr[i]);
    }
    this.draw();
    if (this.still) return; // quadro único; nova mudança chama kick()
    if (energy / this.n < 0.004 && !usePointer) this.settledFrames++;
    else this.settledFrames = 0;
    if (this.settledFrames < 20) this.raf = requestAnimationFrame(() => this.tick());
  }

  private draw() {
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    const p = this.progress;
    const a = Math.floor(p), b = Math.min(a + 1, this.frames.length - 1);
    const lt = this.still ? (p - a < 0.5 ? 0 : 1) : ease(p - a);
    const A = this.frames[a], B = this.frames[b];

    // formas neutras (crossfade)
    if (A.solids && 1 - lt > 0.01) { ctx.save(); A.solids(ctx, 1 - lt); ctx.restore(); }
    if (B !== A && B.solids && lt > 0.01) { ctx.save(); B.solids(ctx, lt); ctx.restore(); }

    // forma vermelha protagonista: interpolação de vértices
    const ra = A.red, rb = B.red ?? A.red;
    if (ra || rb) {
      const qa = (ra ?? rb)!, qb = (rb ?? ra)!;
      const q = qa.quad.map((v, k) => v + (qb.quad[k] - v) * lt);
      const al = qa.alpha + (qb.alpha - qa.alpha) * lt;
      ctx.globalAlpha = al;
      ctx.fillStyle = this.redColor;
      ctx.beginPath();
      ctx.moveTo(q[0], q[1]); ctx.lineTo(q[2], q[3]); ctx.lineTo(q[4], q[5]); ctx.lineTo(q[6], q[7]);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // pontos: duas passadas (tinta e vermelho) para poucas trocas de estado
    for (const pass of [0, 1]) {
      ctx.fillStyle = pass ? this.redColor : this.ink;
      ctx.beginPath();
      for (let i = 0; i < this.n; i++) {
        const r = this.pr[i];
        if (r < 0.15) continue;
        if ((this.pred[i] > 0.5 ? 1 : 0) !== pass) continue;
        ctx.moveTo(this.px[i] + r, this.py[i]);
        ctx.arc(this.px[i], this.py[i], r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    if (this.onLabels) {
      const out: { l: Label; a: number }[] = [];
      A.labels?.forEach((l) => out.push({ l, a: 1 - lt }));
      if (B !== A) B.labels?.forEach((l) => out.push({ l, a: lt }));
      this.onLabels(out);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Construtores de alvos reutilizáveis pelas cenas                     */
/* ------------------------------------------------------------------ */

/** gerador pseudoaleatório determinístico (mesma composição a cada carga) */
export function rng(seed = 7) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Amostra uma forma desenhada num canvas fora da tela em retícula regular. */
export function sample(
  w: number, h: number, spacing: number,
  draw: (c: CanvasRenderingContext2D) => void,
  size: (x: number, y: number) => number,
  red = 0,
): Target[] {
  const c = document.createElement('canvas');
  c.width = Math.ceil(w); c.height = Math.ceil(h);
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.fillStyle = '#000';
  draw(g);
  const data = g.getImageData(0, 0, c.width, c.height).data;
  const out: Target[] = [];
  for (let y = spacing / 2; y < h; y += spacing) {
    for (let x = spacing / 2; x < w; x += spacing) {
      const i = (Math.floor(y) * c.width + Math.floor(x)) * 4 + 3;
      if (data[i] > 128) out.push({ x, y, r: size(x, y), red });
    }
  }
  return out;
}

/** Disco com sombreamento de meio-tom (volume), como as figuras de pontos de tamanhos variados. */
export function sphere(cx: number, cy: number, R: number, sp: number, rMax: number, red = 0): Target[] {
  const out: Target[] = [];
  const lx = -0.45, ly = -0.55; // luz de cima à esquerda
  for (let y = -R; y <= R; y += sp * 0.866) {
    const row = Math.round((y + R) / (sp * 0.866));
    for (let x = -R + (row % 2 ? sp / 2 : 0); x <= R; x += sp) {
      const d2 = (x * x + y * y) / (R * R);
      if (d2 > 1) continue;
      const z = Math.sqrt(1 - d2);
      const lit = clamp((x / R) * lx + (y / R) * ly + z * 0.7);
      out.push({ x: cx + x, y: cy + y, r: rMax * (0.28 + 0.72 * (1 - lit)), red });
    }
  }
  return out;
}

/** Retângulo rotacionado preenchido por grade de pontos. */
export function bar(
  x0: number, y0: number, len: number, thick: number, angle: number, sp: number, r: number, red = 0,
): Target[] {
  const out: Target[] = [];
  const c = Math.cos(angle), s = Math.sin(angle);
  for (let v = sp / 2; v < thick; v += sp) {
    for (let u = sp / 2; u < len; u += sp) {
      out.push({ x: x0 + u * c - v * s, y: y0 + u * s + v * c, r, red });
    }
  }
  return out;
}

/** Figura humana simples (silhueta em pontos), em pé, pés em (x, y). Traçada com linhas grossas. */
export function person(x: number, y: number, hgt: number, sp: number, r: number, red = 0, lean = 0): Target[] {
  const u = hgt / 10, top = y - hgt;
  const pts = sample(x + hgt + 4, y + 4, sp, (g) => {
    g.save();
    g.translate(x, y); g.rotate(lean); g.translate(-x, -y);
    g.strokeStyle = '#000'; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.arc(x, top + u * 1.05, u * 1.05, 0, Math.PI * 2); g.fill(); // cabeça
    g.lineWidth = u * 1.9; // tronco
    g.beginPath(); g.moveTo(x, top + u * 3.0); g.lineTo(x + u * 0.15, top + u * 5.6); g.stroke();
    g.lineWidth = u * 0.85; // braços
    g.beginPath(); g.moveTo(x - u * 0.7, top + u * 2.9); g.lineTo(x - u * 1.5, top + u * 4.6); g.lineTo(x - u * 1.25, top + u * 6.0); g.stroke();
    g.beginPath(); g.moveTo(x + u * 0.7, top + u * 2.9); g.lineTo(x + u * 1.4, top + u * 4.5); g.lineTo(x + u * 1.9, top + u * 5.6); g.stroke();
    g.lineWidth = u * 1.0; // pernas, uma à frente
    g.beginPath(); g.moveTo(x - u * 0.35, top + u * 5.9); g.lineTo(x - u * 0.9, top + u * 7.9); g.lineTo(x - u * 1.1, y - u * 0.5); g.stroke();
    g.beginPath(); g.moveTo(x + u * 0.5, top + u * 5.9); g.lineTo(x + u * 1.0, top + u * 7.8); g.lineTo(x + u * 1.6, y - u * 0.5); g.stroke();
    g.restore();
  }, () => r, red);
  return pts.filter((p) => p.x > x - hgt && p.y > top - 4);
}

/** Pontos espalhados (estado "disperso"). */
export function scatter(x: number, y: number, w: number, h: number, n: number, rMin: number, rMax: number, seed = 3): Target[] {
  const rand = rng(seed);
  return Array.from({ length: n }, () => ({ x: x + rand() * w, y: y + rand() * h, r: rMin + rand() * (rMax - rMin) }));
}

/** Rótulos HTML (não rasterizados) que acompanham a arte. */
export function labelLayer(root: HTMLElement) {
  const spans = new Map<string, HTMLSpanElement>();
  return (list: { l: Label; a: number }[]) => {
    const seen = new Set<string>();
    for (const { l, a } of list) {
      let el = spans.get(l.text);
      if (!el) { el = document.createElement('span'); el.textContent = l.text; root.append(el); spans.set(l.text, el); }
      el.className = l.tone ?? 'muted';
      const shift = l.align === 'center' ? '-50%' : l.align === 'right' ? '-100%' : '0';
      el.style.transform = `translate(${l.x}px, ${l.y}px) translate(${shift}, -50%)`;
      el.style.opacity = String(Math.max(0, (a - 0.4) / 0.6));
      seen.add(l.text);
    }
    for (const [k, el] of spans) if (!seen.has(k)) el.style.opacity = '0';
  };
}
