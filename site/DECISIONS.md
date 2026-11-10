# Decisões de design — portfólio Gustavo Albuquerque

Registro vivo. Cada decisão tem a razão e a referência que a motivou. Estado: **Fase 2 (esqueleto navegável), aguardando avaliação do Gustavo.** Fase 1 aprovada como mistura A+B, sem foto.

## Fase 0 — suposições declaradas (sem bloqueio)

- **S-01 Sem foto pessoal** nesta fase. A figura humana aparece como silhueta em pontos (escala e agência), o que evita o clichê "foto + headline". Pode entrar depois, se o Gustavo quiser.
- **S-02 Nome de exibição:** "Gustavo Albuquerque".
- **S-03 Sem domínio próprio** até o Gustavo decidir; build estático pronto para Vercel ou GitHub Pages (`SITE_BASE` permite subpasta).
- **S-04 Referências externas não acessíveis daqui** (o proxy do ambiente bloqueou illuminare-studio.com, extrace.ai, decade.com, ciechanow.ski, linear.app). Usei as descrições do prompt e as notas do vault, incluindo a prancha de 12 quadros da Extrace (`Referências/Mídia/Extrace - sequência visual.jpg`).

## Stack

- **D-01 Astro + TypeScript, site estático.** Conteúdo em JSON (`src/content/*.pt.json`), separado da apresentação, com sufixo de idioma para permitir inglês depois.
- **D-02 Escultura em Canvas 2D próprio (`src/lib/dots.ts`), sem WebGL.** ~1.700 pontos no desktop e ~900 no celular cabem com folga em 60 fps; a cena não precisa de volume real. O loop para quando os pontos se acomodam, quando o canvas sai da tela e quando a aba fica oculta. DPR limitado a 2.
- **D-03 GSAP ScrollTrigger só onde há linha do tempo com muitos elementos (cena de entrega).** Na abertura, a rolagem é lida diretamente (um `scroll` com rAF) porque basta um número de progresso. Sem Lenis: a rolagem nativa não é sequestrada.

## Visual

