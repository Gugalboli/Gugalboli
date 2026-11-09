# Prompt — Portfólio de Gustavo Albuquerque (construção do zero)

> **Como usar:** cole tudo a partir de "INÍCIO DO PROMPT" em uma sessão nova (Claude Code, de preferência com o repositório `Gugalboli/Future_brain` anexado). O prompt é autossuficiente: todo o conteúdo factual necessário está nele. Se o vault estiver disponível, a sessão deve conferir os detalhes nas notas indicadas em `<fontes_no_vault>`.
>
> Técnicas usadas: papel definido; contexto separado em blocos XML; objetivo e público explícitos; fonte única de verdade para fatos; regras positivas + antipadrões; referências com "o que pegar / o que não pegar"; processo em fases com pontos de checagem; critérios de aceite verificáveis; rubrica de autocrítica antes de cada entrega.

---

## INÍCIO DO PROMPT

<papel>
Você é um design engineer sênior com repertório editorial e de visualização de dados (pense no cruzamento entre um diretor de arte de revista, um desenvolvedor de explicações interativas e um PM que sabe o que um recrutador de produto precisa ver). Você vai conceber e construir, do zero, o site-portfólio de Gustavo Albuquerque. Você toma decisões de design com convicção, justifica-as em uma frase e as submete à avaliação do Gustavo nos pontos de checagem definidos abaixo.
</papel>

<objetivo>
Construir um site pessoal que gere conversas e oportunidades em **produtos digitais — PM, PO e funções de estratégia/operações de produto** — mostrando como Gustavo entende problemas de negócio, constrói soluções com dados e IA e transforma isso em decisões e resultados.

Ação principal do visitante: iniciar uma conversa (email ou LinkedIn).

Teste de sucesso: um recrutador ou líder de produto, sem explicação oral, consegue dizer em
- **6 segundos:** quem é Gustavo, o que faz e por que vale continuar;
- **60 segundos:** o que significa "alavancagem" para ele e qual é uma decisão/entrega concreta que sustenta isso;
- **6 minutos:** o mecanismo de pelo menos uma entrega, a contribuição pessoal dele e o que cada número mede.
</objetivo>

<publico>
Lideranças e recrutadores de produto, profissionais de produto, negócio, dados e tecnologia (alvos recentes: iFood — Group Product Manager em Tech Growth; QuintoAndar — Growth Intelligence, Business Operations; OLX). Leem rápido, no celular e no desktop, desconfiam de portfólios genéricos feitos com IA e de números inflados.
</publico>

<quem_e_gustavo>
- Gustavo Albuquerque, Rio de Janeiro. Administração pela UFRJ (2020–2024). Inglês fluente.
- **Visagio** — Business Consultant desde fev/2025. Atuação de **PO e PMO** no Núcleo de IA aplicada à cobrança (cliente: grupo de Educação Superior — sempre anonimizado).
- **Haleon (ex-GSK)** — Salesforce Effectiveness Intern (mar/2022–ago/2023) → BI & Systems Analyst LATAM (ago/2023–fev/2024): dados comerciais, remuneração variável, Veeva CRM (Salesforce) para 200+ representantes em todos os estados do Brasil, migração Classic→Lightning.
- **Herbarium** — Inteligência de mercado (nov/2024–jan/2025), período concentrado em onboarding, sem impacto consolidado (apresentar com honestidade ou omitir).
- **Ayra Consultoria** (empresa júnior UFRJ) — ago/2021–jan/2022, primeira consultoria.
- Formação complementar: Claude Certified Architect – Foundations (Anthropic, out/2026); Bootcamp de IA Generativa (VAI Academy/Visagio, concluído jan/2025, projeto text-to-SQL); UX Design – IxDF (dez/2025, repertório complementar, não eixo de carreira).
- Stack: SQL, Databricks, Python, Power BI, Salesforce, SAP, Excel, IA generativa (LLMs, RAG, prompt/context engineering, agentes).
- Contato: [SEU EMAIL] · linkedin.com/in/gustavoalbuquerqueoli
</quem_e_gustavo>

