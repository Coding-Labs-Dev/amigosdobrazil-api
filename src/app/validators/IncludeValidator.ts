import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      description: yup.string().required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      description: yup.string(),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
