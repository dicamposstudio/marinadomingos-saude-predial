# Revisão — primeira etapa do site de autoridade

Status: **rascunho local, não publicado**.

Esta etapa transforma a página única em uma estrutura capaz de explicar serviços, demonstrar método e crescer organicamente. Antes de qualquer publicação, Marina deve revisar os pontos técnicos e comerciais abaixo.

## O que foi preparado

- Página de vistoria de recebimento de imóvel novo.
- Página de vistoria pré-compra de imóvel usado.
- Página de vistoria de locação (entrada ou saída).
- Página de laudos e manifestações patológicas.
- Página de casos reais, construída somente com sínteses anonimizadas.
- Novos links na página inicial e no rodapé.
- Dados estruturados `Service`, `BreadcrumbList`, `FAQPage`, `CollectionPage` e catálogo de serviços.
- Sitemap atualizado com as novas URLs.
- Mensagens de WhatsApp específicas por serviço.
- Eventos de métricas com contexto de página e serviço.

## Aprovações necessárias de Marina

### 1. Serviços e limites

- Confirmar que os quatro serviços são oferecidos exatamente como descritos.
- Validar todas as listas de itens que **podem** integrar cada inspeção.
- Confirmar a redação sobre testes hidráulicos e elétricos.
- Confirmar a distinção entre vistoria, avaliação imobiliária, análise jurídica, perícia, projeto e execução.
- Confirmar que a inclusão de RRT realmente varia conforme proposta e escopo.
- Verificar se há algum serviço que não deve ser divulgado neste momento.

### 2. Credenciais

- Confirmar o nome profissional: `Marina Domingos Fernandes`.
- Confirmar o registro: `CAU/PE A254051-7`.
- Redação aprovada para o site: `Especialista em Patologia das Construções`. Confirmar apenas se o título está documentalmente correto antes da publicação.

### 3. Atendimento e contato

- Confirmar o WhatsApp `(81) 99784-2480`.
- Confirmar atendimento em Recife e Região Metropolitana.
- Definir se outras cidades devem ser citadas nominalmente no futuro.

### 4. Casos reais

- Validar se Marina autoriza a publicação das três **sínteses genéricas**.
- Confirmar se a descrição dos métodos representa fielmente os trabalhos executados.
- Não inserir páginas, recortes ou fotografias dos laudos originais sem nova revisão de privacidade.

## Proteção aplicada aos trabalhos enviados

Os PDFs originais não foram incorporados ao projeto. A página pública proposta não contém:

- nomes de clientes, responsáveis, empresas, condomínios ou edifícios;
- endereços, números de unidade ou referências precisas de localização;
- CPF, CNPJ, telefones, assinaturas, QR codes ou outros documentos;
- datas exatas, áreas exatas ou combinações que possam identificar o imóvel;
- fotos de fachadas, letreiros, documentos ou ambientes reconhecíveis;
- nomes de arquivos, metadados ou campos internos dos PDFs.

Os quadros que lembram páginas de relatório foram desenhados em HTML e CSS com conteúdo fictício. Não são capturas dos documentos dos clientes.

## Métricas preparadas

O código existente do Google Tag Manager foi preservado. Os cliques passam a enviar:

- `click_whatsapp`: contato pelo WhatsApp;
- `click_service`: abertura de uma página de serviço;
- `click_cases`: abertura da página de casos;
- `cta_location`: posição da chamada na página;
- `service_name`: serviço relacionado;
- `page_type`: tipo da página;
- `page_path`: caminho acessado;
- `link_text`: texto resumido do link.

Depois da publicação, é recomendável conferir esses eventos no modo de visualização do GTM e no DebugView do GA4. Para usar parâmetros em relatórios personalizados, pode ser necessário cadastrá-los como dimensões personalizadas no GA4.

## Conferência antes de publicar

1. Abrir a página inicial e as cinco páginas novas no computador e no celular.
2. Ler todo o conteúdo com Marina e registrar correções no próprio arquivo ou em uma lista única.
3. Testar cada botão de WhatsApp e confirmar a mensagem recebida.
4. Validar títulos, textos de serviço, credenciais e área atendida.
5. Conferir contraste, tamanhos, menus, FAQ e navegação por teclado.
6. Depois da aprovação, fazer commit e push para a branch publicada pelo GitHub Pages.
7. Confirmar a publicação em `https://marinadomingos.com.br/`.
8. Testar o sitemap e solicitar indexação das novas páginas no Google Search Console.

## Próximas etapas recomendadas

1. Criar páginas específicas para vistoria cautelar de vizinhança e inspeção predial.
2. Integrar o núcleo de artigos educativos, conectando cada artigo ao serviço correspondente.
3. Produzir fotografias próprias de trabalho com autorização escrita e protocolo de anonimização.
4. Acrescentar depoimentos verificáveis somente com consentimento expresso.
5. Preparar política de privacidade e revisar a configuração de consentimento das ferramentas de métricas.
6. Acompanhar impressões, posições, cliques qualificados e conversões por serviço; ajustar conteúdo com dados reais.

Nenhuma estrutura de SEO torna uma posição no Google garantida. A vantagem sustentável vem da combinação de conteúdo útil, experiência verificável, bom desempenho técnico, reputação local e melhoria contínua baseada em dados.
