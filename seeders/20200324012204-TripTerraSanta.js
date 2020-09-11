'use strict';

const includesData = [
  'Guia para assistência 24h aos viajantes durante toda a viagem',
  'Guias locais: Israelense e Palestino em português ou espanhol durante toda a viagem',
  'Veículo e motorista local exclusivo para o grupo, desde o transfer de chegada até a saída',
  'Tickets de entrada para todas as visitas da viagem: Fortaleza dos Cruzados, Teleférico de Massada, Sítios Arqueológicos e Parques Nacionais: Cesaréia Marítima, Tel Meguido, Banias, Migdal, Cafarnaum, Massada e Grutas de Qumran',
  'Kit de viagem (porta vouchers, nécessaire e etiquetas de bagagem)',
  'Entrada na mesquita em Belém',
  'Bilhetes de avião – Tel viv – Cairo – Cairo swan – Luxor-cairo',
  'Cruzeiro com pensão completa – Demais dias com meia pensão',
  'Direito a uma mala de 23 Kg mais uma mala de mão'
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
    usd: 897.0,
    rate: 5.5,
    installmentsQty: 5,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const paymentPlansData = [
  {
    date: '05/30/2020',
    usd: 4870.0,
    brl: 26780.0,
    reservationFee: 800,
    downPayment: 5800.0,
    installmentsQty: 10,
    installmentsValue: 2098.0,
  },
  {
    date: '05/31/2020',
    usd: 4970.0,
    brl: 27328.0,
    reservationFee: 800,
    downPayment: 5800.0,
    installmentsQty: 8,
    installmentsValue: 2691.0,
  },
  {
    date: '06/30/2020',
    usd: 5270.0,
    brl: 28984.0,
    reservationFee: 800,
    downPayment: 5800.0,
    installmentsQty: 6,
    installmentsValue: 3864.0,
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const itinerariesData = [
  {
    title: '30/03 - Saída Guarulhos',
    description: '<ul><li>Luftansa São Paulo embarque as 16h55 - Chegada as 09h35 e partida as -11h25 para Tel Aviv – chegada as 16h05 do dia 31 março- Restante do dia livre para descanso – A noite Jantar de Confraternização. 14horas de voo</li></ul>',
    order: 0,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '01/04 - Tel Aviv',
    description: '<ul><li><b>Café da manhã</b>. Partida para Jope para visitar o Bairro dos Artistas e o Mosteiro de S. Pedro. <b>Visita panorâmica</b> das principais atrações da cidade: Rua Dizengoff , o Palácio da Cultura, o Museu de Tel Aviv, a praça Yitzhak Rabin, o Mercado Carmel etc. Continuaremos até ao Museu da Diáspora para sua visita. <b>Tarde livre. Hospedagem. JANTAR INCLUIDO. ATENÇÃO: Nos dias ou tempo livres pedirei ao guia para nos orientar onde visitar ou passear. É uma oportunidade de se misturar a população e viver os seus habitos, andar livre pela cidade, conhecer lojas e sentar a beira de um café e desfrutar do bom papo com AMIGOS! É normal em grupos se formar grupinhos afins e portanto fica mais facil sair e se aventurar e ter boas lembranças e historias para contar</b></li></ul>',
    order: 1,
    mainDestination: true,
    mainDestinationTitle: 'Tel Aviv'
  },
  {
    title: '02/04 - Dia Livre',
    description: '<ul><li><b>Dia Livre para passeios e ou compras – JANTAR INCLUIDO</b></li></ul>',
    order: 2,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '03/04 - Tel Aviv - Cesarea - Haifa - Galileia',
    description: '<ul><li>Café da manhã. Partida para Cesareia para visitar o teatro romano, a cidade cruzada e o aqueduto. Continuamos a Haifa. Vista panorâmica do Santuário Bahai e os Jardins persas. Continuamos até o topo do Monte Carmelo para visitar o Mosteiro das Carmelitas. Continuamos a S. João de Acre para ver as fortificações medievais. Mais tarde iremos para Safed, cidade da Cabala e do misticismo judaico. Visita a uma antiga sinagoga. Finalmente, dirigimo-nos pelas montanhas da Galiléia até kibutz. Hospedagem. JANTAR INCLUIDO</li></ul>',
    order: 3,
    mainDestination: true,
    mainDestinationTitle: 'Tel Aviv - Cesarea - Haifa - Galileia'
  },
  {
    title: '04/04 - Galileia - Cafarnaum – Tiberíades - Nazareth',
    description: '<ul><li>Café da manhã. Monte das Beatitudes, local do Sermão da Montanha e depois a Tabgha, local do Milagre da Multiplicação dos pães e dos peixes. Continuamos até Cafarnaum para visitar a antiga sinagoga e Casa de São Pedro. Via Tiberíades para Yardenit, paragem sobre o Rio Jordão, lugar tradicional do Batismo de Jesus. Visita a Nazaré para ver a Basílica da Anunciação, a Carpintaria S. José e a Fonte da Virgem. Hospedagem. JANTAR INCLUIDO</li></ul>',
    order: 4,
    mainDestination: true,
    mainDestinationTitle: 'Galileia - Cafarnaum – Tiberíades - Nazareth'
  },
  {
    title: '05/04 - Safed – Acre  - Jerusalém',
    description: '<ul><li>Café da manhã. Partida para Safed, cidade da Cabala e do misticismo judaico. Continuamos a S. João de Acre para ver as fortificações medievais. Continuação para Jerusalém. Hospedagem em Jerusalem. JANTAR INCLUIDO</li></ul>',
    order: 5,
    mainDestination: true,
    mainDestinationTitle: '08/04 - Safed – Acre  - Jerusalém'
  },
  {
    title: '06/04 - Tiberias  – Jerico  - Mar Morto - Visita a cidade de Jericó',
    description: '<ul><li>Cidade palestina considerada a mais antiga do mundo, com ruínas datadas em mais de 11 mil anos, onde estão a Árvore de Zaqueu e  vista ao Monte das Tentações, local onde Jesus teria ficado 40 dias em jejum, antes de cumprir a profecia de sua paixão durante a Páscoa Judaica. Chegamos ao Mar Morto para desfrutar do Mar Morto e / ou o Spa do hotel (custos não incluídos). Jantar e hospedagem. JANTAR INCLUIDO</li></ul>',
    order: 7,
    mainDestination: true,
    mainDestinationTitle: 'Tiberias  – Jerico  - Mar Morto'
  },
  {
    title: '07/04 - Massada – Jerusalem',
    description: '<ul><li>Café da manhã. Partida para o Deserto da Judéia para Massada. Subida em teleférico para o último reduto de resistência judaica durante a ocupação romana. Visita às escavações maravilhosas do tempo do rei Herodes. Viajamos a Jerusalem. Jantar e hospedagem  em Jerusalem JANTAR INCLUIDO</li></ul>',
    order: 8,
    mainDestination: true,
    mainDestinationTitle: 'Massada – Jerusalem'
  },
  {
    title: '08/04 - Jerusalém - Monte das Oliveiras - Jerusalém',
    description: '<ul><li>Partida para o Monte das Oliveiras para uma vista panorâmica da cidade. Continuação ao Jardim do Getsêmani para conhecer a Basílica da Agonia. Na tarde Visita à Basílica da Natividade, onde está a famosa estrela de prata de 14 pontas, que segundo a tradição cristã, marca o local exato do nascimento de Jesus, Gruta de São Jerônimo, onde viveu um dos tradutores da Bíblia original (do grego e hebraico para o latim) e a Gruta do Leite, onde o guia local contará uma bela história sobre Maria e o menino Jesus. Hospedagem. JANTAR INCLUIDO</li></ul>',
    order: 9,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '09/04 - Jerusalém - Cidade Velha – Cidade Nueva – Jerusalém',
    description: '<ul><li>Café da manhã. Partida para o monte Sião e visita do Tumulo do Rei David, o Cenáculo e a Abadia da Dormição. Continuação para a cidade velha. Percurso pelas 14 estações da Via Dolorosa, Igreja da Flagelação, a Capela da Condenação, Calvário e Santo Sepulcro. Seguimos através do Bairro Judeu e o Cardo Romano até ao Museu da Cidadela. Visita panorâmica da cidade nova de Jerusalém: O Knesset (Parlamento), a Residência Presidencial, o Teatro Municipal. Continuação para Ein Karem e visita do local de nascimento de São João Batista. Hospedagem. Em Jerusalem JANTAR INCLUIDO</li></ul>',
    order: 10,
    mainDestination: true,
    mainDestinationTitle: 'Jerusalém - Cidade Velha – Cidade Nueva – Jerusalém'
  },
  {
    title: '10/04',
    description: '<ul><li>Café da manhã. Visita panorâmica da cidade nova de Jerusalém: O Knesset (Parlamento), a Residência Presidencial, o Teatro Municipal. Visita ao Museu Israel onde se encontra o Santuário do Livro e a Maquete de Jerusalém na época de Jesus e posterior visita ao Museu do Holocausto. Hospedagem em Jerusalem. Continuação para Ein Karem e visita do local de nascimento de São João Batista.</li></ul>',
    order: 11,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '11/04 - Jerusalem- Eliat- Taba- SHAREM',
    description: '<ul><li>Café da manhã. Traslado a fronteira de Taba – Cruzamos o Egito e viagem a Sharem El Sheik- Chegada e traslado ao Hotel in Sharm El Sheikh. Hospedagem- Jantar</li></ul>',
    order: 12,
    mainDestination: true,
    mainDestinationTitle: 'Jerusalem- Eliat- Taba- SHAREM'
  },
  {
    title: '12/04 - Dia Livre',
    description: '<ul><li>Dia livre em Sharm El Sheikh. Em horário voo com destino ao Cairo.</li></ul>',
    order: 13,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '13/04 - Cairo – Aswan',
    description: '<ul><li>Partida para a famosa Praça para visitar o Museu Egipcio, onde se encontra o tesouro de Tutankhamom- Voo com destino a Aswan- Chegada e traslado ao Hotel em Aswan- Hospedagem e Jantar.</li></ul>',
    order: 14,
    mainDestination: true,
    mainDestinationTitle: 'Cairo – Aswan'
  },
  {
    title: '14/04 - Embarque em navio para Tour pelo Nilo',
    description: '<ul><li>Café da manhã. Após chegada e traslado ao porto fluvial para embarcar no cruzeiro pelo famoso Rio Nilo. Visita ao obelisco inacabado. A bordo será Pensão Completa.</li><li>Navegação para Luxor. Chegada e visita da margem oriental do Rio Nilo, onde podemos contemplar o Templo de Karnak, construído no ano 2000 A.C. e dedicado ao Amón Ra. É o maior templo no Egito, uma vez que é composto por 22 templos. A seguir visitaremos o Templo de Luxor, que foi construído durante a Dinastia Moderna, no ano 1450 A.c. durante o reinado de Amenófis e Ramsés II. Jantar e hospedagem a bordo. PENSÃO COMPLETA</li></ul>',
    order: 15,
    mainDestination: true,
    mainDestinationTitle: 'Tour pelo Nilo'
  },
  {
    title: '15/04 - Aswan- Kom Ombo- Edfu- CRUISE',
    description: '<ul><li>Café da manhã. Navegando pelo Kom Ombo para visitar o Templo dos Deuses SOBEK e Haroeris. Continuaremos velejando para Edfu. Visita ao Templo do deus Horus, considerado o mais perfeito. Templo da antiga civilização egípcia. Jantar e hospedagem a bordo.</li></ul>',
    order: 16,
    mainDestination: true,
    mainDestinationTitle: 'Aswan- Kom Ombo- Edfu- CRUISE'
  },
  {
    title: '16/04 - Edfu – Luxor CRUISE',
    description: '<ul><li>Café da manhã. Navageção para Luxor. Chegada e visita da margem oriental do Rio Nilo, onde podemos contemplar o Templo de Karmak, contruido no ano 2000 A.C e dedicado a Amon. É o maior templo do egito, uma vez que é composto por 22 templos. A seguir visitaremos o Templo de Luxor, onde foi contruido durante a dinastia Moderna, no ano de 1450 AC, durante o reibado de Amenofis e Ramses II. Jantar e hospedagem a bordo.</li></ul>',
    order: 17,
    mainDestination: true,
    mainDestinationTitle: 'Edfu – Luxor CRUISE'
  },
  {
    title: '17/04 - Luxor- Cairo – Voo Luxor – Cairo',
    description: '<ul><li>Café da manhã. Desembarque para tomar uma balsa onde atravessaremos o Rio Nilo até a costa ocidental para visitar o Vale dos Reis, Medinet Habu, o Templo da Rainha Hatshepsut e colossos de Memnon. Traslado ao aeroporto para tomar voo com destino ao Cairo. Chegada ao Hotel- Hospedagem- Jantar por conta do passageiro.</li></ul>',
    order: 18,
    mainDestination: true,
    mainDestinationTitle: 'Luxor- Cairo – Voo Luxor – Cairo'
  },
  {
    title: '18/04 - Luxor- Cairo – Voo Luxor – Cairo',
    description: '<ul><li>Café da manhã- Partida para Giza para visitar a Esfinge, as pirâmides de Khufu, Khafre e Mikerinos. Iremos para a cidadela para visitar a Mesquita de Alabastro e o mercado Khan el Khali. Hospedagem. Jantar incluso.</li></ul>',
    order: 19,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '19/04 - Dia Livre',
    description: '<ul><li>Café da Manhã – Opcional Excursão a Alexandria</li></ul>',
    order: 20,
    mainDestination: false,
    mainDestinationTitle: ''
  },
  {
    title: '20/04 - Retorno',
    description: '<ul><li>Check out em embarque ao Brasil as 15h40 e com chegada ao Brasil no dia 21 abril as 04h55 da manhã. Fim da nossa aventura</li></ul>',
    order: 21,
    mainDestination: false,
    mainDestinationTitle: ''
  },
].map(item => ({
  createdAt: new Date(),
  updatedAt: new Date(),
  ...item,
}));

const tripData = {
  slug: 'terra-santa-03-2021',
  featured: true,
  title: 'Terra Santa – Palestina – Israel - Egito',
  subTitle: 'Uma Jornada em Sua Espiritualidade!',
  backgroundId: 4,
  bannerId: 5,
  bannerPosition: 'center center',
  titlePosition: 'center',
  type: 'TURISMO',
  days: 22,
  minSize: 16,
  destinationsQty: 4,
  departure: '2021-03-30',
  bookStart: '2020-06-21',
  bookEnd: '2021-03-01',
  description: JSON.stringify({
    title: 'Uma Jornada em Sua Espiritualidade!',
    description: 'Proposta: Conduzir AMIGOS para conhecerem o MUNDO, para turismo, lazer, compras e principalmente para vivencias, aprimoramento pessoal e matar a saudade dos Amigos! Ir a Terra Santa é como viajar no tempo para conhecer a origem ancestral da fé divina e observar, na rotina diária, a esperança da fé humana! Em comemoração a minha formatura em TEOLOGIA visitarei a Terra Santa com meus Amigos do Brazil! Aviso: Somente para ex-participantes do Projeto, familiares ou apresentados.',
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

    const backgroundId = 1;
    const bannerId = 1;

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
