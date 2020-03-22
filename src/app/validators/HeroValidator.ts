import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      backgroundId: yup.number().required(),
      position: yup
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
        ])
        .required(),
      opacity: yup
        .number()
        .min(0.1)
        .max(1)
        .required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      backgroundId: yup.number(),
      position: yup
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
      opacity: yup
        .number()
        .min(0.1)
        .max(1),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
