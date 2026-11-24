# Tawantinsuyu: crônica interativa do Império Inca

Site de rolagem narrativa feito com Next.js (App Router), TypeScript, Tailwind CSS e Framer Motion. Todo o texto fica em um único arquivo, `src/data/content.ts`. As animações ficam em componentes reutilizáveis, e as seções só juntam as duas coisas.

## O que o site tem

- **Fundo vivo:** luz dourada, névoa em movimento, montanhas discretas, poeira dourada subindo e grão fino, tudo fixo atrás da página.
- **Imagens:** oito ilustrações feitas em código (SVG), uma por cena. Você pode trocar qualquer uma por uma foto.
- **Moldura animada:** o filete dourado se desenha em volta das imagens e dos vídeos, e os cantos em degraus (chakana) se acendem.
- **Desfoque de movimento:** títulos e blocos entram saindo do desfoque, e as imagens borram um pouco quando a rolagem é rápida.
- **Animações:** título que sobe palavra por palavra, parallax em camadas, fio da cronologia que se preenche, cartões que viram, barra de progresso no topo.
- **Vídeo:** player do YouTube que só carrega depois do clique, com opção de arquivo de vídeo próprio.
- **Créditos** no fim da página.

Quem prefere menos movimento no sistema operacional vê a página sem animações.

## Rodar no computador

Precisa de Node.js 18.18 ou mais novo (o 20 serve).

```
npm install
npm run dev
```

Abra o endereço que aparecer no terminal. O script `dev` do `package.json` pode estar com a porta 3001.

## Como mudar o site

Tudo está em `src/data/content.ts`. Abra no Bloco de Notas ou no VS Code, edite e salve. Com `npm run dev` rodando, a página atualiza sozinha.

| Quero mudar | Onde |
| --- | --- |
| Título, descrição e idioma da página | `siteMeta` |
| Textos fixos (botões, títulos das seções) | `ui` |
| Tela de abertura | `heroContent` |
| Os quatro capítulos | `storyChapters` |
| Datas da cronologia | `timelineMilestones` |
| Cartões de curiosidades | `curiosities` |
| Vídeos | `videos` |
| Créditos | `credits` |
| Nota de rodapé | `footerNote` |

### Trocar o tema do site

Reescreva os textos de `storyChapters`, `timelineMilestones` e `curiosities`. Para cada imagem, escolha uma cena em `art`: `andes`, `valley`, `temple`, `road`, `ruins`, `machu`, `terraces` ou `plaza`.

### Trocar ou adicionar um vídeo

No YouTube, copie o código que vem depois de `watch?v=` no endereço. Em `videos`, troque o `youtubeId`. Para adicionar outro, copie o bloco inteiro entre chaves, cole abaixo e mude os campos. Com mais de um vídeo, aparece uma lista ao lado do player.

Se o player mostrar erro, o dono do vídeo bloqueou a incorporação. O link "Abrir no YouTube" continua funcionando. Para usar um arquivo seu, coloque o `.mp4` em `public/media/inca/` e use `file: "/media/inca/meu-video.mp4"` no lugar de `youtubeId`.

### Usar uma foto no lugar da ilustração

1. Coloque a foto em `public/media/inca/`, por exemplo `machu-picchu.jpg`. Prefira fotos de uns 2000 px de largura e até 300 KB.
2. No bloco da imagem em `content.ts`, acrescente `src` e, se for o caso, `credit`:

```ts
media: {
  art: "machu",
  alt: "Descrição da foto",
  caption: "Machu Picchu, Peru",
  src: "/media/inca/machu-picchu.jpg",
  credit: "Foto: Nome do fotógrafo, licença",
},
```

Se a foto não carregar, a ilustração volta sozinha.

### Mudar os créditos

Em `credits`, cada pessoa é uma linha com `name` e `roles`. Para adicionar alguém, copie uma linha.

### Mudar cores e fontes

- Cores: `src/styles/globals.css`, bloco `:root`. São trios RGB.
- Fontes: `src/app/layout.tsx`. Troque `Fraunces` e `Instrument_Sans` por outras do Google Fonts.

## Publicar no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica o site sempre que algo é enviado para a branch `main`. Em Settings > Pages, o Source deve estar em "GitHub Actions".

Depois de editar, envie as mudanças. No terminal, dentro da pasta do projeto, rode um comando de cada vez:

```
git add .
git commit -m "atualização"
git push
```

Espere o check verde na aba Actions. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Estrutura

```
src/
├── app/                    layout (fontes, fundo) e página
├── components/
│   ├── art/                ilustrações, fundo da página, divisor de montanhas
│   ├── motion/             animações reutilizáveis
│   └── sections/           seções da página
├── data/
│   ├── content.ts          todo o texto e os dados
│   └── types.ts            formato dos dados
├── lib/                    utilitários
└── styles/globals.css      cores e estilos base
```

## Componentes de animação

| Componente | O que faz |
| --- | --- |
| `RevealText` | Palavras sobem de uma linha recortada, saindo do desfoque. |
| `BlurReveal` | Bloco que entra saindo do desfoque. |
| `ScrollBlur` | Desfoque de movimento ligado à velocidade da rolagem. |
| `AnimatedFrame` | Moldura dourada que se desenha, com cantos em degraus. |
| `ParallaxImage` | Imagem que desliza contra a rolagem, com moldura e desfoque. |
| `StickyStorySection` | Imagem fixa que troca conforme o capítulo. |
| `CuriosityCard` | Cartão que vira por botão, acessível por teclado. |
| `ScrollProgress` | Barra de progresso de leitura no topo. |

## Observações

- O texto é um material de apoio. Confira datas e afirmações em fontes acadêmicas antes de apresentar.
- O vídeo incluído foi indicado em um plano de ensino universitário. Confira se ele abre e se o conteúdo serve ao seu trabalho.
- O Tailwind está na versão 3 de propósito: `tailwind.config.ts` guarda os tokens de design.
