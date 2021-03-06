import { Request, Response } from 'express';

import { PaymentPlan, Trip } from '@models/index';

class PaymentPlanController {
  async index(req: Request, res: Response): Promise<Response> {
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId, deleted: false },
      include: [
        {
          model: PaymentPlan,
          as: 'paymentPlans',
        },
      ],
    });

    if (!trip) return res.status(404).send();

    return res.json(trip.paymentPlans);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const paymentplan = await PaymentPlan.create(body);

    return res.json(paymentplan);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const paymentplan = await PaymentPlan.findOne({
      where: { id, deleted: false },
    });

    if (!paymentplan) return res.status(404).send();

    return res.json(paymentplan);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const paymentplan = await PaymentPlan.findOne({
      where: { id, deleted: false },
    });

    if (!paymentplan) return res.status(404).send();

    await paymentplan.update(body);

    return res.json(paymentplan);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const paymentplan = await PaymentPlan.findOne({
      where: { id, deleted: false },
    });

    if (!paymentplan) return res.status(404).send();

    await paymentplan.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new PaymentPlanController();
