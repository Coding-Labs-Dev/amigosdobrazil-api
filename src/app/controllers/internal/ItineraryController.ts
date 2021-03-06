import { Request, Response } from 'express';

import { Itinerary, Trip } from '@models/index';

class ItineraryController {
  async index(req: Request, res: Response): Promise<Response> {
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId, deleted: false },
      include: [
        {
          model: Itinerary,
          as: 'itinerary',
        },
      ],
      order: [[{ model: Itinerary, as: 'itinerary' }, 'order', 'ASC']],
    });

    if (!trip) return res.status(404).send();

    return res.json(trip.itinerary);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const itinerary = await Itinerary.create(body);

    return res.json(itinerary);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const itinerary = await Itinerary.findOne({
      where: { id, deleted: false },
    });

    if (!itinerary) return res.status(404).send();

    return res.json(itinerary);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const itinerary = await Itinerary.findOne({
      where: { id, deleted: false },
    });

    if (!itinerary) return res.status(404).send();

    await itinerary.update(body);

    return res.json(itinerary);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const itinerary = await Itinerary.findOne({
      where: { id, deleted: false },
    });

    if (!itinerary) return res.status(404).send();

    await itinerary.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new ItineraryController();
