import type {
  CreditPerson,
  Curiosity,
  HeroContent,
  SiteMeta,
  StoryChapter,
  TimelineMilestone,
  UiText,
  VideoItem,
} from "./types";

/*
 * TODO O CONTEÚDO DO SITE FICA NESTE ARQUIVO.
 * Para mudar textos, datas, vídeos ou créditos, edite aqui e salve.
 * Nenhum outro arquivo precisa mudar.
 */

export const siteMeta: SiteMeta = {
  name: "Tawantinsuyu",
  lang: "pt-BR",
  title: "Tawantinsuyu: o Império Inca, uma crônica interativa",
  description:
    "Uma crônica interativa do Império Inca: da origem em Cusco às estradas, aos terraços de cultivo e à conquista espanhola.",
};

export const ui: UiText = {
  skipLink: "Ir para o conteúdo",
  heroCta: "Começar a história",
  backToTop: "Voltar ao topo",
  curiosityOpen: "Ler o detalhe",
  curiosityClose: "Fechar",
  videoPlay: "Assistir",
  videoOpenExternal: "Abrir no YouTube",
  videoList: "Vídeos disponíveis",
  narrative: {
    title: "A história em quatro capítulos",
    description:
      "Role a página. A imagem fixa ao lado muda conforme cada capítulo chega ao centro da tela, até o fim do império.",
  },
  timeline: {
    title: "Cronologia",
    description:
      "Datas principais da tradição e do registro histórico. As datas anteriores ao século XV são aproximadas.",
  },
  videos: {
    title: "Documentário",
    description:
      "Para ver os lugares em movimento. Clique para carregar o vídeo; ele só é pedido ao YouTube depois do clique.",
  },
  curiosities: {
    title: "Curiosidades",
    description:
      "Cada cartão vira para mostrar mais. Use o botão com o mouse, o toque ou o teclado.",
  },
  credits: {
    title: "Créditos",
    thanks: "Obrigado por percorrer o Tawantinsuyu até aqui.",
  },
};

export const heroContent: HeroContent = {
  eyebrow: "Uma crônica interativa dos Andes, 1438–1572",
  title: "Tawantinsuyu",
  subtitle:
    "As quatro partes do mundo inca: como um reino de vale se tornou o maior Estado da América pré-colombiana, e como ele caiu.",
  media: {
    art: "andes",
    alt: "Cordilheira dos Andes ao amanhecer, com o sol entre as montanhas e a névoa nos vales",
    caption: "Os Andes ao amanhecer",
  },
};

