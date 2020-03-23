import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Trip } from '@models/index';

class TripController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Trip.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const trip = await Trip.create(body);

    return res.json(trip);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { slug: id, deleted: false },
    });

    if (!trip) return res.status(404).send();

    return res.json(trip);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const trip = await Trip.findOne({
      where: { id, deleted: false },
    });

    if (!trip) return res.status(404).send();

    await trip.update(body);

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
