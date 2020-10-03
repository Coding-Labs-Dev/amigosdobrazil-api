import { Request, Response } from 'express';
import { getActivePlanIndex } from '@utils/ActivePlan';
import { getCanBook } from '@utils/CanBook';

import {
  Trip,
  File,
  Itinerary,
  Include,
  Document,
  PaymentPlan,
} from '@models/index';
import TransportPlan from '@models/TransportPlan';

class TripController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Trip.findAll({
        where: { deleted: false },
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['id', 'file', 'url'],
          },
          {
            model: File,
            as: 'bannerImage',
            attributes: ['id', 'file', 'url'],
          },
        ],
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const { includes = [], documents = [], itinerary = [] } = body;

    delete body.includes;
    delete body.documents;
    delete body.itinerary;
    delete body.paymentPlans;

    const trip = await Trip.create(body);

    await trip.setIncludes(includes);
    await trip.setDocuments(documents);
    await trip.setItinerary(itinerary);

    return res.json(trip);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { slug: id, active: true, deleted: false },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'file', 'url'],
        },
        {
          model: File,
          as: 'bannerImage',
          attributes: ['id', 'file', 'url'],
        },
        {
          model: Itinerary,
          as: 'itinerary',
        },
        {
          model: Include,
          as: 'includes',
          attributes: ['description'],
        },
        {
          model: Document,
          as: 'documents',
          attributes: ['description'],
        },
        {
          model: PaymentPlan,
          as: 'paymentPlans',
        },
        {
          model: TransportPlan,
          as: 'transportPlans',
        },
      ],
      order: [
        ['itinerary', 'order', 'ASC'],
        ['paymentPlans', 'date', 'ASC'],
      ],
    });

    if (!trip) return res.status(404).send();

    const { paymentPlans } = trip;

    const activePlanIndex = getActivePlanIndex(paymentPlans);

    const canBook =
      activePlanIndex >= 0 && getCanBook(trip.bookStart, trip.bookEnd);

    return res.json({ ...trip.toJSON(), canBook, activePlanIndex });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { id, deleted: false },
    });

    if (!trip) return res.status(404).send();

    await trip.update(body);

    const { includes = [], documents = [], itinerary = [] } = body;

    await trip.setIncludes(includes);
    await trip.setDocuments(documents);
    await trip.setItinerary(itinerary);

    return res.json(trip);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { id, deleted: false },
    });

    if (!trip) return res.status(404).send();

    await trip.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new TripController();
