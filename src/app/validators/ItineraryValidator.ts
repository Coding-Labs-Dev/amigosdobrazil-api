import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      tripId: yup.number().required(),
      title: yup.string().required(),
      description: yup.string().required(),
      order: yup.number().required(),
      mainDestination: yup.boolean().required(),
      mainDestinationTitle: yup
        .string()
        .when(
          'mainDestination',
          (mainDestination: string, field: yup.BooleanSchema) =>
            mainDestination ? field.required() : field,
        ),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      tripId: yup.number(),
      title: yup.string(),
      description: yup.string(),
      order: yup.number(),
      mainDestination: yup.boolean(),
      mainDestinationTitle: yup
        .string()
        .when(
          'mainDestination',
          (mainDestination: string, field: yup.BooleanSchema) =>
            mainDestination ? field.required() : field,
        ),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
