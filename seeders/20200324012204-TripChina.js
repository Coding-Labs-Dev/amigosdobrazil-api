'use strict';

const includesData = [
  'Todo trâmite legal, vistos, taxas de embaixadas.',
  'Passagem aérea e taxas de embarque.',
  'Mochila de viagem.',
  'Hospedagem em hotel 4 e 5 estrelas, quarto duplo com direito a café da manhã ocidental e oriental.',
  'Alimentação inclusa, conforme informe do roteiro de viagem.',
  'Passeios inclusos, conforme informe do roteiro de viagem.',
  'Guias locais falando espanhol.',
  'Traslados e passeios mencionados no programa.',
  'Passagem aérea internacional em classe econômica promocional, com cadastrofeito por nos e com direito a milhas.',
  'Restaurantes de nível internacional.',
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  description: item,
}));

const documentsData = [
  'Passaporte com validade até Junho de 2021',
  'Cópia dos vistos anteriores da China',
  '4 fotos 3x4',
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  description: item,
}));

const filesData = [
  {
    file: 'e7204a4f-1b6f-4d4e-8d81-cae5b3e123b5.jpg',
    originalName: 'china.jpg',
  },
  {
    file: 'c44d917d-adab-4210-b8f8-6a1003cb846f.jpg',
    originalName: 'china.jpg',
  },
].map(item => ({
  type: 'image',
  subType: 'jpeg',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const transportPlansData = [
  {
    usd: 1590.0,
    rate: 5.0,
    installmentsQty: 9,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const paymentPlansData = [
  {
    date: '05/30/2020',
    usd: 2980.0,
    brl: 14908.0,
    reservationFee: 800,
    downPayment: 0.0,
    installmentsQty: 10,
    installmentsValue: 1490.8,
  },
  {
    date: '05/31/2020',
    usd: 3180.0,
    brl: 15908.0,
    reservationFee: 800,
    downPayment: 0.0,
    installmentsQty: 10,
    installmentsValue: 1590.8,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const itinerariesData = [
  {
    title: '02/09 - Saída Guarulhos',
    description: '<ul><li>  Embarque no aeroporto de Guarulhos pela Cia EMIRATES, Voo EK 262 as 01h25,  com destino a DUBAI – EMIRADOS ÁRABES UNIDOS – Chegada em Dubai as 22h55m  Chegada à DUBAI no Emirados Árabes as 22h55. Saída as 04h10 com destino a  Beijing (CHINA), vôo EK 306 direto. Chegada em Beijing as 15h10m. Check in  no Hotel e Jantar de Confraternização</li><li>Parcelado em 05 ou 09 X sem juros ou correções.</li></ul>',
    order: 0,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '04/09 - Shopping da Rua da Seda',
    description: '<ul><li>09h30 – Saída para Cambio no Banco da China – 12 h00 Almoço Buffet –</li><li>  13h30 – Visita ao Shopping da Rua da Seda – Um dos mais famosos de Beijing  com preços imoralmente baixos.</li><li>Jantar com o Famoso Pato Laqueado e Retorno ao Hotel</li></ul>',
    order: 1,
    mainDestination: true,
    mainDestinationTitle: 'Rua da Seda'
  },
  {
    title: '05/09 - Cidade Proibída e Praça da Paz Celestial',
    description: '<ul><li>  9h00 – Visita ao Shopping Bai Não Hui – Shopping de eletrônicos com todas as  novidades e lançamentos recentes nas áreas de informática e telefonia.  Compre o Ipad ou Mac do seus sonhos.</li><li>  12h00 – Almoço – 13h30 Visita a Cidade Proibida e Praça da Paz Celestial</li><li>  Ex viajantes poderão optar por outro passeio inédito: visita ao mercado de  pulgas</li><li>Jantar</li></ul>',
    order: 2,
    mainDestination: true,
    mainDestinationTitle: 'Cidade Proibída'
  },
  {
    title: '06/09 - Grande Muralha',
    description: '<ul><li>  8h30 – Dia inteiro de passeio visitando a Grande Muralha MUTIAN YU, única  construção humana visível do espaço, com seus 6.000 km de extensão e mais de  2.500 anos de existência, construída pelos chineses com fins de defesa de  seus domínios.  Esta parte da Muralha é a melhor e mais bonita da China. Só  nos levamos para este passeio.</li><li>Você escolhera o que comer! – Visita a Fabrica de Croisone- .</li><li>  Conheceremos a fábrica de peças de Jade e a fábrica de jóias de excelente  qualidade e originais –</li></ul>',
    order: 3,
    mainDestination: true,
    mainDestinationTitle: 'Grande Muralha'
  },
  {
    title: '07/09 - Distrito de Artes 798',
    description: '<ul><li>  10h00 – Visita ao Distrito de Artes 798 (um passeio exclusivo do nosso  grupo, sendo um dos locais mais incríveis da Beijing) Vale a pena conhecer!</li><li>  O que antes era habitado por fábricas militares decadentes do governo de Mao  Tsé-tung, hoje é residido por cobiçados artistas contemporâneos chineses.  Este é o cenário do distrito 798, uma área de Pequim que foi transformada em  um grande centro das artes plásticas. Ao andar pelas ruas, pode-se ver  intervenções urbanas e cafés charmosos combinados com ateliês de artistas de  obras milionárias. A procura pelo distrito badalado é tanta que em 2007 o  número de visitantes ao 798 superou o da Cidade Proibida, chegando a marca  de 1,5 milhão de turistas, segundo dados oficiais.</li><li>http://www.youtube.com/watch?v=02SYKjO0kW0</li><li>Retorno ao Hotel.</li></ul>',
    order: 4,
    mainDestination: false,
    mainDestinationTitle: 'Distrito de Artes 798'
  },
  {
    title: '08 e 09/09 - Dias livres para Compras ou Tour',
    description: '<ul><li>  DIA LIVRE PARA COMPRAS OU TOUR – Sugestões: Montanha Perfumada – Plataforma  de Vidro – Montanha do Dragão – Shanghai – Xian</li></ul>',
    order: 5,
    mainDestination: false,
    mainDestinationTitle: '08/09 - Dia livre para Compras ou Tour'
  },
  {
    title: '10/09 - Transfer para Tian Jin',
    description: '<ul><li>DIA LIVRE PARA COMPRAS OU TOUR –</li><li>  16hrs checkout e transfer a cidade de Tian Jin- check in na hospedagem de  Tian Jin</li></ul>',
    order: 7,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '11 a 17/09 - Curso de MTC em Tian Jin',
    description: '<ul><li>CURSO NA NOVA UNIVERSIDADE DE MTC DE TIAN JIN</li><li>(PROGRAMA INÉDITO!!!!)  – Tradução em Português!</li><li>Entrega dos certificados.</li></ul>',
    order: 8,
    mainDestination: true,
    mainDestinationTitle: 'MTC em Tian Jin'
  },
  {
    title: '18/09 - Embarque para Dubai',
    description: '<ul><li>Check out e transfer para aeroporto de Beijing – Embarque para Dubai</li></ul>',
    order: 9,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '19/09 - Dubai',
    description: '<ul><li>  Check in no Hotel Golden Tulip Media – Restante do dia livre ou opcionais</li></ul>',
    order: 10,
    mainDestination: true,
    mainDestinationTitle: 'Dubai'
  },
  {
    title: '20/09 - Burj Kalifa',
    description: '<ul><li>Sugestões: Manhã as 9h00 City tour com subida ao Burj Kalifa</li><li>Tarde: as 16h00 Safari no Deserto</li></ul>',
    order: 11,
    mainDestination: true,
    mainDestinationTitle: 'Burj Kalifa'
  },
  {
    title: '21/09 - Retorno',
    description: '<ul><li>Checkout e transfer ao aeroporto e emabrque às 8h30.</li><li>Chegada no Brasil às 16h35</li></ul>',
    order: 12,
    mainDestination: false,
    mainDestinationTitle: ''
  }
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const tripData = {
  slug: 'china-09-2021',
  featured: true,
  title: 'China & Dubai',
  subTitle: 'Conheça esta cultura milenar',
  backgroundId: 3,
  bannerId: 4,
  bannerPosition: 'center center',
  titlePosition: 'center',
  type: 'INTERCAMBIO EM ACUPUNTURA',
  days: 16,
  minSize: 22,
  destinationsQty: 4,
  departure: '2021-09-02',
  bookStart: '2020-06-21',
  bookEnd: '2021-08-22',
  description: JSON.stringify({
    title: 'Descubra as belezas da China',
    description: 'Roteiro de turismo VIP China setembro 2021 com stop em Dubai',
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

    const documents = await queryInterface.bulkInsert(
      'Documents',
      documentsData,
      { returning: true },
    );

    const files = await queryInterface.bulkInsert('Files', filesData, {
      returning: true,
    });

    const backgroundId = files[0].id;
    const bannerId = files[1].id;

    const trip = await queryInterface.bulkInsert(
      'Trips',
      [{ ...tripData, backgroundId, bannerId }],
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

        const docsAssociations = documents.map(({ id: documentId }) => ({
          tripId,
          documentId,
        }));

        await queryInterface.bulkInsert('TripDocument', docsAssociations);
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
