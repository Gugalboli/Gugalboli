/**
 * Scrollytelling genérico: mapeia a passagem de uma lista de passos pela tela
 * para um progresso contínuo 0…n e um passo ativo. Funciona com a janela ou
 * com um contêiner rolável (o painel da entrega).
 */
export function scrolly(
  steps: HTMLElement[],
  scroller: HTMLElement | Window,
  on: (p: number, active: number) => void,
) {
  let raf = 0;
  const run = () => {
    raf = 0;
    const vh = innerHeight, line = vh * 0.72;
    const first = steps[0].getBoundingClientRect();
    const last = steps[steps.length - 1].getBoundingClientRect();
    const total = last.bottom - first.top;
    const p = Math.max(0, Math.min(1, (line - first.top) / total)) * steps.length;
    const active = line < first.top ? -1 : Math.min(steps.length - 1, Math.floor(p));
    on(p, active);
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(run); };
  scroller.addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  run();
  return { update: run, destroy: () => { scroller.removeEventListener('scroll', req); removeEventListener('resize', req); } };
}

export const reducedMotion = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('still');
