# Configuração dos eventos no Google Tag Manager

O site já envia ao `dataLayer` o contexto de cada clique no WhatsApp e de cada
formulário que abre o WhatsApp. Falta apenas informar ao GTM quais parâmetros
devem acompanhar os eventos enviados ao GA4.

## 1. Criar variáveis da camada de dados

No Google Tag Manager, abra **Variáveis → Nova → Variável da camada de dados**.
Use a **Versão 2** e crie estas variáveis:

| Nome da variável no GTM | Nome da variável da camada de dados |
| --- | --- |
| DLV - cta_location | `cta_location` |
| DLV - service_name | `service_name` |
| DLV - page_type | `page_type` |
| DLV - page_path | `page_path` |
| DLV - link_text | `link_text` |
| DLV - contact_channel | `contact_channel` |

## 2. Completar a tag do evento `click_whatsapp`

1. Abra **Tags → GA4 - Evento - click_whatsapp**.
2. Mantenha o nome do evento como `click_whatsapp`.
3. Em **Parâmetros do evento**, adicione:

| Parâmetro | Valor |
| --- | --- |
| `cta_location` | `{{DLV - cta_location}}` |
| `service_name` | `{{DLV - service_name}}` |
| `page_type` | `{{DLV - page_type}}` |
| `page_path` | `{{DLV - page_path}}` |
| `link_text` | `{{DLV - link_text}}` |
| `contact_channel` | `{{DLV - contact_channel}}` |

O acionador deve continuar sendo o evento personalizado `click_whatsapp`.

## 3. Completar a tag do formulário

Abra a tag que envia `form_whatsapp_submit` e adicione os mesmos parâmetros,
exceto `link_text`, que não é usado no envio do formulário:

- `cta_location` → `{{DLV - cta_location}}`
- `service_name` → `{{DLV - service_name}}`
- `page_type` → `{{DLV - page_type}}`
- `page_path` → `{{DLV - page_path}}`
- `contact_channel` → `{{DLV - contact_channel}}`

O acionador deve ser o evento personalizado `form_whatsapp_submit`.

## 4. Configurar o evento opcional `print_checklist`

O artigo de checklist agora possui um botão de impressão. Ao clicar, o site
envia `print_checklist` ao `dataLayer`, com `page_type` e `page_path`.

Para medir esse uso no GA4:

1. Crie um acionador de **Evento personalizado** com o nome
   `print_checklist`.
2. Crie uma tag de evento do GA4 com o mesmo nome.
3. Adicione `page_type` e `page_path` usando as variáveis já criadas.

Esse evento indica uso do conteúdo, não pedido de orçamento. Portanto, não o
marque como evento principal nem como conversão no Google Ads.

## 5. Testar antes de publicar

1. Clique em **Visualizar** no GTM e conecte `https://marinadomingos.com.br/`.
2. Teste pelo menos um botão no cabeçalho, um no menu móvel, um no conteúdo, o
   botão flutuante e o telefone do rodapé.
3. No Tag Assistant, selecione cada evento `click_whatsapp` e confirme que a tag
   do GA4 disparou uma vez e que os seis parâmetros têm valor.
4. Envie um formulário de orçamento e confirme o evento
   `form_whatsapp_submit`, sem nome, localização ou metragem na camada de dados.
5. No **DebugView** do GA4, confirme a chegada dos dois eventos.
6. Estando tudo correto, publique o contêiner com um nome como
   `Mensuração de WhatsApp por página e serviço`.

7. No artigo de checklist, clique em **Imprimir este checklist** e confirme o
   disparo de `print_checklist`, caso a tag opcional tenha sido criada.

## 6. Criar dimensões personalizadas no GA4

Em **Administrador → Definições personalizadas → Criar dimensão personalizada**,
crie dimensões com escopo **Evento** para:

- `cta_location` — nome sugerido: **Posição do CTA**;
- `service_name` — nome sugerido: **Serviço de interesse**;
- `page_type` — nome sugerido: **Tipo de página**;
- `link_text` — nome sugerido: **Texto do link**;
- `contact_channel` — nome sugerido: **Canal de contato**.

O `page_path` pode ser analisado pelas dimensões nativas de caminho da página do
GA4; não é necessário criar uma dimensão personalizada duplicada.

As definições personalizadas não recuperam dados anteriores à criação. Depois
da publicação, aguarde até 24–48 horas para usá-las nos relatórios comuns; o
DebugView deve mostrar os eventos durante o teste.

## 7. Conversões no Google Ads — configuração verificada em outubro/2026

As contas do GA4 e Google Ads da Marina já estão vinculadas. Não crie novamente
essas ações: evite duplicar eventos ou alterar a otimização sem validar os dados.

| Evento GA4 | Ação no Google Ads | Otimização |
| --- | --- | --- |
| `form_whatsapp_submit` | Marina - Solicitação de orçamento | **Principal** |
| `click_whatsapp` | Marina - Clique no WhatsApp | **Secundária (observação)** |

A campanha de Pesquisa usa metas específicas, incluindo **Solicitar cotações**
e **Leads de chamada**, e atualmente tem estratégia **Maximizar cliques**.
Não altere as metas ou o método de lances apenas para eliminar avisos.

**Interpretação:** `click_whatsapp` é um clique em link para o WhatsApp e
`form_whatsapp_submit` é o envio válido do formulário que **abre o WhatsApp
com a mensagem pronta**. Nenhum dos dois comprova que a mensagem foi de fato
enviada, recebida ou convertida em contratação. Confirme os contatos reais
com Marina. Como os dois tipos de eventos podem ocorrer em jornadas diferentes,
não some os números como se fossem leads únicos.

Em outubro/2026, o GA4 recebeu eventos, mas isso não garante atribuição aos
anúncios do Google Ads. Sempre compare períodos iguais, origem `google / cpc`
e a ação exata importada antes de diagnosticar uma falha.

## 8. Proteger os relatórios de testes técnicos

O GA4 recebeu sessões de `tagassistant.google.com / referral` e da campanha
`teste_landing`. Isso pode distorcer os relatórios comerciais. Para evitar
que os testes futuros entrem nos relatórios:

1. No GA4, abra **Administrador → Coleta e modificação de dados →
   Filtros de dados → Criar filtro**.
2. Selecione **Tráfego do desenvolvedor** e **Excluir**, com status **Em teste**.
3. Execute testes no **Tag Assistant / DebugView** e confirme os eventos na
   dimensão **Nome do filtro de dados de teste**.
4. Somente depois de validar que o filtro identifica exclusivamente as
   sessões técnicas, considere ativá-lo. A exclusão ativa é **irreversível**
   para dados futuros filtrados; ela não limpa dados históricos.
5. Nunca desative o modo de depuração nas tags de visitantes reais apenas
   para esconder o aviso, nem exclua todo o tráfego `referral`.

Documentação oficial: https://support.google.com/analytics/answer/13296662?hl=pt-BR

O projeto usa `GTM-KW8Q4RNV` no site e fluxo GA4 `G-D8V5E2HHHS`.
Qualquer nova tag ou dimensão personalizada requer revisão no GTM/GA4:
este repositório publica o código do site, mas não altera a configuração
das plataformas.

## Privacidade

O rastreamento não envia nome, bairro/cidade, metragem, telefone do visitante,
URL do WhatsApp nem o texto pré-preenchido da conversa. Esses dados permanecem
fora do GA4.
