/**
 * Linha do tempo declarativa para os palcos (0 → 4, um trecho por passo).
 *  data-in="t"        aparece em t (opacidade + leve subida)
 *  data-out="t"       some em t
 *  data-draw="t"      traço desenhado em t (pathLength="1" + .st-draw)
 *  data-fly="t"       círculo voa de (data-fx, data-fy) até sua posição em t
 *  data-move="t:dx,dy" desloca o elemento em t
 */
import { gsap } from 'gsap';

export function buildStage(svg: SVGSVGElement) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  const all = <T extends SVGElement>(s: string) => [...svg.querySelectorAll<T>(s)];
  all('[data-in]').forEach((el) => {
    tl.fromTo(el, { opacity: 0, y: +(el.dataset.dy ?? 6) }, { opacity: 1, y: 0, duration: +(el.dataset.d ?? 0.28) }, +el.dataset.in!);
  });
  all('[data-draw]').forEach((el) => {
    tl.fromTo(el, { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: +(el.dataset.d ?? 0.3) }, +el.dataset.draw!);
  });
  all<SVGCircleElement>('[data-fly]').forEach((el) => {
    const x = el.getAttribute('cx')!, y = el.getAttribute('cy')!;
    const t = +el.dataset.fly!;
    tl.fromTo(el, { attr: { cx: el.dataset.fx, cy: el.dataset.fy }, opacity: 0 }, { attr: { cx: x, cy: y }, opacity: 1, duration: 0.45, ease: 'power3.inOut' }, t);
  });
  all('[data-move]').forEach((el) => {
    const [t, d] = el.dataset.move!.split(':');
    const [dx, dy] = d.split(',').map(Number);
    tl.to(el, { x: dx, y: dy, duration: 0.35 }, +t);
  });
  all('[data-out]').forEach((el) => tl.to(el, { opacity: 0, duration: 0.22 }, +el.dataset.out!));
  tl.to({}, { duration: 0.01 }, 4);
  tl.progress(1).progress(0);
  return {
    seek(t: number, smooth: boolean) {
      if (!smooth) { gsap.killTweensOf(tl); tl.time(t); return; }
      gsap.to(tl, { time: t, duration: 0.5, ease: 'power2.out', overwrite: true });
    },
  };
}