export const storyChapters: StoryChapter[] = [
  {
    id: "vale",
    eyebrow: "Capítulo I: o vale, por volta do século XIII (tradição)",
    title: "O Vale de Cusco",
    body: [
      "A tradição oral inca coloca a origem da dinastia no vale de Cusco, no alto dos Andes peruanos. Durante boa parte de sua história inicial, a cidade foi apenas um entre vários povos que disputavam a região, e os historiadores reconstroem esse começo principalmente a partir de crônicas escritas depois da conquista.",
      "Observadores posteriores leram o traçado da cidade como um mapa sagrado, e alguns estudiosos veem nele a forma de um puma. O nome, muitas vezes traduzido como \"umbigo\", indicava o papel de coração político e religioso do que viria a ser o Tawantinsuyu, a \"terra das quatro partes\".",
    ],
    media: {
      art: "valley",
      alt: "Telhados de barro e paredes de pedra nas encostas do vale de Cusco",
      caption: "Cusco, Peru",
    },
  },
  {
    id: "pachacuti",
    eyebrow: "Capítulo II: a expansão, por volta de 1438–1471",
    title: "Pachacuti Refaz o Mundo",
    body: [
      "A virada veio com Pachacuti, a quem se atribui a vitória sobre os chancas e a reorganização do Estado. Ele reconstruiu Cusco em escala muito maior, elevou o culto ao deus Sol, Inti, e reorganizou a administração e o trabalho, preparando a expansão rápida pelos Andes.",
      "O domínio inca muitas vezes incorporava líderes e santuários locais ao sistema imperial, em vez de apagá-los. Em troca de lealdade, tributo e trabalho, as comunidades conquistadas passavam a fazer parte de um Estado que guardava e redistribuía alimentos em tempos de necessidade.",
    ],
    media: {
      art: "temple",
      alt: "Muros de pedra encaixada e portal trapezoidal de um templo inca, sob um sol dourado",
      caption: "Coricancha, Cusco",
    },
  },
  {
    id: "infraestrutura",
    eyebrow: "Capítulo III: a infraestrutura, por volta de 1450–1525",
    title: "Estradas, Terraços e Nós",
    body: [
      "O Qhapaq Ñan, a rede de estradas inca, ligava o império ao longo de mais de 30 mil quilômetros de montanha, deserto e floresta. Corredores de revezamento, os chasquis, levavam mensagens por ele, enquanto depósitos à beira do caminho guardavam comida, tecidos e suprimentos para viajantes e exércitos.",
      "O trabalho era organizado pela mit'a, uma obrigação rotativa devida ao Estado, e os registros eram feitos em quipos, cordas de nós cujas cores e posições codificavam números. Os andenes, ou terraços, transformavam encostas íngremes em terra de cultivo, e boa parte do alcance do império ainda é visível nessas paisagens construídas.",
    ],
    media: {
      art: "road",
      alt: "Estrada de pedra serpenteando por uma encosta andina, com um mensageiro correndo ao longe",
      caption: "Qhapaq Ñan, Andes",
    },
  },
  {
    id: "conquista",
    eyebrow: "Capítulo IV: conquista e resistência, 1532–1572",
    title: "Cajamarca e o Último Refúgio",
    body: [
      "Em 1532, Francisco Pizarro e uma pequena força espanhola capturaram o imperador Atahualpa em Cajamarca, logo depois de uma guerra civil entre Atahualpa e seu meio-irmão Huáscar. Atahualpa foi executado no ano seguinte, e Cusco caiu em poder dos espanhóis pouco depois.",
      "A resistência continuou em Vilcabamba, um Estado neoinca isolado nas colinas cobertas de floresta, até 1572, quando Túpac Amaru I foi capturado e executado em Cusco. Com isso acabou o Estado inca independente, embora o quéchua e muitos modos andinos de organizar a vida tenham durado muito mais.",
    ],
    media: {
      art: "ruins",
      alt: "Ruínas de pedra cobertas de vegetação, sob a lua e a névoa, nas colinas de Vilcabamba",
      caption: "Vilcabamba, Peru",
    },
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "fundacao-tradicional",
    year: "c. século XIII",
    startYear: 1200,
    era: "Formação",
    title: "Cusco na Tradição",
    summary:
      "A tradição oral inca liga a origem da dinastia ao vale de Cusco. A maior parte do que se sabe sobre esses séculos vem de crônicas escritas depois da conquista.",
  },
  {
    id: "campanhas-de-pachacuti",
    year: "c. 1438",
    startYear: 1438,
    era: "Expansão",
    title: "Pachacuti Inicia a Expansão",
    summary:
      "Depois de uma vitória decisiva sobre os chancas, Pachacuti lança campanhas que estendem rapidamente a autoridade inca pelas terras altas e além delas.",
  },
  {
    id: "machu-picchu",
    year: "c. 1450",
    startYear: 1450,
    era: "Apogeu",
    title: "Machu Picchu Surge",
    summary:
      "Construído numa crista de montanha acima do vale do Urubamba, o sítio costuma ser entendido como uma propriedade real. Seu nome original é desconhecido.",
    media: {
      art: "machu",
      alt: "Terraços e construções de pedra numa crista de montanha, com um pico pontiagudo ao fundo",
      caption: "Machu Picchu, Peru",
    },
  },
  {
    id: "tupac-inca-yupanqui",
    year: "c. 1480",
    startYear: 1480,
    era: "Expansão",
    title: "Túpac Inca Yupanqui Avança ao Norte",
    summary:
      "Sob Túpac Inca Yupanqui, as campanhas chegam aos Andes do norte, incluindo territórios do atual Equador.",
  },
  {
    id: "maior-extensao",
    year: "c. 1525",
    startYear: 1525,
    era: "Apogeu",
    title: "A Maior Extensão",
    summary:
      "Sob Huayna Capac, o império atinge seu maior tamanho, estendendo-se pelos Andes do sul da Colômbia ao centro do Chile.",
    media: {
      art: "terraces",
      alt: "Terraços agrícolas em degraus subindo uma encosta andina ao fim da tarde",
      caption: "Terraços agrícolas andinos",
    },
  },
  {
    id: "cajamarca",
    year: "1532",
    startYear: 1532,
    era: "Conquista",
    title: "Atahualpa Capturado em Cajamarca",
    summary:
      "Francisco Pizarro e uma pequena força espanhola capturam o imperador Atahualpa durante uma guerra de sucessão entre ele e Huáscar.",
    media: {
      art: "plaza",
      alt: "Praça de uma cidade das terras altas ao entardecer, cercada por arcadas e uma torre de igreja",
      caption: "Cajamarca, Peru",
    },
  },
  {
    id: "vilcabamba",
    year: "1572",
    startYear: 1572,
    era: "Resistência",
    title: "Fim do Estado Neoinca",
    summary:
      "Depois de décadas de resistência em Vilcabamba, Túpac Amaru I é capturado e executado em Cusco, encerrando o último Estado inca independente.",
  },
];

