import { Request, Response } from 'express';

import { Trip, Document } from '@models/index';

class DocumentController {
  async index(req: Request, res: Response): Promise<Response> {
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId, deleted: false },
      include: [
        {
          model: Document,
          as: 'documents',
        },
      ],
    });

    if (!trip) return res.status(404).send();

    return res.json(trip.documents);
  }
}

export default new DocumentController();
