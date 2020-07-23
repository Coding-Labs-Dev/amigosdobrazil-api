/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { parse, j2xParser as J2XParser } from 'fast-xml-parser';

import { ResponseError, CreateSession, Checkout } from './types';

const json2xml = new J2XParser({});

class PagSeguro {
  readonly credentials: {
    email: string;
    token: string;
  };

  readonly _production: boolean;

  readonly _url: string;

  private readonly api: AxiosInstance;

  public session?: string;

  constructor(
    { email, token, production } = {
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN,
      production: process.env.NODE_ENV === 'production',
    },
  ) {
    this.credentials = {
      email,
      token,
    };

    this._production = production;

    this._url = this._production
      ? 'https://ws.pagseguro.uol.com.br/v2'
      : 'https://ws.sandbox.pagseguro.uol.com.br/v2';

    this.api = axios.create({
      baseURL: this._url,
    });

    this.api.interceptors.request.use(req => {
      console.log('Request:', req);
      return req;
    });

    this.api.interceptors.response.use(res => {
      console.log('Response:', res);
      return res;
    });
  }

  get isProduction(): boolean {
    return this._production;
  }

  get pagSeguroURL(): string {
    return this._url;
  }

  async createSession(): Promise<string | ResponseError> {
    try {
      const { data } = await this.api.post('/sessions', null, {
        params: { ...this.credentials },
      });
      const parsed = parse(data) as CreateSession;
      this.session = parsed.session.id;
      return this.session;
    } catch (error) {
      console.log(error);
      return {
        error: { message: error.message, status: 500 },
      };
    }
  }

  async checkout(checkoutData: Checkout): Promise<any | ResponseError> {
    try {
      const xml = json2xml.parse(checkoutData);
      const { data } = await this.api.post('/transactions', xml, {
        headers: { 'Content-Type': 'application/xml; charset=ISO-8859-1' },
        params: { ...this.credentials },
      });
      const parsed = parse(data);
      return parsed;
    } catch (error) {
      console.log(error);
      return {
        error: { message: error.message, status: 500 },
      };
    }
  }
}

export default PagSeguro;
