import * as yup from 'yup';

export default {
  store: {
    body: yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
      passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref('password')]),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string(),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword: string, field: yup.StringSchema) =>
          oldPassword ? field.required() : field,
        ),
      passwordConfirmation: yup
        .string()
        .min(6)
        .when('password', (password: string, field: yup.StringSchema) =>
          password ? field.required().oneOf([yup.ref('password')]) : field,
        ),
    }),
  },
};