- **D-04 Paleta.** `--paper #f5f2ed` (off-white quente), `--paper-2 #ece8e1`, `--stone #dcd6cd` (formas neutras na arte), `--ink #1b1918`, `--ink-2 #4d4a47`, `--ink-3 #6b6763`, `--red #910808`, `--red-soft #bf6464` (só decoração). Derivada da paleta de referência (#ececec, #d0cccc, #910808, #7e7d7d, #bf6464), aquecida para o bege das sete imagens de geometria editorial. Todos os pares de texto passam AA (verificado com axe).
- **D-05 Tipografia, hospedada localmente (Fontsource, `font-display: swap`).**
  - *Schibsted Grotesk* para texto e interface: grotesca desenhada para um grupo de mídia escandinavo; tem a neutralidade de uma sans de interface com um traço editorial, sem o "cheiro de template" de Inter.
  - *Newsreader* (óptica variável) para títulos e para a fórmula: serifa de leitura em tela, dá a camada de revista (Stripe Press).
  - *IBM Plex Mono* para rótulos, legendas e **natureza dos números** ("realizado · equipe"): o mono marca o que é metadado/verificação, como em gráficos do NYT.
- **D-06 Vermelho com papel semântico fixo: o julgamento humano.** No estudo A, o triângulo vermelho sólido é o fulcro (o apoio que define o efeito) e persiste em todos os capítulos: vira cone de foco (julgamento), pilar sob a passagem (trabalho com IA), base da decisão, seta do ciclo (aprendizado). Os pontos são o que se constrói sobre ele. Na cena de entrega, o vermelho é a ponderação da equipe e as oportunidades. A interface fica neutra; o vermelho só aparece em links ativos, no foco do teclado e em selos "realizado". *Referência: sete imagens (cor concentrada num objeto protagonista) + paleta sóbria.*
- **D-07 Gramática geometria × pontos por contato, material contínuo e transformação.** Alavanca de pontos *apoiada* num fulcro sólido (contato); nós do fluxo com contorno pontilhado que fica sólido na versão consolidada (material contínuo); a mesma nuvem de pontos se reorganiza entre capítulos (transformação). *Referência: nota "Geometria e escultura de pontos" (F-018).*
- **D-08 Pontos de tamanhos variados para dar volume (meio-tom).** A esfera do "efeito" é sombreada por tamanho de ponto, não por cor. *Referência: Illuminare.*
- **D-09 Ponteiro empurra, mola devolve; rolagem transforma.** O ponteiro é resposta local e discreta; o significado vem da rolagem e do controle explícito. Hover nunca é o único caminho.
- **D-10 Interação que explica (estudo A): mover o apoio.** O visitante arrasta o fulcro (ou usa o controle deslizante acessível): a figura (esforço, t) não muda; a esfera (efeito, U) cresce com a alavancagem (L). Leitura em texto ao vivo (`aria-live`). *Referência: Ciechanowski — deixe mexer no mecanismo.* U = L · t fica sempre em HTML, com a legenda "modelo conceitual, não medida da minha produtividade".
- **D-11 Transformação com patamares.** Cada estado da escultura fica parado e legível antes da próxima mudança; a transição acontece enquanto o texto do próximo capítulo sobe de 85% a 30% da tela. Os pontos se movem com um escalonamento da esquerda para a direita (lê como reorganização, não como fade). *Referência: Extrace (palco persistente; ao subir, recua).*
- **D-12 Indicador de etapa.** Trilho "00–04" no canto do palco mostra o capítulo atual (ponto vermelho) e permite pular. *Atende F-017: perceber a ideia contínua e a etapa atual.*
- **D-13 Cena de entrega: números fora do palco.** O palco conta o mecanismo (fala → pontos → nós → ponderação → versão consolidada). O número vai para um gráfico limpo depois, com as duas barras na mesma escala, eixo visível e os selos de natureza ao lado. *Referência: The Pudding/NYT; regra factual 2.*
- **D-14 Síntese da entrega no topo.** Contexto, contribuição e evidência principal visíveis já na entrada; números qualificados no fechamento. *Referência: estrutura de case de PM.*

## Acessibilidade e movimento

- **D-15 Movimento reduzido = mesmas cenas, estáticas.** Com `prefers-reduced-motion` ou o botão "Pausar movimento" (fixo, com preferência salva), a escultura salta para o estado do capítulo, sem interpolação nem resposta ao ponteiro; a cena de entrega mostra o estado final de cada passo.
- **D-16 Equivalentes textuais.** O canvas tem `role="img"` com descrição atualizada por capítulo; o SVG da entrega tem `<title>`/`<desc>`; rótulos da arte são HTML (nada rasterizado).

## Em aberto (para a Fase 2)

- Escolha entre A e B (ou combinação: o mecanismo de A com a hierarquia editorial de B).
- Celular, cena de entrega: o texto do passo ainda passa por cima da metade inferior do palco durante a rolagem; proposta: texto do passo em "folha" fixa na base da tela.
- Versão sem JavaScript da arte da abertura (SVG estático equivalente).
- Grão discreto na arte: ainda não aplicado.

## Fase 2 — esqueleto navegável

- **D-17 Abertura = mecanismo do A + hierarquia editorial do B (decisão do Gustavo).** Do B: faixa de identidade (nome · atuação · cidade) com fio preto, definição grande em serifa com a proposta de valor e os CTAs ao lado, índice numerado 01–04 das sínteses na base. Do A: a alavanca de pontos no centro e a mesma escultura persistindo pelos capítulos.
- **D-18 L passa a ser o repertório, não um controle abstrato.** O controle deslizante do A foi trocado pelos três botões do B (Negócio, Técnica, IA): cada camada ativa aproxima o apoio do efeito e a esfera cresce, sem a figura mudar. Arrastar o apoio no desenho continua funcionando. A legenda t / L / U fica em HTML, em três colunas sob a arte.
- **D-19 A arte se posiciona pela caixa do layout.** A página mede a área reservada (`[data-art-box]`) e passa centro e escala para a cena, para a alavanca nunca colidir com o texto, de 320 a 1440 px.
- **D-20 Entregas abrem no lugar, num `<dialog>` modal de tela cheia.** Cada cartão é um link real para `/entregas/<slug>/` (página estática gerada para cada entrega, que já vem com o painel aberto — compartilhável e legível sem JS). Com JS: `pushState`, transição compartilhada da ilustração (View Transitions API quando houver; senão, fade curto; nada com movimento reduzido), página de trás parada. Fechar (botão, Esc, Voltar) restaura a rolagem exata e devolve o foco ao cartão. Trocar de entrega dentro do painel usa `replaceState`, para o Voltar não virar um carrossel. *Atende "navegação contínua" e "botão Voltar previsível".*
- **D-21 Painel: síntese → palco → fechamento.** Topo com contexto, contribuição e evidência principal (com selos). Meio com palco persistente e passos revelados por rolagem (o tradutor já tem a cena animada; as outras três usam a ilustração do cartão, revelada por camadas, até a Fase 3). Fechamento com números grandes e selos de natureza na mesma linha; resultados coletivos numa caixa própria com a legenda obrigatória e o aviso de não somar; lacuna declarada com fio vermelho.
- **D-22 No celular, o texto do passo vira uma folha presa à base da tela** (sticky), só a do passo ativo visível. Resolve a sobreposição apontada na Fase 1.
- **D-23 Matriz 2×2 com ilustração própria por entrega.** Base viva: dois domínios e pontos que atravessam e voltam; speech analytics: conversa com reticências vermelhas (o travamento) → tabela → duas saídas; comentários: duas leituras opostas, circuito de avaliação, ligação vermelha ao incentivo; tradutor: falas → nós, nota vermelha. No hover/foco, as partes se deslocam.
- **D-24 Trajetória = régua 2021–2026 + passagens expansíveis no lugar** (botões com `aria-expanded`, Visagio aberta por padrão). Cada frente liga período, papel, cliente anonimizado, itens com número e selo, e links para as entregas relacionadas, que abrem o painel.
- **D-25 Barra superior aparece só depois da abertura**, para não competir com a primeira tela.
- **D-26 Estudos da Fase 1 preservados em `/estudos/`.**

## Em aberto (para a Fase 3)

- Palcos próprios de base viva, speech analytics e comentários (hoje: ilustração revelada por camadas, com legenda dizendo isso).
- Arte da abertura sem JS (SVG estático) e grão discreto.
- Texto do "Sobre" é rascunho, marcado na página para revisão do Gustavo.
