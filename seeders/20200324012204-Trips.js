'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Trips',
      [
        {
          slug: 'cape-town-04-2021',
          featured: true,
          title: 'Cape Town',
          subTitle: 'Conheça a Africa do Sul',
          backgroundId: 1,
          bannerId: 2,
          bannerPosition: 'center center',
          titlePosition: 'center',
          days: 19,
          minSize: 16,
          destinationsQty: 7,
          departure: '2021-04-11',
          description: JSON.stringify({
            title: 'Descubra as belezas da África do Sul',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus massa elit, suscipit convallis ante mollis eu. Maecenas lorem turpis, finibus lacinia dui vitae, efficitur hendrerit quam. Mauris sed finibus ex. Aliquam facilisis urna diam, non congue massa luctus vel. Phasellus pretium consectetur mi, sed consectetur enim auctor at. Suspendisse pretium odio neque, vehicula rutrum sem laoreet nec. Etiam eu lorem nec felis faucibus molestie eu ut urna. Nam dapibus lacus in rutrum dictum.',
          }),
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: 'china-08-2020',
          featured: true,
          title: 'China',
          subTitle: 'Conheça esta cultura milenar',
          backgroundId: 3,
          bannerId: 4,
          bannerPosition: 'center center',
          titlePosition: 'center',
          days: 15,
          minSize: 8,
          destinationsQty: 4,
          departure: '2020-08-11',
          description: JSON.stringify({
            title: 'Descubra as belezas da China',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus massa elit, suscipit convallis ante mollis eu. Maecenas lorem turpis, finibus lacinia dui vitae, efficitur hendrerit quam. Mauris sed finibus ex. Aliquam facilisis urna diam, non congue massa luctus vel. Phasellus pretium consectetur mi, sed consectetur enim auctor at. Suspendisse pretium odio neque, vehicula rutrum sem laoreet nec. Etiam eu lorem nec felis faucibus molestie eu ut urna. Nam dapibus lacus in rutrum dictum.',
          }),
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          slug: 'india-08-2021',
          featured: true,
          title: 'Índia',
          subTitle: 'Se surpreenda',
          backgroundId: 5,
          bannerId: 6,
          bannerPosition: 'center center',
          titlePosition: 'center',
          days: 20,
          minSize: 14,
          destinationsQty: 3,
          departure: '2021-08-11',
          description: JSON.stringify({
            title: 'Descubra as belezas da Índia',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus massa elit, suscipit convallis ante mollis eu. Maecenas lorem turpis, finibus lacinia dui vitae, efficitur hendrerit quam. Mauris sed finibus ex. Aliquam facilisis urna diam, non congue massa luctus vel. Phasellus pretium consectetur mi, sed consectetur enim auctor at. Suspendisse pretium odio neque, vehicula rutrum sem laoreet nec. Etiam eu lorem nec felis faucibus molestie eu ut urna. Nam dapibus lacus in rutrum dictum.',
          }),
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
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
