/**
 * Package Types
 */

export interface ResponseError {
  error: {
    message: string;
    config?: object;
    response?: object;
    error?: object;
  };
}

/**
 * PagSeguro Requests Bodies
 */

/**
 * Commom Body
 */

export interface DefaultCheckoutBody {
  payment: {
    mode: 'default';
    currency: 'BRL';
    reference?: string;
    receiver: {
      email: string;
    };
    sender: {
      hash: string;
      name: string;
      email: string;
      phone: {
        areaCode: string;
        number: string;
      };
      documents: {
        document: {
          type: 'CPF' | 'CNPJ';
          value: string;
        };
      };
    };
    items: {
      item: {
        id: string;
        description: string;
        quantity: number;
        amount: string;
      }[];
    };
    shipping: {
      addressRequired: boolean;
      address?: {
        street: string;
        number: number;
        complement: string;
        district: string;
        city: string;
        state: string;
        country: 'BRL';
        postalCode: string;
      };
      type?: 1 | 2 | 3;
      cost?: string;
    };
    extraAmount?: string;
    notificationURL?: string;
  };
}
export type BoletoCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'boleto';
  };
};

export type CreditCardCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'creditCard';
    creditCard: {
      token: string;
      installment: {
        quantity: number;
        value: string;
        noInterestInstallmentQuantity: number;
      };
      holder: {
        name: string;
        documents: {
          document: {
            type: 'CPF' | 'CNPJ';
            value: string;
            birthDate: string;
          };
        };
        phone: {
          areaCode: string;
          number: string;
        };
      };
      billingAddress: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        complement: string;
      };
    };
  };
};

export type Checkout = BoletoCheckout | CreditCardCheckout;

/**
 * PagSeguro Responses
 */

export interface CreateSession {
  session: {
    id: string;
  };
}