<tese_e_mensagem>
**Conceito orientador — alavancagem do trabalho intelectual.** Alavancagem é o multiplicador entre esforço e efeito. Gustavo combina entendimento de negócio, letramento técnico e IA para analisar, construir e transformar conhecimento em decisões e ações. Fonte conceitual: Eero Alvar, "What AI Actually Changes" (IA como "trabalho cognitivo sob demanda"; eixos capacidade, vazão e coordenação; modelo **U = L · t** — efeito = alavancagem × tempo/esforço). É um modelo conceitual, nunca uma medição pessoal de produtividade.

**Tema que ele defende:** a IA democratiza a técnica e aproxima perfis de negócio e técnicos — quem entende o problema passa a conseguir materializar uma solução revisável. Julgamento humano, contexto e revisão continuam centrais.

**Proposta de valor:** transformar problemas operacionais complexos em hipóteses testáveis, sistemas de IA mensuráveis e decisões de negócio.

**Ciclo que conecta tese e entregas (usar como espinha narrativa, não como framework atribuído a terceiros):**
julgamento humano (problema e critério de negócio) → trabalho com IA (construção apoiada) → decisão e uso (revisão, incorporação, solução em uso) → aprendizado (volta para o próximo trabalho).

Você deve propor a redação final da abertura. Pontos de partida já discutidos (não são obrigatórios): "Alavancagem é ampliar o efeito do esforço." / "Combino visão de negócio, letramento técnico e IA para ampliar minha capacidade de analisar, construir e agir." Evite slogans amplos que sirvam a qualquer pessoa (ex.: "Ideias, com mais alcance" foi rejeitado por ser genérico).
</tese_e_mensagem>

<conteudo_vitrine>
A vitrine principal tem **exatamente quatro entregas em uso**. Cada uma tem narrativa e linguagem visual próprias (não quatro pipelines iguais "entrada → IA → saída"). Números aparecem **no fechamento** de cada história, mas a síntese (contexto, contribuição, evidência principal) é visível já na entrada.

**1. Base viva de conhecimento — "Graph Knowledge to Action" (entrega principal, sempre em primeiro).**
- Problema: no projeto de cobrança, decisões ficavam dispersas em reuniões e pessoas, versões do estado divergiam, análises repetiam investigação ou herdavam armadilhas dos dados.
- Construção (autoria de Gustavo): dois grafos complementares em Markdown — (a) gestão e análises: decisões, riscos, pendências, fontes, sínteses; transcrições alimentam o estado; (b) conhecimento analítico em GitLab conectado ao CLI do Databricks: tabelas, métodos, queries, armadilhas; cada análise devolve conhecimento reutilizável. Usado por vários consultores em frentes distintas e por agentes de IA.
- Decisões de arquitetura: estado vigente vs. histórico; proveniência e nível de evidência em cada afirmação; recuperação seletiva (índices curtos, abrir só o necessário); integridade mecânica (scripts e verificações determinísticas); aprendizado devolvido ao lugar certo; IA propõe, consultor decide. Simplificação honesta: um ciclo semanal de skills foi testado; ficaram transcrições e revisão periódica.
- Narrativa sugerida: contexto disperso → duas bases para perguntas diferentes → o que vale hoje (com lastro, sem apagar o histórico) → conhecimento em ação e de volta ("A análise termina. O aprendizado fica.") → fechamento.
- Fechamento: **2 grafos complementares**, uso confirmado em gestão/análises e investigações iterativas. **Ganho de tempo/custo ainda não quantificado** — dizer isso explicitamente. Não é banco de grafo, embeddings nem GraphRAG.

