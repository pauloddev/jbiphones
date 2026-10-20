# JB iPhones · landing page (HTML estático) + SEO técnico

## Estrutura
```
index.html            página única (CSS e JS embutidos, SEO, Open Graph, JSON-LD)
404.html              página 404 personalizada (noindex)
assets/marca/         logo JB em verde e em branco (PNG/WebP, fundo transparente) e foto do CEO
assets/ofertas/       8 artes de oferta, todas 3:4, SEM preço (selo de preço coberto por etiqueta "NOVO")
assets/vitrine/       16 fotos "saindo agora", todas 4:5, sem textos e sem a faixa verde
assets/clientes/      7 fotos de clientes (4:5) + foto em destaque, sem textos e sem a faixa verde
favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
og-image.jpg          imagem de compartilhamento 1200x630 (logo + cliente)
robots.txt, sitemap.xml, site.config.mjs (SITE_URL), scripts/build.mjs, vercel.json, package.json
```
Teste local: `npm run build` e depois `npx serve dist`.

## Seções
1. Abertura com a logo (some em 2 s ou com um toque; desligada com "reduzir movimento")
2. Hero: iPhone novo com garantia, entregue na sua mão (CTA WhatsApp)
3. Na JB você encontra: novos lacrados, seminovos com garantia, ecossistema Apple
4. Ofertas: 1 grande (iPhone 18 Pro Max), 2 menores ao lado, 5 embaixo do mesmo tamanho + card "Não achou o seu modelo?"
5. Saindo agora: carrossel de 16 fotos, a foto da vez fica em destaque (borda verde, tamanho cheio); as outras ficam menores e apagadas
6. Entrega: 3 passos (escolha, combine, receba). Sem loja física.
7. Clientes: foto em destaque + frases (compra feliz, qualidade, entrega rápida, confiança, garantia) + carrossel com destaque de 7 clientes
8. Quem somos: João Batista, CEO
9. Dúvidas, CTA final, rodapé e botão flutuante de WhatsApp

## Tratamento das imagens
- **Textos e faixa verde removidos por recorte**, na resolução original, sem inpainting, sem borrão e sem distorção. Todas as fotos da vitrine e de clientes saem em 4:5; as artes de oferta, em 3:4.
- **Preços**: nas artes de oferta, o selo verde de preço foi coberto por uma etiqueta sólida "NOVO · GARANTIA APPLE 1 ANO" desenhada em alta resolução (sem borrão). O preço não aparece em nenhum arquivo publicado.
- Nas fotos, o @ e o telefone impressos na sacola da JB fazem parte da foto e foram mantidos.

## Design system (tokens em `:root` no index.html)
| Token | Valor | Uso |
|---|---|---|
| `--green` | #4FC976 (cor da logo) | títulos de destaque (`em`), botões de ação, ícones, borda do slide ativo |
| `--green-soft` | #7BE09B | hover dos botões verdes, foco |
| `--green-ink` | #06130B | texto sobre verde (contraste 10:1) |
| `--bg` / gradiente do body | #000 → #0F1311 | fundo preto em gradiente clean |
| `--surface-2` / `--surface-3` | #121514 / #191D1B | cartões |
| `--white` / `--text` / `--muted` | #FFF / #EEF1EF / #A9B0AC | títulos, texto, texto secundário |
| `--f-display` / `--f-body` | Outfit / Manrope | títulos / texto |
| `--radius-*` | 34 / 26 / 18 / 14 px | cantos |

Regra de cor "meio a meio": cada título tem a primeira parte em **branco** e a segunda em **verde**; botões de ação principais são verdes, secundários são contorno branco. Texto corrido é sempre branco ou cinza.

**Componentes:** `.btn-green` (ação principal), `.btn-ghost` (secundário), `.card.offer` (oferta com "Consultar valor"), `.card.more` (consultar estoque), `[data-rail]` (carrossel com destaque: setas, contador, toque no slide, teclado ← →, avanço automático que pausa ao interagir), `.steps`, `.faq`.

