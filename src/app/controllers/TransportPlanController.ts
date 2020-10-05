import { Request, Response } from 'express';

import { TransportPlan, Trip } from '@models/index';

class TransportPlanController {
  async index(req: Request, res: Response): Promise<Response> {
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId, deleted: false },
      include: [
        {
          model: TransportPlan,
          as: 'transportPlans',
        },
      ],
    });

    if (!trip) return res.status(404).send();

    return res.json(trip.transportPlans);
  }
}

export default new TransportPlanController();