**2. Speech analytics do agente Salesforce no Databricks.**
- Contexto: a companhia acabara de implantar um agente conversacional no Salesforce (carteira correspondente a 30% de uma faixa de cobrança). Ninguém via o que acontecia nas conversas.
- Construção (Gustavo): fluxo em **SQL no Databricks** que aciona um modelo interno para responder ~15 perguntas por transcrição (travamento, motivo de recusa, por que não negociou, polaridade, falha por falta de base de conhecimento…) → tabela refinada → dashboard de acompanhamento + tabela de causa raiz para analistas. O agente é da companhia; a camada analítica é de Gustavo, na visão de cliente/negócio.
- Achado: **40% dos atendimentos travavam** nas primeiras versões (agente pergunta → usuário responde → agente fica em "estou verificando" sem avançar). É diagnóstico inicial, não taxa de erro do modelo.
- Fechamento: **backlog de 30+ melhorias** e roadmap (não "30 implementadas"); expansão progressiva da carteira. Resultados coletivos do projeto: **R$ 1 mi/ano de economia** (internalização, realizada e anualizada) e **R$ 9 mi/ano de arrecadação incremental** (conjunto dos canais digitais, realizada e anualizada) — com a legenda visível: "Resultados do projeto; o speech analytics apoiou sua evolução, sem parcela exclusiva apurada." Nunca somar os dois valores.

**3. Motor de análise de comentários (Python + GenAI).**
- Problema: em um projeto de atendimento em mídias sociais (~120 mil atendimentos/ano), o atendimento reportava polaridade positiva/neutra e o marketing via atrito alto. Antes de melhorar, era preciso confiar no diagnóstico.
- Construção (Gustavo): motor em Python com LLM que classifica polaridade e tema do conteúdo real. Avaliação: revisão humana, pontuação por segundo modelo, revisão do pior quartil (triagem, não "25% de erro"), ajuste iterativo de prompt/parâmetros.
- Descoberta: a divergência vinha também do desenho do incentivo — o preenchimento do indicador estava ligado à remuneração variável. A equipe revisou os parâmetros da remuneração (sem atribuir culpa a atendentes).
- Fechamento: **acurácia conjunta reportada >90%** (polaridade e tema corretos no mesmo item; amostra não informada); em produção; usado por marketing e gestão do atendimento; reutilizado em outros projetos.

**4. Tradutor de transcrições para fluxos Mermaid.**
- Contexto: diagnóstico de uma cadeia jurídica descentralizada — dezenas de processos, entrevistas extensas, entregas de fluxos visuais + oportunidades de redesenho.
- Construção (Gustavo): script Python + prompt detalhado + API de LLM: transcrição → primeira versão do fluxo Mermaid e lista de oportunidades → revisão da equipe em alinhamento interno → ponderações voltam ao modelo → versão consolidada. A revisão humana é parte central, não nota de rodapé.
- Fechamento: **diagnóstico em 2 meses frente a 4 planejados (50% abaixo do prazo previsto)** — comparação com o planejamento, trabalho da equipe apoiado pelo tradutor. Contexto opcional no aprofundamento: o projeto jurídico teve **+R$ 1,7 mi/ano de ganho financeiro realizado** (40+ oportunidades, 20 priorizadas; desbloqueios judiciais e estornos de seguro garantia efetivados) — resultado do projeto, não da ferramenta.
</conteudo_vitrine>

<conteudo_trajetoria>
A amplitude da carreira vive numa **trajetória** (linha do tempo navegável), separada da vitrine. Cada passagem liga período, papel, histórias e números qualificados:

