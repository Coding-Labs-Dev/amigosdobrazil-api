import { Request, Response } from 'express';
import PagSeguro from '@services/PagSeguro';
import Trip, { TripAttributes } from '@models/Trip';
import PaymentPlan from '@models/PaymentPlan';
import { getActivePlanIndex } from '@utils/ActivePlan';
import { getCanBook } from '@utils/CanBook';
import { parseCheckoutForm } from '@utils/PaymentParse';

class PaymentController {
  async store(req: Request, res: Response): Promise<Response> {
    const {
      body,
      params: { slug },
    } = req;
    const trip = await Trip.findOne({
      where: { slug, active: true, deleted: false },
      include: [
        {
          model: PaymentPlan,
          as: 'paymentPlans',
          attributes: ['id', 'date', 'downPayment'],
        },
      ],
      order: [['paymentPlans', 'date', 'ASC']],
    });

    if (!trip || !trip.paymentPlans) return res.status(404).send();

    const json = trip.toJSON() as TripAttributes;

    const { paymentPlans } = json;

    const activePlanIndex = getActivePlanIndex(paymentPlans);

    const canBook =
      activePlanIndex >= 0 && getCanBook(json.bookStart, json.bookEnd);

    if (!canBook) return res.status(404).send();

    const parsedData = parseCheckoutForm(body, json);

    const pagSeguro = new PagSeguro();
    const result = await pagSeguro.checkout(parsedData);
    if (result.error) return res.status(500).json(result);

    return res.json(result);
  }
}

export default new PaymentController();
