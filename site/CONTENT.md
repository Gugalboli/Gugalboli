# Mapa de conteúdo → fonte

Cada afirmação ou número publicado e de onde vem. Fontes: o prompt v10 (`prompt-portfolio-v10.md`) e o vault (`Future_brain/Carreira/...`). Números não foram verificados de forma independente; a natureza vem de `Evidências e métricas.md`.

## Abertura (`src/content/abertura.pt.json`)

| Afirmação | Fonte | Natureza / cuidado |
| --- | --- | --- |
| Business Consultant na Visagio; PO e PMO no núcleo de IA aplicada à cobrança | prompt, `<quem_e_gustavo>` | Cargo real; não retroatribui o título de PM |
| Rio de Janeiro; Administração UFRJ | prompt | — |
| "Consultor na Visagio desde 2025; antes, BI e sistemas comerciais na Haleon (ex-GSK)" | prompt | — |
| "Alavancagem é ampliar o efeito do esforço." | prompt, `<tese_e_mensagem>`; vault F-016 | Ponto de partida aprovado como orientação |
| Proposta de valor ("Transformo problemas operacionais complexos…") | prompt, `<tese_e_mensagem>` | — |
| U = L · t; legenda | prompt; vault F-016 (captura da palestra de Eero Alvar) | **Modelo conceitual**, dito explicitamente; não é medida pessoal |
| Ayra → Haleon → Herbarium → Visagio | prompt, `<conteudo_trajetoria>` | — |
| Quatro entregas em uso (nomes) | prompt, `<conteudo_vitrine>` | — |
| Capítulos (julgamento → IA → decisão → aprendizado) | prompt, ciclo da tese | Espinha narrativa própria, não atribuída a terceiros |
| "A IA propõe; quem decide é o time." | prompt (base viva: "IA propõe, consultor decide") | — |
| Email, LinkedIn | prompt | Sem telefone |

## Entrega — Tradutor de transcrições (`src/content/entregas/mermaid.pt.json`)

| Afirmação | Fonte | Natureza / cuidado |
| --- | --- | --- |
| Cadeia jurídica descentralizada, dezenas de processos, entrevistas extensas, fluxos + oportunidades | prompt; `Entregáveis/Entregável - Tradutor de transcrições para fluxos Mermaid.md` | Cliente anonimizado ("grande organização") |
| Script Python + prompt detalhado + API de LLM; criado por Gustavo | mesma nota ("Contribuição relatada") | Contribuição pessoal; revisão da equipe |
| Fluxo: transcrição → 1ª versão → alinhamento interno → ponderações voltam ao modelo → versão consolidada | mesma nota, "Funcionamento" | — |
| "Duas etapas em vez de cinco" | mesma nota, tabela "Como a rotina foi encurtada" (5 linhas planejadas → 2 etapas descritas por Gustavo) | Descrição da rotina, não medição |
| **2 meses frente a 4 planejados (50% abaixo do prazo previsto)** | `Evidências e métricas.md` | **Realizado; comparação com o planejamento; trabalho da equipe apoiado pelo tradutor.** Sem horas individuais nem comparação controlada — dito no site |
| +R$ 1,7 mi/ano; 40+ oportunidades; 20 priorizadas; desbloqueios e estornos efetivados | `Evidências e métricas.md` (confirmação de 13/10/2026) | **Realizado; resultado do projeto, não da ferramenta; coletivo** — rotulado assim, fora do gráfico principal |
| Falas, nós, oportunidades e ponderação no palco | criados para a ilustração | **Sintéticos**, rotulados "◇ Ilustração sintética" no próprio palco |

## Entregas — base viva, speech analytics, motor de comentários