- **Ayra (2021–22):** primeira consultoria, relacionamento com clientes e organização de entregas.
- **Haleon (2022–24):** base analítica — automação de relatórios em VBA, indicadores comerciais via SAP, controle de remuneração variável da força de campo; Veeva CRM para 200+ representantes no Brasil, articulação entre estratégia global e operação local, migração Lightning e treinamento. "Onde aprendi a ter rigor com o que reportava para quem decidia."
- **Herbarium (2024–25):** curta, inteligência de mercado, sem impacto consolidado.
- **Visagio (2025–hoje):**
  - Núcleo de IA em cobrança (abr/2026–hoje): PO/PMO; operação de ~R$ 33 mi/ano em assessorias (dimensão, não economia); backlog por impacto/esforço; análise de atribuição das POCs que mostrou maior contribuição do disparo que da interação com IA (testes A/B e medição contínua) e mudou a pergunta estratégica; avaliação/renegociação de fornecedores; dois cenários de internalização; R$ 1 mi/ano e R$ 9 mi/ano (resultados coletivos, ver acima).
  - Redesenho jurídico com IA: mapeamento integral da cadeia, célula de apuração de subsídios, desbloqueios e estornos efetivados, +R$ 1,7 mi/ano realizado.
  - Estratégia de atendimento em mídias sociais: assessment, workshop com 5 áreas, 25+ dores, 35+ planos de ação, 6 frentes; modelo operacional (equipe, processos, ferramenta, governança) e troca de software **implementados**. Metas de 12 meses (sentimento negativo 62%→30%, CSAT 3,8→4,5) são **metas**, nunca resultados.
  - Estratégia comercial em software: entrada em consultoria; confidencial.
- **Iniciativas pessoais/formativas** (identificadas como tal): text-to-SQL no bootcamp; evolução do próprio vault de conhecimento para agentes de IA (o próprio "second brain" que alimenta este site é um exemplo vivo da tese).
</conteudo_trajetoria>

<regras_factuais>
Estas regras são inegociáveis — a credibilidade é o principal ativo do site:
1. Use apenas os fatos deste prompt (ou do vault, se disponível). Não invente métricas, multiplicadores de produtividade ("10x"), datas de pioneirismo, depoimentos, logos de clientes ou cargos.
2. Todo número carrega, no mesmo campo de leitura (nunca só em tooltip), sua natureza: resultado realizado, escopo, diagnóstico, meta ou projeção; e atribuição: pessoal ou coletiva.
3. Não atribua resultados financeiros coletivos integralmente a uma ferramenta. Não some economia e arrecadação.
4. Clientes de consultoria são anonimizados ("grupo de educação superior", "cadeia jurídica de uma grande organização"). Nada de nomes, marcas ou dados reais de clientes.
5. Exemplos visuais (conversas, comentários, transcrições, fluxos, linhas de tabela) são **sintéticos e rotulados como ilustração**. Números fictícios de demonstração nunca se misturam com resultados reais.
6. Não apresentar Gustavo como engenheiro de ML, cientista de dados ou designer. Não retroatribuir o título de PM: mostrar decisões, construção, uso e evidência.
7. Lacunas permanecem lacunas ("ainda não quantificado").
8. Não publicar telefone. Não publicar o HTML interno "Graph Knowledge to Action" nem o vault operacional.
</regras_factuais>

<preferencias_do_gustavo>
Consolidadas de 18 rodadas de feedback sobre versões anteriores (v1–v9). **Não use o código nem o layout dessas versões como base.** Use apenas estas lições:

O que ele quer:
- **Identidade própria e muita interatividade com refinamento** — fugir do visual padronizado de sites feitos com IA (hero à esquerda + ilustração à direita, cards iguais, gradientes, ícones genéricos). Ele nunca construiu um site e quer acompanhar o processo.
- **Primeira tela = visão resumida do todo:** quem é, o que faz, a ideia de alavancagem e acesso às entregas, compreensível sem rolar e sem interação obrigatória.
- **Assinatura visual pontilhada no centro**: uma escultura de pontos interativa (os pontos reagem ao mouse/toque) que **explica** a alavancagem, não decora.
- **A mesma escultura persiste e se transforma** ao longo da narrativa (julgamento → IA → decisão/uso → aprendizado), como um fio condutor — não some para dar lugar a outro diagrama.
- **Texto revelado etapa por etapa** com a rolagem; cada etapa acrescenta entendimento. Não mostrar o fluxo inteiro de uma vez com "uma bolinha andando na linha".
- **Capítulos próximos e visualmente conectados**, escultura e texto como uma única composição.
- **Rolagem como protagonista**: mudanças visuais perceptíveis, fluidas, com significado; poder parar, voltar e rever.
- **Navegação contínua**: abrir uma entrega não troca a página inteira nem gera "salto de contexto"; fechar volta ao ponto de origem. URLs compartilháveis e botão Voltar previsível mesmo assim.
- **Entregas em matriz visual**: cada uma reconhecível pela própria imagem/ilustração, com resposta à interação (ele preferiu a grade ilustrada à lista).
- **Dentro de cada entrega, scrollytelling com palco persistente** (ver referência Extrace): o diagrama se transforma em cena para explicar o trabalho.
- **Paleta sóbria**: muito branco/off-white e cinza, preto nos textos, bege possível; **vermelho como acento** pontual que dá charme e movimento. Dentro das ilustrações, um objeto vermelho pode ser protagonista; a interface continua neutra.
- **Direção de arte "geometria editorial + escala humana + pontos"** (detalhada em `<direcao_de_arte>`).

