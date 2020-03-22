import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      socialMedia: yup.object().required(),
      mainPhone: yup.string().required(),
      altPhone: yup.string(),
      street: yup.string().required(),
      neigh: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zip: yup.string().required(),
      notes: yup.string(),
    }),
  },
  update: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      socialMedia: yup.object(),
      mainPhone: yup.string(),
      altPhone: yup.string(),
      street: yup.string(),
      neigh: yup.string(),
      city: yup.string(),
      state: yup.string(),
      zip: yup.string(),
      notes: yup.string(),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