| Afirmação | Fonte | Natureza / cuidado |
| --- | --- | --- |
| Problema da base viva (decisões dispersas, versões divergentes, investigação repetida) | prompt; `Entregável - Base viva…` | — |
| Dois grafos (gestão/análises; analítico em GitLab + CLI Databricks), usados por vários consultores e por agentes | prompt; mesma nota e complemento de 22/10/2026 | **Em uso; autoria pessoal** |
| Decisões de arquitetura (estado vigente vs. histórico, proveniência, recuperação seletiva, integridade mecânica, aprendizado devolvido, IA propõe/consultor decide) | prompt; mesma nota | — |
| Ciclo semanal de skills testado e abandonado | prompt; mesma nota | Simplificação honesta |
| **Ganho de tempo/custo não quantificado** | prompt; `Evidências e métricas.md` | **Lacuna declarada** na página |
| Não é banco de grafo / embeddings / GraphRAG | prompt; mesma nota | — |
| Agente no Salesforce, carteira de 30% de uma faixa de cobrança | prompt; `Evidências e métricas.md` | Contexto; não é 30% de toda a carteira |
| ~15 perguntas por transcrição; SQL no Databricks + modelo interno; dashboard + tabela de causa raiz | prompt; idem | Estrutura confirmada; o agente é da companhia |
| **40% dos atendimentos travavam** nas primeiras versões | prompt; idem | **Diagnóstico inicial**, não taxa de erro do modelo |
| **30+ melhorias** no backlog e roadmap | prompt; idem | **Backlog**, não "30 implementadas" |
| **R$ 1 mi/ano** de economia; **R$ 9 mi/ano** de arrecadação incremental | prompt; idem | **Realizados, anualizados, coletivos**; legenda "Resultados do projeto; o speech analytics apoiou sua evolução, sem parcela exclusiva apurada" visível; aviso de não somar |
| ~120 mil atendimentos/ano em mídias sociais | prompt; `Evidências e métricas.md` | **Escopo** do projeto, não volume do motor |
| Polaridade/tema por LLM; revisão humana, segundo modelo, pior quartil, ajuste iterativo | prompt; `Entregável - Motor de análise…` | Pior quartil = triagem, dito na página |
| Divergência ligada ao incentivo; remuneração variável revista | prompt; idem | Sem culpa a atendentes |
| **>90% de acurácia conjunta** | prompt; idem | **Reportado; amostra não informada** |
| Em produção; usado por marketing e gestão do atendimento; reutilizado | prompt; idem | Qualitativo |
| Exemplo "estou verificando" | prompt | Descrição do padrão de travamento, não transcrição real |

## Trajetória (`src/content/trajetoria.pt.json`)

| Afirmação | Fonte | Natureza / cuidado |
| --- | --- | --- |
| Períodos e papéis (Ayra, Haleon, Herbarium, Visagio) | prompt, `<quem_e_gustavo>` | — |
| ~R$ 33 mi/ano em assessorias | prompt; `Evidências e métricas.md` | **Escopo** (dimensão), não economia |
| Atribuição das POCs (disparo > interação com IA; A/B, medição contínua) | prompt | Coletivo |
| R$ 1 mi/ano; R$ 9 mi/ano | ver acima | Realizado, anualizado, coletivo; aviso de não somar |
| 40+ oportunidades / 20 priorizadas; +R$ 1,7 mi/ano | prompt; `Evidências e métricas.md` | Escopo / **realizado**, coletivo |
| 5 áreas, 25+ dores, 35+ planos, 6 frentes | prompt | **Escopo** |
| Modelo operacional e troca de software implementados | prompt; idem | **Implementado** |
| 62%→30% sentimento negativo; CSAT 3,8→4,5 | prompt; idem | **Metas** de 12 meses, rotuladas "meta · não é resultado" |
| 200+ representantes em todos os estados | prompt; idem | **Escopo** (alcance) |
| VBA | prompt; idem | Qualitativo, sem horas medidas |
| Herbarium "sem impacto consolidado" | prompt | Apresentado com honestidade |
| Formação, certificações, iniciativas pessoais, ferramentas | prompt | Bootcamp e IxDF identificados como formativos/complementares |

## Sobre (rascunho)

Texto em primeira pessoa escrito a partir de `<tese_e_mensagem>` e do perfil do prompt. **Marcado na página como rascunho para revisão do Gustavo.**

## Não publicado (de propósito)

- HTML interno "Graph Knowledge to Action", vault operacional, `Carreira/Portfólio/Site/`, `Carreira/ContraCheques/`: não abertos nem usados.
- Telefone; nomes de clientes; "7 implementadas" do caso jurídico (não pedido no prompt para o site).