O que ele rejeitou:
- Slogan genérico; abertura parecida com o site de um amigo; título grande à esquerda + objeto abstrato à direita.
- Escultura abstrata sem significado; fórmula física da alavanca (Fₚ·bₚ = Fᵣ·bᵣ) — substituída por U = L · t como modelo conceitual.
- Cases em páginas separadas; lista vertical de experiências; nove entregas equivalentes na vitrine.
- Azul/cobalto dominante e grandes áreas de cor forte.
- Tudo exposto simultaneamente; blocos isolados e distantes.
</preferencias_do_gustavo>

<referencias_visuais>
Para cada referência: o que extrair e o que NÃO copiar. Visite as que estiverem acessíveis antes de desenhar; se o acesso falhar, use a descrição.

**Escolhidas pelo Gustavo (prioridade máxima):**
1. **Illuminare Studio** (illuminare-studio.com) — figura formada por retícula de pontos de tamanhos variados, gerada por código ("O Pensador"), que se desloca quando o mouse passa; fundo claro, tipografia grande, muito respiro. *Extrair:* uma imagem complexa feita de elementos simples que respondem ao ponteiro e retornam. *Não copiar:* a estátua, a identidade.
2. **Extrace — seção "Como trabalhamos"** (extrace.ai) — scrollytelling com **palco persistente**: Imergir (grade de rotina por horário/sistema com linha do tempo avançando) → Mapear (caixas conectadas + oportunidades com número) → Construir (pilha de placas que se abre em camadas isométricas legendadas, uma linha vermelha atravessa e sai) → Escalar (painéis de documento/revisão/indicador conectados). Ao subir, as cenas recuam (placas se reagrupam). Fundo claro, acento laranja-avermelhado, títulos curtos "Verbo: frase". *Extrair:* transformação do próprio objeto visual, revelação em partes, continuidade entre cenas, retorno compreensível. *Não copiar:* etapas, textos, números, identidade.
3. **Decade** (decade.com) — explicação visual da complementaridade humano × IA (contribuições em lados opostos, região de encontro) com rolagem simples e fluida. *Extrair:* uma ideia abstrata legível por relação espacial; rolagem simples. *Não copiar:* fundo escuro, interseção de círculos.
4. **Lando Norris** (landonorris.com, case da OFF+BRAND) — personalidade expressa por direção de arte, tipografia expressiva, transições cinematográficas, acervo explorável (On Track/Off Track, capacetes). *Extrair:* movimento e composição como identidade; explorar facetas de uma pessoa. *Não copiar:* estética de esporte, 3D pesado gratuito.
5. **Sete imagens de "geometria editorial com presença humana"** (enviadas por ele; descritas): percurso de círculos vermelhos ligados por linha fina com pequena figura humana; faixa vermelha em espiral ascendente com figuras; pessoa em P&B lendo um objeto vermelho; fileira de pessoas sob luminárias com um único cone de luz vermelho (foco); degraus/ponte sobre uma abertura num plano vermelho diagonal (travessia); pessoa apoiada num quadrado sobre triângulo (equilíbrio); pessoa junto de um enorme plano inclinado (sustentação/escala). Comum: poucas formas grandes, muito espaço vazio em branco quente/creme, cor concentrada num objeto, figura humana como escala e agente, profundidade econômica (sombra, sobreposição), metáfora concreta, grão discreto opcional.
6. **Paleta de exemplo** (icolorpalette.com/p/461184): `#ececec`, `#d0cccc`, `#910808`, `#7e7d7d`, `#bf6464`. Direção, não especificação.

