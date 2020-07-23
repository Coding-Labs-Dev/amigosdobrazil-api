import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as yup from 'yup';
import { ValidationError } from 'yup';

interface ValidationShchema {
  params?: yup.Schema<object>;
  body?: yup.Schema<object>;
  req?: yup.Schema<object>;
}

interface Validator {
  index?: ValidationShchema;
  store?: ValidationShchema;
  update?: ValidationShchema;
  show?: ValidationShchema;
  delete?: ValidationShchema;
}

const getValidationSchema = (
  method: string,
  url: string,
  validators: Validator,
): ValidationShchema | undefined => {
  const hasParam = typeof url.split('/').pop() === 'number';

  let key: 'index' | 'store' | 'update' | 'show' | 'delete' | null = null;

  if (!hasParam) {
    if (method === 'POST') {
      key = 'store';
    } else if (method === 'GET') {
      key = 'index';
    }
  } else if (method === 'GET') {
    key = 'show';
  } else if (method === 'PUT') {
    key = 'update';
  } else if (method === 'DELETE') key = 'delete';
  if (!key || !validators[key]) return undefined;

  if (process.env.NODE_ENV !== 'production')
    console.log('Validating', method, url, key);

  return validators[key];
};

export function validateErrorFormater(error: ValidationError): object {
  return {
    name: 'ValidationError',
    statusCode: 400,
    fields: error.inner.map(({ message, path, type }) => ({
      error: message,
      field: path,
      type,
    })),
  };
}

export default function Validator(validator: Validator): RequestHandler {
  const validate = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { params: paramsData, body: bodyData, method, url } = req;

    const validationSchema = getValidationSchema(method, url, validator);

    if (!validationSchema) {
      if (process.env.NODE_ENV !== 'production')
        console.log('Warning: No validation schema found');
      return next();
    }

    const { params, body, req: requestValidator } = validationSchema;

    if (!requestValidator && !params && !body) {
      if (process.env.NODE_ENV !== 'production')
        return next({
          name: 'ServerError',
          statusCode: 500,
          message: 'Invalid Validation Schema',
        });
      return next({
        statusCode: 500,
      });
    }

    try {
      if (requestValidator) {
        requestValidator.validateSync(req, { abortEarly: false });
        // .then(() => !params && !body && next())
        // .catch(error => next(validateErrorFormater(error)));
        if (!params && !body) return undefined;
      }

      if (params) {
        params.validateSync(paramsData, { abortEarly: false });
        //   .then(() => !body && next())
        //   .catch(error => next(validateErrorFormater(error)));
        // if (!body) return undefined;
      }
      if (body) {
        body.validateSync(bodyData, { abortEarly: false });
        // .then(() => next())
        // .catch(error => next(validateErrorFormater(error)));
      }
      return next();
    } catch (error) {
      return next(validateErrorFormater(error));
    }
  };
  return validate;
}
