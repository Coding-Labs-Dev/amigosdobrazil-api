import * as yup from 'yup';

const schema = {
  params: yup.object().shape({
    type: yup.string().required(),
  }),
};

export default schema;