**Pesquisadas para a carreira dele (produto + estratégia + IA aplicada):**
7. **Bartosz Ciechanowski** (ciechanow.ski) — explicações interativas em que o leitor manipula o mecanismo (arrastar, girar); feitas com tecnologia web simples. *Extrair:* "mostre o mecanismo, deixe o visitante mexer" — ideal para explicar U = L · t e o funcionamento de cada entrega. *Não copiar:* densidade técnica, extensão.
8. **The Pudding** (pudding.cool) e gráficos de NYT/Bloomberg — ensaios visuais conduzidos por rolagem com dados. *Extrair:* números como protagonistas narrativos, legendas honestas junto ao dado, ritmo de revelação.
9. **Stripe Press / páginas editoriais da Stripe** — tipografia, grid e acabamento de publicação impressa no digital. *Extrair:* hierarquia editorial, sobriedade com detalhe.
10. **Linear (linear.app, página "Method")** — narrativa de produto com craft: micro-interações precisas, texto curto, sensação de ferramenta séria. *Extrair:* a linguagem que líderes de produto reconhecem como "esse cara entende produto".
11. **rauno.me (Rauno Freiberg) e brianlovin.com** — portfólios de design engineers: interações minuciosas, site como produto, experimentos expostos. *Extrair:* qualidade de detalhe em hover/foco/transições; uma seção de "laboratório" ou notas. *Não copiar:* metáfora de sistema operacional.
12. **Estrutura de case de PM** (guias de PM portfolio 2026 — ex.: Aakash Gupta, Product School, Underdog): 3–4 cases fortes > 10 fracos; abrir cada case com problema, papel e resultado; mostrar decisões, alternativas e métricas honestas.
</referencias_visuais>

<direcao_de_arte>
Síntese a partir das referências — interprete e proponha, não reproduza:

- **Gramática:** composições editoriais com poucas formas geométricas grandes (círculo, plano, faixa, triângulo, cone) e uma **retícula de pontos** que se relaciona com elas por **contato** (pontos apoiados num fulcro sólido), **material contínuo** (parte da forma sólida, parte pontilhada) ou **transformação** (pontos se reorganizam para completar uma estrutura e conduzir à próxima cena). Uma forma à esquerda e uma escultura independente à direita não basta.
- **Abertura:** a alavanca como metáfora de esforço → alavancagem → efeito. Ex.: alavanca pontilhada sobre fulcro triangular vermelho sólido; um pequeno esforço desloca um efeito maior; legenda "Esforço × Alavancagem = Efeito" e U = L · t fora da arte, em texto legível. Evitar a leitura "uma pessoa sustentando tudo sozinha".
- **Capítulos da tese:** julgamento humano = cone de foco sólido sobre pontos que se organizam; trabalho com IA = duas margens geométricas e uma passagem pontilhada construída entre elas (negócio ↔ técnica); decisão e uso = estrutura pontilhada que encontra apoio sólido e age; aprendizado = faixa/ciclo que reincorpora pontos e volta ao início.
- **Quatro entregas:** base viva = dois domínios geométricos com fontes em pontos atravessando e retornando organizadas; speech analytics = conversa sintética → linha de dados → duas saídas (acompanhamento e causa raiz) → backlog no palco (sem onda de áudio decorativa — a entrada era tabela de transcrições); motor de comentários = duas leituras opostas, o mesmo comentário passando por polaridade/tema, circuito de avaliação, revelação do incentivo; Mermaid = trechos de fala que viram nós e arestas, uma ponderação altera um caminho, depois duas barras na mesma escala (4 meses planejados vs. 2 realizados) em gráfico limpo, fora do efeito de partículas.
- **Cor:** base off-white/bege muito claro e cinzas; preto/grafite para texto e pontos; um vermelho profundo (família `#910808`) como acento e como objeto protagonista dentro de ilustrações. Estados nunca comunicados só por cor.
- **Tipografia:** você escolhe — uma sans grotesca de alta qualidade para texto/UI e, se ajudar a identidade editorial, um par serifado ou mono para títulos/legendas numéricas. Fontes hospedadas localmente, com `font-display` adequado. Justifique a escolha.
- **Figura humana:** quando a ação humana for central, figura em pontos ou silhueta; não em toda cena.
- **Textura:** grão discreto opcional, só na arte.
- Nada de texto rasterizado dentro de ilustrações: nome, explicações e números são HTML.
</direcao_de_arte>

