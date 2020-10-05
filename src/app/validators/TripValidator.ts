import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      featured: yup.boolean(),
      title: yup.string().required(),
      subTitle: yup.string().required(),
      backgroundId: yup.number(),
      backgroundPosition: yup
        .string()
        .oneOf([
          'left top',
          'left center',
          'left bottom',
          'right top',
          'right center',
          'right bottom',
          'center top',
          'center center',
          'center bottom',
        ]),
      titlePosition: yup.string().oneOf(['top', 'center', 'bottom']),
      days: yup.number().required(),
      minSize: yup.number().required(),
      destinationsQty: yup.number().required(),
      departure: yup.date().required(),
      description: yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      featured: yup.boolean(),
      title: yup.string(),
      subTitle: yup.string(),
      backgroundId: yup.number(),
      backgroundPosition: yup
        .string()
        .oneOf([
          'left top',
          'left center',
          'left bottom',
          'right top',
          'right center',
          'right bottom',
          'center top',
          'center center',
          'center bottom',
        ]),
      titlePosition: yup.string().oneOf(['top', 'center', 'bottom']),
      days: yup.number(),
      minSize: yup.number(),
      destinationsQty: yup.number(),
      departure: yup.date(),
      description: yup.object().shape({
        title: yup.string(),
        description: yup.string(),
      }),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
