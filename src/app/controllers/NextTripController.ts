import { Request, Response } from 'express';
import { Trip, File } from '@models/index';

class NextTripsController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Trip.findAll({
        where: { deleted: false, featured: true },
        order: [['departure', 'ASC']],
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['id', 'file', 'url'],
          },
        ],
      }),
    );
  }
}

export default new NextTripsController();