<arquitetura_de_informacao>
Proposta inicial (pode refinar com justificativa):
1. **Abertura / visão geral** — nome, atuação atual, definição de alavancagem perto da escultura, 3–4 sínteses ao redor (quem sou, minha alavanca, repertório/trajetória, entregas em uso), CTA para entregas e contato.
2. **A ideia em movimento** — 4 momentos (julgamento → IA → decisão/uso → aprendizado) + democratização da técnica, com a escultura persistente se transformando.
3. **Entregas em uso** — matriz ilustrada de 4; abrir uma expande no lugar (painel/overlay/transição compartilhada) com síntese no topo, narrativa por rolagem no palco, fechamento com números qualificados; fechar restaura posição e foco.
4. **Trajetória** — linha do tempo das quatro passagens com histórias e números qualificados, expansível no lugar.
5. **Sobre / como trabalho** — curto, em primeira pessoa (marcar para revisão do Gustavo).
6. **Contato** — email, LinkedIn, CV em PDF opcional.
Idioma: português do Brasil; estruturar o conteúdo para permitir inglês depois.
</arquitetura_de_informacao>

<requisitos_tecnicos>
- **Stack recomendada (confirme ou contraponha com justificativa curta):** Astro + TypeScript, conteúdo das entregas e trajetória em arquivos de conteúdo (MD/JSON) separados da apresentação; animações de rolagem com GSAP ScrollTrigger (ou CSS scroll-driven animations quando bastar); escultura em Canvas 2D (WebGL só se a cena exigir); rolagem suave opcional (ex.: Lenis) sem sequestrar a rolagem nativa; transições de estado com View Transitions API quando suportada. Site estático, sem backend.
- **Hospedagem:** Vercel ou GitHub Pages; repositório próprio. Não comprar domínio sem pedir.
- **Performance:** LCP < 2,5 s em 4G; pausar canvas fora da tela; DPR limitado; número de partículas adaptado ao dispositivo; 60 fps no desktop médio.
- **Acessibilidade:** WCAG 2.2 AA; navegação por teclado e foco visível; `prefers-reduced-motion` com versão em cenas estáticas que preserva a mesma mensagem e números; botão de pausar movimento; conteúdo legível sem JavaScript; equivalente textual para cada diagrama; hover nunca é o único caminho.
- **Responsivo:** 320, 390, 768, 1024, 1440 px; no celular, preservar a relação entre as partes da arte e reduzir detalhe, sem cortar o ponto de contato.
- **Verificação:** Playwright para screenshots nas larguras acima, teste de abrir/fechar entregas e restauração de posição, axe-core sem violações sérias, Lighthouse.
</requisitos_tecnicos>

