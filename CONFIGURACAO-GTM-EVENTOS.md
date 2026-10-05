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

## 4. Testar antes de publicar

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

## 5. Criar dimensões personalizadas no GA4

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

## Privacidade

O rastreamento não envia nome, bairro/cidade, metragem, telefone do visitante,
URL do WhatsApp nem o texto pré-preenchido da conversa. Esses dados permanecem
fora do GA4.