export const curiosities: Curiosity[] = [
  {
    id: "quipu",
    category: "Registro",
    title: "Nós que Contavam",
    teaser: "Os quipos eram cordas de nós usadas para guardar registros.",
    detail:
      "Os quipos codificavam números pela posição, pelo tipo e pelo espaçamento dos nós, e as cores podem ter carregado outros significados. Centenas sobrevivem em museus, mas os especialistas ainda discutem quanta narrativa eles guardavam.",
  },
  {
    id: "batatas",
    category: "Agricultura",
    title: "Milhares de Batatas",
    teaser: "Os Andes abrigam milhares de variedades de batata.",
    detail:
      "Os agricultores andinos cultivavam batatas em muitos climas e altitudes. Para conservá-las, congelavam e secavam os tubérculos, fazendo o chuño, um alimento que podia ser guardado por anos.",
  },
  {
    id: "sem-rodas",
    category: "Transporte",
    title: "Pés, Não Rodas",
    teaser: "O império inca não tinha veículos com rodas nem cavalos de carga.",
    detail:
      "As cargas iam a pé, em caravanas de lhamas e pela rede de chasquis. Lhamas e alpacas, os camelídeos domesticados dos Andes, levavam cargas modestas, o que tornava as estradas e os depósitos essenciais.",
  },
  {
    id: "terracos",
    category: "Engenharia",
    title: "Montanhas Viram Lavouras",
    teaser: "Os andenes, ou terraços agrícolas, seguravam o solo nas encostas.",
    detail:
      "Os terraços reduziam a erosão, melhoravam a drenagem e criavam microclimas que permitiam plantar culturas diferentes em altitudes diferentes. Muitos continuam de pé, e alguns ainda são cultivados.",
  },
  {
    id: "quechua",
    category: "Língua",
    title: "Uma Língua de Administração",
    teaser: "O quéchua se espalhou muito além de sua região de origem.",
    detail:
      "O quéchua virou língua de administração, comércio e religião em boa parte do império, muitas vezes ao lado das línguas locais. Milhões de pessoas ainda o falam nos Andes.",
  },
  {
    id: "depositos",
    category: "Logística",
    title: "Armazéns Frios e Secos",
    teaser: "Depósitos se alinhavam nas estradas, em lugares altos e ventosos.",
    detail:
      "Os depósitos chamados qollqas ficavam onde o ar frio e seco conservava a comida por anos. Guardavam grãos e batata seca para funcionários, exércitos e viajantes.",
  },
];

/**
 * Vídeos. Para trocar, mude o youtubeId (o código depois de "watch?v=").
 * Para adicionar outro, copie o bloco inteiro entre chaves e cole abaixo.
 * Confira se o dono do vídeo permite incorporação: se o player mostrar erro,
 * o link "Abrir no YouTube" continua funcionando.
 */
export const videos: VideoItem[] = [
  {
    id: "machu-picchu-decodificada",
    title: "Machu Picchu decodificada",
    summary:
      "Documentário sobre a construção e o significado de Machu Picchu. Indicado em um plano de ensino de História Indígena de uma universidade brasileira; confira o conteúdo antes de apresentar.",
    source: "YouTube",
    youtubeId: "EY8V7VTtYgk",
    art: "machu",
  },
];

/** Os créditos aparecem no fim do site, nesta ordem. */
export const credits: CreditPerson[] = [
  { name: "Rafael Paiva", roles: "Pesquisador, Programador e Designer" },
  { name: "Enzo", roles: "Pesquisador" },
  { name: "Maria", roles: "Pesquisadora" },
];

export const footerNote =
  "Conteúdo de apoio escrito para este projeto. Confira datas e afirmações em fontes acadêmicas antes de apresentar, por exemplo Reading Inca History, de Catherine Julien, e The Inca Road System, de John Hyslop.";
