import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({}),
    req: yup.object().shape({
      file: yup.object().required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
