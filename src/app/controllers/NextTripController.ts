import { Request, Response } from 'express';
import { Trip, File } from '@models/index';

class NextTripsController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Trip.findAll({
        where: { deleted: false, active: true, featured: true },
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['url', 'file'],
          },
        ],
        attributes: ['title', 'date', 'slug', 'background', 'departure'],
      }),
    );
  }
}

export default new NextTripsController();