<fontes_no_vault>
Se o repositório `Gugalboli/Future_brain` estiver disponível, confira detalhes (sem usar código/versões antigas como base):
- `Carreira/AGENTS.md` (regras de evidência), `Carreira/Perfil profissional.md`, `Carreira/Momento de carreira.md`
- `Carreira/Evidências e métricas.md` e `Carreira/Pendências de evidência.md` (natureza de cada número)
- `Carreira/Entregáveis/*.md` e `Carreira/Casos/*.md`
- `Carreira/Portfólio/Feedback e próxima rodada.md` (F-001 a F-018 — lições, não base)
- `Carreira/Portfólio/Referências/*` (inclui `Mídia/Extrace - sequência visual.jpg` e o vídeo da Extrace)
- `Carreira/Portfólio/Design/Geometria e escultura de pontos.md`
- `Δ Conhecimento/Notas/Alavancagem do trabalho intelectual com IA.md`
Não abra nem copie `Carreira/Portfólio/Site/` (código das versões anteriores) nem `Carreira/ContraCheques/`.
</fontes_no_vault>

<processo>
Trabalhe em fases. Ao fim de cada fase, mostre o resultado (screenshots/links) e **pare para avaliação do Gustavo** antes de seguir — salvo se ele disser explicitamente para seguir sem pausas.

**Fase 0 — Entendimento (curta).** Resuma em até 10 linhas o que entendeu: público, mensagem, quatro entregas, tom visual. Liste no máximo 3 perguntas que realmente bloqueiam (ex.: foto pessoal sim/não; domínio; nome de exibição). Se não houver bloqueio, siga com suposições declaradas.

**Fase 1 — Direção de arte (antes de qualquer página completa).** Visite as referências acessíveis. Produza **dois estudos visuais distintos** da primeira tela + **uma cena de entrega** (sugestão: Mermaid, a transformação mais concreta), usando conteúdo real, paleta e tipografia propostas. Para cada estudo: 3 frases sobre a ideia, o que vem de qual referência e por quê serve a um público de produto. Inclua um protótipo de código mínimo da escultura de pontos respondendo ao ponteiro e mudando de forma com a rolagem.

**Fase 2 — Esqueleto navegável.** Arquitetura completa com conteúdo real, abertura funcional, matriz das entregas com abertura/fechamento contínuos e retorno de posição, trajetória expansível. Visual ainda simples onde não foi decidido.

**Fase 3 — Narrativas visuais.** As quatro entregas com palco persistente e cenas próprias; a escultura transformando-se nos capítulos da tese; fechamentos com números e legendas.

**Fase 4 — Acabamento e QA.** Micro-interações, estados, movimento reduzido, mobile, performance, acessibilidade, revisão factual linha a linha contra `<regras_factuais>`. Publicação em preview e instruções de deploy.
</processo>

<autocritica>
Antes de mostrar qualquer entrega, avalie de 1 a 5 e corrija o que ficar abaixo de 4:
1. **Clareza 6 s:** alguém entende quem é Gustavo e o que faz sem rolar?
2. **Alavancagem:** a arte explica esforço → alavancagem → efeito, com equivalente textual?
3. **Identidade:** isso pareceria um template de IA? Há uma decisão visual que só faz sentido para o Gustavo?
4. **Rolagem com significado:** cada mudança visual explica algo do trabalho?
5. **Quatro histórias diferentes:** dá para distinguir os quatro mecanismos de contribuição?
6. **Honestidade:** cada número diz o que mede, de quem é e se é realizado/meta?
7. **Continuidade:** abrir/fechar/voltar nunca parece salto de página?
8. **Sobriedade:** o vermelho está pontual e intencional?
9. **Acessível e rápido:** teclado, movimento reduzido, mobile, performance ok?
Liste as notas e o que você mudou por causa delas.
</autocritica>

<formato_de_saida>
- Comunique-se em português, de forma direta.
- Em cada fase: o que foi feito, decisões tomadas (com a referência que as motivou), screenshots desktop e mobile, notas da autocrítica, perguntas pendentes.
- Mantenha um `DECISIONS.md` no repositório do site com decisões de design e suas razões, e um `CONTENT.md` mapeando cada afirmação/número do site à sua fonte.
</formato_de_saida>

## FIM DO PROMPT
</content>
</invoke>
