import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      clientId: yup
        .number()
        .min(1)
        .required(),
      videoId: yup
        .number()
        .min(1)
        .required(),
      posterId: yup
        .number()
        .min(1)
        .required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      clientId: yup.number().min(1),
      videoId: yup.number().min(1),
      posterId: yup.number().min(1),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
