import { Request, Response } from 'express';

import { Include, Trip } from '@models/index';

class IncludeController {
  async index(req: Request, res: Response): Promise<Response> {
    const { tripId } = req.params;
    const trip = await Trip.findOne({
      where: { id: tripId, deleted: false },
      include: [
        {
          model: Include,
          as: 'includes',
        },
      ],
    });

    if (!trip) return res.status(404).send();

    return res.json(trip.includes);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const include = await Include.create(body);

    return res.json(include);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const include = await Include.findOne({
      where: { id, deleted: false },
    });

    if (!include) return res.status(404).send();

    return res.json(include);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const include = await Include.findOne({
      where: { id, deleted: false },
    });

    if (!include) return res.status(404).send();

    await include.update(body);

    return res.json(include);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const include = await Include.findOne({
      where: { id, deleted: false },
    });

    if (!include) return res.status(404).send();

    await include.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new IncludeController();
