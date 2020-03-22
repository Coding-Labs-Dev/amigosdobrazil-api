import * as yup from 'yup';

export default {
  params: yup.object().shape({
    type: yup.string().required(),
  }),
};