## O que ficou para preencher ou confirmar
| Item | Arquivo e linha | O que fazer |
|---|---|---|
| URL do site | `site.config.mjs`, linha 10 | Opcional na Vercel (automático via `VERCEL_PROJECT_PRODUCTION_URL`). Com domínio próprio, troque aqui. Não mexa nos placeholders das linhas 10, 17, 18, 25, 40, 41 e 42 do index.html: o build troca sozinho. |
| **WhatsApp** | todos os links `wa.me/5583987614589` | **Confirmar.** O número (83) 98761-4589 foi lido na sacola da loja. Se mudar, substitua `5583987614589` em index.html e 404.html. |
| **Instagram** | `@jbiphones_` (index.html, rodapé e JSON-LD) | **Confirmar.** Lido nas artes e na sacola. |
| Prazo de garantia dos seminovos | textos "garantia da loja" | As artes citam 5 e 6 meses. Deixei genérico; se for um prazo fixo, me diga. |
| Região de entrega | seção #entrega e FAQ | Não informei cidade/região (não havia no material). Se quiser citar, me diga quais. |
| Imagem de compartilhamento | `og-image.jpg` | Já criada (1200x630). Pode trocar mantendo o nome e o tamanho. |

## Resultado do checklist
### Parte 1: qualidade
1. **Rolagem horizontal:** testado com navegador real em 320, 375, 768 e 1440 px; `scrollWidth` igual à largura da tela em todos. `box-sizing: border-box`, `max-width: 100%` em mídias, `overflow-x: clip`, nenhum `100vw`.
2. **Favicon:** favicon.ico (16/32/48), favicon.svg, apple-touch-icon.png (180), icon-192.png e icon-512.png via site.webmanifest, theme-color preto, todos na raiz, gerados da logo enviada.
3. **Meta descrição:** 132 caracteres, única. Title com 54 caracteres.
4. **404:** `404.html` com a mesma identidade (preto e verde, logo), botões para a home e para o WhatsApp, `noindex`.
5. **Imagens:** WebP com srcset/sizes, width/height declarados, `loading="lazy"` abaixo da dobra, imagem do hero com preload e `fetchpriority="high"`. Total de imagens: ~2 MB.
6. **Botões:** nenhum `href="#"` vazio; hover, focus-visible e active; área mínima de 44x44 px; âncoras conferidas.
7. **Logo clicável:** header e rodapé levam ao topo; na 404 leva à home.
8. **Mobile:** viewport correto, texto a partir de 16 px, menu recolhível, botão flutuante de WhatsApp, `100dvh` na 404, `prefers-reduced-motion` respeitado.
9. **Travessões:** nenhum `—` ou `–` em textos, metas, alt, JSON-LD, 404, robots e sitemap.
10. **Links:** todo `target="_blank"` com `rel="noopener noreferrer"`; WhatsApp em `wa.me` com mensagem pronta para cada produto; `tel:+5583987614589`.
11. **Títulos:** escala fluida com `clamp()`, `text-wrap: balance`, contraste AA (verde #4FC976 sobre preto 10:1; texto escuro sobre botão verde 10:1).
12. **Velocidade:** sem frameworks; JS pequeno no fim do body; 2 famílias de fonte com `display=swap` e preconnect; cache longo em `/assets` via vercel.json.

### Parte 2: SEO técnico
1. Title e description só com o conteúdo do site. 2. Canonical absoluta via SITE_URL. 3. robots.txt liberando tudo com sitemap absoluto. 4. sitemap.xml só com a home. 5. Open Graph (pt_BR) e Twitter `summary_large_image` com `/og-image.jpg`. 6. Vercel sem URL de preview no build de produção. 7. Nenhum noindex na home, nenhum X-Robots-Tag; canonical = og:url = sitemap. 8. `lang="pt-BR"`. 9. Um único `<h1>`, h2 por seção, h3 nos cartões. 10. `alt` descritivo em todas as imagens de conteúdo (logos decorativas com `alt=""`). 11. Favicon pronto. 12. JSON-LD `Store` com nome, descrição, telefone, Instagram e fundador (sem endereço, pois não há loja física). 13. Não há outras rotas.

## Checklist de publicação
**a. Vercel via GitHub:** crie um repositório, envie esta pasta (sem `dist`), na Vercel faça *Add New → Project → Import*, Framework Preset **Other** e clique em *Deploy*.
**b. Link de produção:** o link `seu-projeto.vercel.app` aparece em *Domains*; a troca da URL é automática. Confira `/robots.txt` e `/sitemap.xml` no link de produção (previews ficam com noindex, é normal).
**c. Search Console:** adicione uma propriedade "Prefixo do URL" com o link de produção, verifique pela meta tag HTML (cole no `<head>`, faça novo deploy), envie `sitemap.xml` e solicite a indexação da home em *Inspeção de URL*. A indexação depende do Google e pode levar de dias a semanas.
**d. Domínio próprio:** adicione em *Settings → Domains*, marque como principal e redirecione o `.vercel.app`; troque `SITE_URL` em `site.config.mjs`, faça novo deploy e cadastre o domínio novo no Search Console com o sitemap.
