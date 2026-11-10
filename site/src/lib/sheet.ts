/**
 * Painel de entrega aberto no lugar.
 * - O cartão é um link real para /entregas/<slug>/ (funciona sem JS e é compartilhável).
 * - Com JS: abre um <dialog> modal sobre a página, com transição compartilhada da ilustração
 *   (View Transitions API quando disponível), e grava a URL com pushState.
 * - Fechar (botão, Esc ou Voltar) devolve exatamente a posição de rolagem e o foco ao cartão.
 */
import { scrolly, reducedMotion } from './scrolly';
import { initMermaid } from './mermaid-stage';

interface Hooks { onOpen?: () => void; onClose?: () => void }

export function initSheet(h: Hooks = {}) {
  const sheet = document.querySelector<HTMLDialogElement>('[data-sheet]')!;
  const base = (document.querySelector<HTMLAnchorElement>('[data-close]')!.getAttribute('href') || '/#entregas').replace(/\/?#entregas$/, '');
  const panels = new Map([...sheet.querySelectorAll<HTMLElement>('[data-panel]')].map((p) => [p.dataset.panel!, p]));
  const order = [...panels.keys()];
  const count = sheet.querySelector<HTMLElement>('[data-count]')!;
  const inited = new Set<string>();
  let current: string | null = null;
  let opener: HTMLElement | null = null;
  let pushedByUs = false;
  let savedY = 0;

  const slugFromPath = (path = location.pathname) => {
    const m = path.match(/\/entregas\/([^/]+)\/?$/);
    return m && panels.has(m[1]) ? m[1] : null;
  };
  const urlFor = (slug: string) => `${base}/entregas/${slug}/`;
  const cardArt = (slug: string) => document.querySelector<HTMLElement>(`[data-card-art="${slug}"]`);
  const panelArt = (slug: string) => panels.get(slug)!.querySelector<HTMLElement>('[data-vt-art], [data-stage-wrap]');
  const canVT = () => 'startViewTransition' in document && !reducedMotion();

  function show(slug: string) {
    panels.forEach((p, k) => (p.hidden = k !== slug));
    sheet.setAttribute('aria-labelledby', `t-${slug}`);
    count.textContent = `0${order.indexOf(slug) + 1} / 0${order.length}`;
    sheet.scrollTop = 0;
    current = slug;
    initPanel(slug);
  }

  function initPanel(slug: string) {
    const panel = panels.get(slug)!;
    const steps = [...panel.querySelectorAll<HTMLElement>('[data-pstep]')];
    if (inited.has(slug) || !steps.length) { requestAnimationFrame(() => sheet.dispatchEvent(new Event('scroll'))); return; }
    inited.add(slug);
    const mm = panel.querySelector<SVGSVGElement>('[data-stage]');
    const stage = mm ? initMermaid(mm) : null;
    const art = panel.querySelector<HTMLElement>('[data-art-steps]');
    scrolly(steps, sheet, (p, active) => {
      if (panel.hidden) return;
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
      if (art) art.dataset.step = String(active);
      if (stage) stage.seek(reducedMotion() ? (active < 0 ? 0 : active + 1) : p, !reducedMotion());
    });
  }

  function lock(on: boolean) {
    document.documentElement.classList.toggle('sheet-open', on);
    if (on) { h.onOpen?.(); } else { h.onClose?.(); }
  }

  function open(slug: string, opts: { push: boolean; from?: HTMLElement | null }) {
    if (current === slug && sheet.open) return;
    opener = opts.from ?? opener;
    savedY = scrollY;
    const doOpen = () => {
      show(slug);
      if (!sheet.open) sheet.showModal();
      lock(true);
      sheet.focus({ preventScroll: true });
    };
    const ca = cardArt(slug);
    if (canVT() && ca && !sheet.open) {
      ca.style.viewTransitionName = 'entrega-art';
      (document as any).startViewTransition(() => {
        ca.style.viewTransitionName = '';
        doOpen();
        const pa = panelArt(slug); if (pa) pa.style.viewTransitionName = 'entrega-art';
      }).finished.finally(() => { const pa = panelArt(slug); if (pa) pa.style.viewTransitionName = ''; });
    } else {
      if (!sheet.open && !reducedMotion()) { sheet.classList.add('is-entering'); setTimeout(() => sheet.classList.remove('is-entering'), 500); }
      doOpen();
    }
    if (opts.push) { history.pushState({ entrega: slug }, '', urlFor(slug)); pushedByUs = true; }
  }

  function close(opts: { fromPop: boolean }) {
    if (!sheet.open) return;
    const slug = current!;
    const finish = () => {
      sheet.close();
      lock(false);
      current = null;
      window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
      const target = opener && document.contains(opener) ? opener : document.querySelector<HTMLElement>(`[data-open="${slug}"]`);
      target?.focus({ preventScroll: true });
    };
    const pa = panelArt(slug), ca = cardArt(slug);
    if (canVT() && pa && ca && sheet.scrollTop < innerHeight) {
      pa.style.viewTransitionName = 'entrega-art';
      (document as any).startViewTransition(() => {
        pa.style.viewTransitionName = '';
        finish();
        ca.style.viewTransitionName = 'entrega-art';
      }).finished.finally(() => { ca.style.viewTransitionName = ''; });
    } else finish();
    if (!opts.fromPop) {
      if (pushedByUs) { pushedByUs = false; history.back(); } // a entrada que criamos sai do histórico
      else history.replaceState({}, '', `${base}/#entregas`); // chegou direto pela URL da entrega
    }
  }

  // cartões e links para entregas
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-open], [data-goto], [data-close]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (a.hasAttribute('data-close')) return close({ fromPop: false });
    if (a.dataset.goto) {
      // trocar de entrega dentro do painel: substitui a URL, sem empilhar histórico
      show(a.dataset.goto);
      history.replaceState({ entrega: a.dataset.goto }, '', urlFor(a.dataset.goto));
      sheet.focus({ preventScroll: true });
      return;
    }
    open(a.dataset.open!, { push: true, from: a.closest('.card-link') ?? a });
  });
  sheet.addEventListener('cancel', (e) => { e.preventDefault(); close({ fromPop: false }); });

  addEventListener('popstate', () => {
    const slug = slugFromPath();
    if (slug) { pushedByUs = false; open(slug, { push: false, from: document.querySelector(`[data-open="${slug}"]`) }); }
    else { pushedByUs = false; close({ fromPop: true }); }
  });

  // chegada direta em /entregas/<slug>/: o HTML já vem com o painel aberto (não modal);
  // reabrimos como modal e deixamos a página de trás posicionada nas entregas.
  const initial = slugFromPath();
  if (initial) {
    if (sheet.open) sheet.close();
    const grid = document.getElementById('entregas');
    if (grid) window.scrollTo({ top: grid.offsetTop, behavior: 'instant' as ScrollBehavior });
    savedY = scrollY;
    opener = document.querySelector(`[data-open="${initial}"]`);
    show(initial); sheet.showModal(); lock(true); sheet.focus({ preventScroll: true });
    history.replaceState({ entrega: initial }, '', location.href);
  }
}
