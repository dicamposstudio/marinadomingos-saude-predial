# Configuração — Landing “Vistoria de Imóvel em Recife”

## Página criada

URL definitiva:

`https://marinadomingos.com.br/vistoria-de-imovel-recife/`

Pasta correspondente no projeto:

`vistoria-de-imovel-recife/index.html`

Esta é uma página permanente, indexável e conectada ao restante do site. Ela não substitui as páginas específicas de imóvel novo, pré-compra, locação ou laudos.

## Uso no Google Ads

Utilizar como URL final do:

**Grupo 04 — Vistoria de Imóveis | Geral**

Consultas genéricas compatíveis:

- vistoria de imóvel em Recife;
- vistoria de apartamento;
- vistoriador de imóveis Recife;
- empresa de vistoria de imóveis;
- profissional para vistoria de imóvel.

Consultas claramente específicas devem continuar direcionadas às suas páginas próprias.

## Parâmetros recomendados

Com a codificação automática ativada no Google Ads, o `gclid` será incluído pelo Google. Para facilitar a leitura no GA4, pode-se usar este sufixo de URL final:

`utm_source=google&utm_medium=cpc&utm_campaign=vistoria_geral&utm_content={creative}&utm_term={keyword}`

A URL resultante será semelhante a:

`https://marinadomingos.com.br/vistoria-de-imovel-recife/?utm_source=google&utm_medium=cpc&utm_campaign=vistoria_geral&utm_content={creative}&utm_term={keyword}`

Não inclua uma segunda interrogação no sufixo configurado dentro do Google Ads.

## Rastreamento preparado

A página utiliza o contêiner `GTM-KW8Q4RNV` e os eventos já existentes:

- `click_form_start`: clique no CTA principal que leva ao formulário;
- `click_service`: escolha de uma página específica;
- `click_whatsapp`: clique direto no WhatsApp;
- `form_whatsapp_submit`: formulário concluído e abertura do WhatsApp;
- `click_cases`: acesso aos casos reais anonimizados.

Os eventos enviados pela página incluem, quando aplicável:

- `cta_location`;
- `service_name`;
- `page_type`;
- `page_path`;
- `traffic_source`;
- `campaign_name`;
- `property_type` no envio do formulário;
- `contact_channel`.

O formulário não envia bairro, observação, nome ou qualquer texto livre ao GA4. Essas informações são usadas somente para montar a mensagem que o próprio visitante confirma no WhatsApp.

## Identificação da origem do contato

Quando a página recebe `utm_source=google` ou `gclid`:

1. a origem é registrada como `google` nos eventos;
2. os parâmetros são preservados nos links internos do site;
3. os botões de WhatsApp acrescentam “Vim pelo Google” à mensagem;
4. o formulário também usa “Vim pelo Google” na mensagem final.

Assim, a origem continua identificável mesmo que o visitante abra uma página específica antes de entrar em contato.

## Conversões recomendadas

### Conversões principais

- `form_whatsapp_submit`;
- `click_whatsapp`, se o clique direto continuar sendo considerado lead no plano de mensuração.

### Microconversões

- `click_form_start`;
- `click_service`;
- `click_cases`.

Não configure todas as microconversões como conversões principais de otimização, pois isso pode fazer o Google Ads otimizar para navegação em vez de contatos.

## Teste depois da publicação

1. Abrir a URL com `?utm_source=google&utm_medium=cpc&utm_campaign=teste_landing`.
2. Confirmar no Tag Assistant que o contêiner está conectado.
3. Clicar no CTA principal e verificar `click_form_start`.
4. Preencher o formulário sem informar metragem e confirmar que ele continua válido.
5. Verificar se a mensagem abre no WhatsApp com tipo de serviço, imóvel, localização, data e a frase “Vim pelo Google”.
6. Abrir uma página específica por um dos cards e confirmar que os parâmetros permanecem na URL.
7. Conferir `form_whatsapp_submit` e `click_whatsapp` no DebugView do GA4.

## Após o commit

1. Aguarde o GitHub Pages concluir o deploy.
2. Abra a página em janela anônima e teste desktop e celular.
3. Inspecione a nova URL no Google Search Console e solicite indexação uma vez.
4. Reenvie o sitemap, caso o Search Console ainda não reconheça a nova URL.
5. Somente depois substitua a URL final do Grupo 04 no Google Ads.
