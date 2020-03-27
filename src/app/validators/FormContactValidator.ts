import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      name: yup
        .string()
        .min(3)
        .required(),
      email: yup
        .string()
        .email()
        .required(),
      subject: yup
        .string()
        .min(5)
        .required(),
      message: yup
        .string()
        .min(25)
        .required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
  delete: {
    params: yup.object().shape({}),
    body: yup.object().shape({}),
  },
};
