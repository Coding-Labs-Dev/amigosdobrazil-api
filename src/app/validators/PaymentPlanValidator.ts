import * as yup from 'yup';

export default {
  store: {
    params: yup.object().shape({}),
    body: yup.object().shape({
      tripId: yup.number().required(),
      date: yup.date().required(),
      usd: yup.number().required(),
      brl: yup.number().required(),
      downPayment: yup.number().required(),
      installmentsQty: yup.number().required(),
      installmentsValue: yup.number().required(),
    }),
  },
  update: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({
      tripId: yup.number(),
      date: yup.date(),
      usd: yup.number(),
      brl: yup.number(),
      downPayment: yup.number().required(),
      installmentsQty: yup.number().required(),
      installmentsValue: yup.number().required(),
    }),
  },
  delete: {
    params: yup.object().shape({
      id: yup.string().required(),
    }),
    body: yup.object().shape({}),
  },
};
