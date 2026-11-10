/**
 * Linha do tempo do palco "Tradutor de transcrições" (0 → 4: ouvir, traduzir, revisar, consolidar).
 * Retorna setTime(t) — chamado pela rolagem (com suavização) ou de forma direta (movimento reduzido).
 */
import { gsap } from 'gsap';

export function initMermaid(svg: SVGSVGElement) {
  const q = <T extends Element = SVGElement>(s: string) => svg.querySelector<T>(s)!;
  const qa = (s: string) => [...svg.querySelectorAll<SVGElement>(s)];
  const NS = 'http://www.w3.org/2000/svg';

  // Dados de origem (falas → nós): espelham o frontmatter
  const CH = 8.4, LX = 40, LY0 = 96, LH = 30;
  const hl: [number, number][] = [[10, 24], [2, 31], [9, 33], [2, 38], [10, 29]];
  const targets: { id: string; src: number; x: number; y: number; w: number }[] = [
    { id: 'n1', src: 0, x: 40, y: 300, w: 250 },
    { id: 'n2', src: 1, x: 40, y: 362, w: 250 },
    { id: 'n3', src: 2, x: 40, y: 424, w: 250 },
    { id: 'n4', src: 3, x: 40, y: 486, w: 250 },
    { id: 'n5', src: 3, x: 330, y: 486, w: 200 },
    { id: 'n6', src: 4, x: 40, y: 548, w: 250 },
  ];

  // pontos que viajam da fala sublinhada até o contorno do nó
  const fly = q('[data-fly]');
  const dots: { el: SVGCircleElement; to: { x: number; y: number } }[] = [];
  targets.forEach((t) => {
    const per = 16;
    for (let k = 0; k < per; k++) {
      const c = document.createElementNS(NS, 'circle');
      const fx = LX + hl[t.src][0] * CH + ((hl[t.src][1] - hl[t.src][0]) * CH * k) / (per - 1);
      const fy = LY0 + t.src * LH + 6;
      c.setAttribute('cx', String(fx)); c.setAttribute('cy', String(fy)); c.setAttribute('r', '1.8');
      // destino: perímetro do retângulo
      const per2 = 2 * (t.w + 40), d = (per2 * k) / per;
      const to = d < t.w ? { x: t.x + d, y: t.y } : d < t.w + 40 ? { x: t.x + t.w, y: t.y + d - t.w } : d < 2 * t.w + 40 ? { x: t.x + t.w - (d - t.w - 40), y: t.y + 40 } : { x: t.x, y: t.y + 40 - (d - 2 * t.w - 40) };
      fly.append(c); dots.push({ el: c, to });
    }
  });

  // estado inicial (v1, antes da revisão)
  const shift = qa('[data-shift]');
  const setV1Label = (v2: boolean) => (q('[data-vlabel]').textContent = v2 ? 'V2 CONSOLIDADA' : 'V1 · GERADA PELO MODELO');

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  // 0 → ouvir: falas aparecem e os trechos são sublinhados
  tl.addLabel('s0');
  tl.fromTo(qa('.line text'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4 }, 0);
  tl.fromTo(qa('.line .hl'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.12, duration: 0.4 }, 0.3);
  tl.addLabel('s1', 1);
  // 1 → traduzir: pontos voam e formam os nós (contorno pontilhado), arestas se desenham
  const allNodes = qa('.node:not(.node-ins)');
  tl.set(fly, { opacity: 1 }, 's1');
  tl.fromTo(dots.map((d) => d.el), { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.002 }, 's1');
  dots.forEach((d, i) => tl.to(d.el, { attr: { cx: d.to.x, cy: d.to.y }, duration: 0.55, ease: 'power3.inOut' }, `s1+=${0.05 + (i % 16) * 0.008 + Math.floor(i / 16) * 0.05}`));
  tl.fromTo(allNodes.map((n) => n.querySelector('.dotted')), { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.04 }, 's1+=0.6');
  tl.fromTo(allNodes.map((n) => n.querySelector('text')), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.04 }, 's1+=0.65');
  tl.to(dots.map((d) => d.el), { opacity: 0, duration: 0.15 }, 's1+=0.75');
  tl.fromTo([q('[data-edge="n1-n2"]'), ...qa('[data-shift] .edge'), ...qa('[data-shift] .tiny')], { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.25, stagger: 0.05 }, 's1+=0.7');
  tl.fromTo(qa('.opp'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.08 }, 's1+=0.85');
  tl.fromTo(q('[data-opps]'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 's1+=0.9');
  tl.addLabel('s2', 2);
  // 2 → revisar: nota vermelha, o fluxo abre espaço e recebe a etapa que faltava
  tl.fromTo(q('[data-note]'), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.3 }, 's2');
  tl.fromTo(q('.note-link'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25 }, 's2+=0.3');
  tl.fromTo(shift, { y: -62 }, { y: 0, duration: 0.4 }, 's2+=0.35');
  tl.to(q('[data-edge="n1-n2"]'), { opacity: 0, duration: 0.1 }, 's2+=0.35');
  tl.fromTo(q('[data-node="nT"]'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 's2+=0.6');
  tl.fromTo([q('[data-edge="n1-nT"]'), q('[data-edge="nT-n2"]')], { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.2, stagger: 0.1 }, 's2+=0.7');
  tl.addLabel('s3', 3);
  // 3 → consolidar: contornos ficam sólidos, saída para o cliente
  tl.fromTo(qa('.node .solid'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.03 }, 's3');
  tl.to(qa('.node .dotted'), { opacity: 0, duration: 0.3 }, 's3+=0.1');
  tl.fromTo(q('[data-note-ok]'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 's3+=0.2');
  tl.fromTo(q('[data-out]'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 }, 's3+=0.3');
  tl.call(() => setV1Label(tl.time() >= 3.05), [], 's3+=0.05');
  tl.addLabel('end', 4);
  tl.to({}, { duration: 0.01 }, 4);

  // força a renderização de todos os estados iniciais (from) antes da primeira rolagem
  tl.progress(1).progress(0);
  const syncLabel = () => setV1Label(tl.time() >= 3.05);


  return {
    seek(t: number, smooth: boolean) {
      if (!smooth) { gsap.killTweensOf(tl); tl.time(t); syncLabel(); return; }
      gsap.to(tl, { time: t, duration: 0.5, ease: 'power2.out', overwrite: true, onUpdate: syncLabel });
    },
  };
}
