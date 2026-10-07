# Relatório de SEO e métricas — 7 de outubro de 2026

Este documento registra a linha de base usada nesta revisão, as alterações
feitas no site e o que deve ser acompanhado depois da publicação.

## 1. Linha de base

### Google Search Console

Período exportado: 31 de agosto a 4 de outubro de 2026.

| Indicador | Resultado |
| --- | ---: |
| Cliques | 7 |
| Impressões | 170 |
| CTR | 4,12% |
| Posição média global | 11,67 |
| Impressões no Brasil | 150 |
| Posição média no Brasil | 12,68 |

A posição global é favorecida por impressões fora do mercado prioritário. Para
o negócio local, a referência mais útil é a posição média de 12,68 no Brasil,
sempre analisada junto com impressões, cliques e páginas de destino.

Páginas com melhor oportunidade:

| Página | Cliques | Impressões | CTR | Posição média |
| --- | ---: | ---: | ---: | ---: |
| Página inicial | 5 | 104 | 4,81% | 3,86 |
| Checklist de apartamento novo | 1 | 36 | 2,78% | 32,69 |
| Vistoria de imóvel novo | 0 | 27 | 0% | 11,15 |
| Vistoria pré-compra | 0 | 16 | 0% | 6,19 |
| Casos reais | 0 | 16 | 0% | 8,56 |
| Vistoria de locação | 0 | 9 | 0% | 14,56 |

Leitura: a página inicial já concentra os resultados e não precisava de uma
reescrita ampla. Pré-compra e casos reais estão próximos da primeira página. A
página de imóvel novo está na transição entre a primeira e a segunda página. O
checklist já recebe impressões, mas ainda não responde com profundidade
suficiente às consultas que o acionam.

### Google Analytics 4

Período exibido: 9 de setembro a 6 de outubro de 2026.

| Canal | Sessões | Sessões engajadas | Taxa de engajamento | Tempo médio | Eventos por sessão |
| --- | ---: | ---: | ---: | ---: | ---: |
| Total | 103 | 45 | 43,69% | 24 s | 4,83 |
| Direto | 60 | 26 | 43,33% | 27 s | 4,58 |
| Pesquisa paga | 15 | 0 | 0% | 0 s | 3,00 |
| Pesquisa orgânica | 12 | 8 | 66,67% | 38 s | 6,17 |
| Social orgânico | 8 | 4 | 50% | 7 s | 3,75 |
| Referência | 8 | 7 | 87,50% | 44 s | 9,25 |

A pesquisa orgânica ainda tem pouco volume, mas apresenta a melhor combinação
entre engajamento e potencial de crescimento controlável. Os 15 registros de
pesquisa paga no GA4 não combinam com apenas 1 clique no Google Ads. Antes de
comparar campanhas, é necessário revisar atribuição, UTMs, tráfego interno e a
configuração da tag.

### Google Ads

Período exibido: 7 de setembro a 6 de outubro de 2026.

| Indicador | Resultado |
| --- | ---: |
| Impressões | 94 |
| Cliques | 1 |
| CTR | 1,06% |
| CPC médio | R$ 1,41 |
| Custo | R$ 1,41 |
| Conversões | 0 |

O volume ainda é insuficiente para avaliar a capacidade de conversão do site ou
da campanha. O painel também indica que o acompanhamento de conversões não foi
concluído. A prioridade é corrigir a mensuração antes de aumentar orçamento.

## 2. Alterações aplicadas nesta revisão

- Títulos, descrições e H1 das páginas de imóvel novo, pré-compra, locação e
  casos reais foram alinhados às intenções de busca observadas.
- A expressão **apartamento novo** foi incorporada sem retirar **imóvel novo**,
  preservando a abrangência semântica da página.
- As páginas de serviço passaram a apontar para seus artigos mais relevantes,
  criando links internos nos dois sentidos.
- O checklist de vistoria foi ampliado por ambiente, com listas práticas para
  sala, quartos, cozinha, área de serviço, banheiros, varanda e documentos.
- O checklist recebeu um botão de impressão, uma data de atualização visível e
  `dateModified` atualizado nos dados estruturados.
- O sitemap registra 7 de outubro de 2026 apenas nas páginas efetivamente
  alteradas.
- A página inicial foi preservada, pois já é a URL com melhor desempenho.

## 3. Ações após a revisão e publicação

1. Revisar o conteúdo técnico e a apresentação no computador e no celular.
2. Fazer commit e push somente depois da aprovação.
3. No Search Console, inspecionar e solicitar indexação destas URLs:
   - `/vistoria-imovel-novo-recife/`
   - `/vistoria-pre-compra-recife/`
   - `/vistoria-locacao-recife/`
   - `/casos-reais/`
   - `/blog/checklist-vistoria-apartamento-novo/`
4. Conferir se o sitemap continua processado. Não é necessário reenviá-lo
   diariamente.
5. Concluir no Google Ads a verificação do anunciante e a configuração de
   conversões descrita em `CONFIGURACAO-GTM-EVENTOS.md`.
6. Não aumentar o orçamento da campanha com base em apenas um clique.

## 4. Como medir o efeito

Compare um período completo de 28 dias após a publicação com os 28 dias
anteriores. Acompanhe:

- impressões, cliques, CTR e posição por página no Search Console;
- consultas contendo `vistoria`, `apartamento novo`, `pré-compra`, `locação` e
  `Recife`;
- sessões orgânicas engajadas e tempo de engajamento no GA4;
- eventos `click_whatsapp` e `form_whatsapp_submit` por página e serviço;
- conversões do Google Ads somente depois da configuração e validação.

Com apenas 170 impressões e 7 cliques, variações diárias não sustentam decisões.
Use ciclos de 28 dias e observe tendência por página. A meta inicial é aumentar
impressões qualificadas e levar as páginas de serviço que estão entre as
posições 6 e 15 para resultados mais consistentes na primeira página.

## 5. Limites da análise

- O Search Console oculta parte das consultas por privacidade. As consultas
  visíveis somam menos impressões que o total do período.
- GA4 e Google Ads usam modelos, escopos e janelas diferentes. Os números não
  devem ser somados como se representassem as mesmas visitas.
- O site ainda tem pouco volume. As conclusões orientam testes e prioridades,
  não garantem posição ou conversão.
