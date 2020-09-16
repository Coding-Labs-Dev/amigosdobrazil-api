'use strict';

const includesData = [
  'Hospedagem nos Hoteis indicados no roteiro com café da manhã.',
  'Refeições incluídas no programa. Traslados regulares conforme roteiro',
  'Passeios mencionados no programa. Ingressos e taxas locais',
  'Guia local falando espanhol ou português.',
  'Café da manhã todos os dias - 8 almoços – 6 jantares',
  'Direito a uma mala de 23 kg cada + mala de mão -ticket de trem',
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  description: item,
}));

// const documentsData = [
//   'Passaporte com validade até Junho de 2021',
//   'Cópia dos vistos anteriores da China',
//   '4 fotos 3x4',
// ].map(item => ({
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   description: item,
// }));

// const filesData = [
//   {
//     file: 'e7204a4f-1b6f-4d4e-8d81-cae5b3e123b5.jpg',
//     originalName: 'jerusalem.jpg',
//   },
//   {
//     file: 'c44d917d-adab-4210-b8f8-6a1003cb846f.jpg',
//     originalName: 'jerusalem.jpg',
//   },
// ].map(item => ({
//   type: 'image',
//   subType: 'jpeg',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   ...item,
// }));

const transportPlansData = [
  {
    usd: 1448.0,
    rate: 5.5,
    installmentsQty: 4,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const paymentPlansData = [
  {
    date: '10/30/2020',
    usd: 4200.0,
    brl: 23100.0,
    reservationFee: 800,
    downPayment: 5100.0,
    installmentsQty: 10,
    installmentsValue: 1800.0,
  },
  {
    date: '11/30/2020',
    usd: 4300.0,
    brl: 23200.0,
    reservationFee: 800,
    downPayment: 5200.0,
    installmentsQty: 10,
    installmentsValue: 1800.0,
  },
  {
    date: '12/01/2020',
    usd: 4500.0,
    brl: 23400.0,
    reservationFee: 800,
    downPayment: 5400.0,
    installmentsQty: 10,
    installmentsValue: 1800.0,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const itinerariesData = [
  {
    title: '21/03 - Saída',
    description:
      '<ul><li>Embarque pela Cia KLM as  20h00 chegada a Amsterdan as 11h40 – Chegada a Osaka as 09h35 do dia 22. Após a liberação das formalidades de imigração e alfândega, você será recebido por um guia turístico que fala espanhol. Traslado ao hotel em Kyoto. (KIX para Kyoto: 1,5 - 2h)- Almoço e jantar por conta própria. </li></ul>',
    order: 0,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '23/03 - Kyoto – C-A-J',
    description:
      '<ul><li>Tour de dia inteiro em Kyoto, visitando em ônibus fretado; Floresta de bambu de Arashiyama / - Ponte Togetsukyo / - Tempo livre em Arashiyama - Templo Kiyomizudera - Ninenzaka - Sannenzaka / - Área de Gion - Retorne ao seu hotel em Kyoto -Almoço em restaurante local (conjunto Beef Sukiyaki)- Jantar em restaurante local (Tempura)</li></ul>',
    order: 1,
    mainDestination: true,
    mainDestinationTitle: 'Kyoto',
  },
  {
    title: '24/03 - Kyoto – C- A',
    description:
      '<ul><li>Tour de dia inteiro em Kyoto, visitando em ônibus fretado; - Templo Kinkakuji / - Mercado de Alimentos Nishiki - Santuário Fushimi Inari / - Museu do Saquê Gekkeikan - Retorne ao seu hotel em Kyoto- Almoço (confecção de Lamen) Jantar livre</li></ul>',
    order: 2,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '25/03 - Kyoto – Kanazawa – C-A-J',
    description:
      '<ul><li>Transporte separado de bagagem para Kyoto- Saia de Kyoto para Kanazawa no Trem Expresso Limitado "Thunderbird" Chegue em Kanazawa, visitando em um ônibus fretado: - Jardim Kenroku-en / - Higashichaya-gai - Chegada ao seu hotel em Kanazawa- Almoço em restaurante local (set ocidental)- Jantar em restaurante local ou no seu hotel (Buffet)</li></ul>',
    order: 3,
    mainDestination: true,
    mainDestinationTitle: 'Kanazawa',
  },
  {
    title: '26/03 - Kanazawa - Shirakawago – Takayama- C-A-J',
    description:
      '<ul><li>Partida para a vila de Shirakawago (Patrimônio Mundial) de ônibus, visitando; - Casa Gasshozukuri. Transferência para Takayama. visitando; Almoço em restaurante local (conjunto Hida Beef Hoba-yaki). Takayama Jinya / - Tempo livre em Kamisannomachi Chegada ao Hotel em Takayama- Jantar no seu hotel (buffet ou menu fixo)</li></ul>',
    order: 4,
    mainDestination: true,
    mainDestinationTitle: 'Shirakawago',
  },
  {
    title: '27/03 - Takayama – Matsumoto – C-A-J',
    description:
      '<ul><li>Parta para Matsumoto de ônibus, visitando - Fazenda Daio Wasabi - Castelo de Matsumoto -Cervejaria Miso (experimente a sopa Miso real)- Chegada no hotel em Matsumoto. Almoço em restaurante local (conjunto japonês incl SASHIMI) Jantar em restaurante local ou em seu hotel</li></ul>',
    order: 5,
    mainDestination: true,
    mainDestinationTitle: 'Matsumoto',
  },
  {
    title: '28/03 - Matsumoto - MT. ÁREA DE FUJI – Tóquio – C-A-J',
    description:
      '<ul><li>Parta para a área de Mt.Fuji de ônibus, visitando; - Lago Kawaguchi (mirante do Monte Fuji) / - Transferência do teleférico Monte Kachi-Kachi para Tóquio- Chegada no hotel em Tóquio- Almoço em restaurante local (conjunto Hoto)- Jantar em restaurante local (Tonkatsu).  </li></ul>',
    order: 6,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '29/03 - Tóquio – C-A',
    description:
      '<ul><li>Tour de dia inteiro em Tóquio em ônibus fretado; - Mercado de Tsukiji (não inclui leilão de atum)-- Templo Asakusa sensoji * Lanche da tarde (Dorayaki) Chegada ao hotel em Tóquio- Almoço em restaurante local (aula de preparação de sushi) Jantar livre</li></ul>',
    order: 7,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '30/03 - Tóqui – C-A J',
    description:
      '<ul><li>Tour de dia inteiro em Tóquio em ônibus fretado; - Meiji Jingu / - Harajuku / - Omotesando -Odaiba- Chegada no hotel em Tóquio- Almoço em restaurante local (set ocidental ou buffet)- Jantar em restaurante local (Izakaya com ALL-YOU-CAN-DRINK)</li></ul>',
    order: 8,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '31/03 - Tóquio (C)',
    description:
      '<ul><li>Café da manhã. Dia livre para atividades de compras e turismo em Toquio.</li></ul>',
    order: 9,
    mainDestination: false,
    mainDestinationTitle: '',
  },
  {
    title: '01/04 - Retorno',
    description:
      '<ul><li>Embarque as 14h20 e chegada ao Brasil as 06h30 - BRASIL Traslado ao Aeroporto Internacional de Narita。 Fim da nossa Aventura!</li></ul>',
    order: 10,
    mainDestination: false,
    mainDestinationTitle: '',
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const tripData = {
  slug: 'japao-03-2021',
  featured: true,
  title: 'Japão',
  subTitle: 'Em Busca do Sakura',
  backgroundId: 5,
  bannerId: 6,
  bannerPosition: 'center center',
  titlePosition: 'center',
  type: 'TURISMO',
  days: 11,
  minSize: 20,
  destinationsQty: 5,
  departure: '2021-03-21',
  bookStart: '2020-06-21',
  bookEnd: '2021-03-21',
  description: JSON.stringify({
    title: 'Em Busca do Sakura',
    description:
      'Proposta: Conduzir AMIGOS para conhecerem o MUNDO, para turismo, lazer, compras e principalmente para vivencias, aprimoramento pessoal e matar a saudade dos Amigos! Disse um sábio, que a Beleza nos aproxima mais de Deus e sua perfeição. Então, iremos em busca do Sakura! Aviso: Somente para ex-participantes do Projeto, familiares ou apresentados.',
  }),
  bookFee: 800,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const includes = await queryInterface.bulkInsert('Includes', includesData, {
      returning: true,
    });

    // const documents = await queryInterface.bulkInsert(
    //   'Documents',
    //   documentsData,
    //   { returning: true },
    // );

    // const files = await queryInterface.bulkInsert('Files', filesData, {
    //   returning: true,
    // });

    const trip = await queryInterface.bulkInsert(
      'Trips',
      [{ ...tripData }],
      { returning: true },
    );

    const tripId = trip[0].id;

    const transportPlans = await queryInterface.bulkInsert(
      'TransportPlans',
      transportPlansData.map(item => ({ ...item, tripId })),
      { returning: true },
    );

    const paymentPlans = await queryInterface.bulkInsert(
      'PaymentPlans',
      paymentPlansData.map(item => ({ ...item, tripId })),
      { returning: true },
    );

    const itineraries = await queryInterface.bulkInsert(
      'Itineraries',
      itinerariesData.map(item => ({ ...item, tripId })),
      { returning: true },
    );

    return Promise.all(
      [tripId].map(async tripId => {
        const includeAssociations = includes.map(({ id: includeId }) => ({
          tripId,
          includeId,
        }));

        // const docsAssociations = documents.map(({ id: documentId }) => ({
        //   tripId,
        //   documentId,
        // }));

        // await queryInterface.bulkInsert('TripDocument', docsAssociations);
        await queryInterface.bulkInsert('TripInclude', includeAssociations);
      }),
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
