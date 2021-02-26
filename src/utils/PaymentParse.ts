import { Checkout } from '@services/PagSeguro/types';
import { TripAttributes } from '@models/Trip';

interface CheckoutFormData {
  name: string;
  cpf: string;
  rg: string;
  dob: string;
  nationality: string;
  maritalstatus: string;
  profession: string;
  email: string;
  phone: string;
  mobile: string;
  tos: boolean;
  senderHash: string;
  creditCardToken: {
    card: {
      token: string;
    };
  };
  installments: {
    installment: {
      quantity: number;
      installmentAmount: number;
      totalAmount: number;
      interstFree: boolean;
    };
  };
  address: {
    residential: {
      address: string;
      complement: string;
      number: string;
      neigh: string;
      city: string;
      district: string;
      zip: string;
    };
    commercial: {
      address: string;
      complement: string;
      number: string;
      neigh: string;
      city: string;
      district: string;
      zip: string;
    };
  };
}

export const parseCheckoutForm = (
  data: CheckoutFormData,
  trip: TripAttributes,
): Checkout => {
  return {
    payment: {
      mode: 'default',
      currency: 'BRL',
      reference: 'AmigosDoBrazil',
      method: 'creditCard',
      creditCard: {
        token: data.creditCardToken.card.token,
        installment: {
          quantity: data.installments.installment.quantity,
          value: Number(
            String(data.installments.installment.installmentAmount),
          ).toFixed(2),
          noInterestInstallmentQuantity: 3,
        },
        holder: {
          name: data.name,
          documents: {
            document: {
              type: 'CPF',
              value: data.cpf.replace(/\D/g, ''),
            },
          },
          birthDate: data.dob,
          phone: {
            areaCode: data.mobile.replace(/\D/g, '').slice(0, 2),
            number: data.mobile.replace(/\D/g, '').slice(2),
          },
        },
        billingAddress: {
          street: data.address.residential.address,
          number: data.address.residential.number,
          district: data.address.residential.district,
          city: data.address.residential.city,
          state: String(data.address.residential.district).toUpperCase(),
          country: 'BR',
          postalCode: data.address.residential.zip,
          complement: data.address.residential.complement,
        },
      },
      receiver: {
        email: process.env.PAGSEGURO_EMAIL,
      },
      sender: {
        hash: data.senderHash,
        name: data.name,
        email: data.email,
        phone: {
          areaCode: data.mobile.replace(/\D/g, '').slice(0, 2),
          number: data.mobile.replace(/\D/g, '').slice(2),
        },
        documents: {
          document: {
            type: 'CPF',
            value: data.cpf.replace(/\D/g, ''),
          },
        },
      },
      items: {
        item: [
          {
            id: trip.slug,
            description: `Amigos do Brazil - ${trip.slug}`,
            quantity: 1,
            amount: data.installments.installment.totalAmount.toFixed(2),
          },
        ],
      },
      shipping: {
        addressRequired: false,
      },
      notificationURL: process.env.PAGSEGURO_NOTIFICATION,
    },
  };
};
