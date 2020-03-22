import * as yup from 'yup';

const schema = {
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
    body: yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string(),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field,
        ),
      passwordConfirmation: yup
        .string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field,
        ),
    }),
  },
};

export default schema;
