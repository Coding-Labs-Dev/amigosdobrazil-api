import { Request, Response } from 'express';

import { Gallery, Photo, File } from '@models/index';

class ClientController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Gallery.findAll({
        where: { deleted: false, active: true },
        include: [
          {
            model: Photo,
            as: 'photos',
            attributes: ['id', 'fileId', 'galleryId'],
            include: [
              {
                model: File,
                as: 'photo',
                attributes: ['id', 'url', 'file'],
              },
            ],
          },
        ],
      }),
    );
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;
    const client = await Gallery.findOne({
      where: { slug, deleted: false },
      include: [
        {
          model: Photo,
          as: 'photos',
          include: [
            {
              model: File,
              as: 'photo',
              attributes: ['url', 'file'],
            },
          ],
        },
      ],
    });

    if (!client) return res.status(404).send();

    return res.json(client);
  }
}

export default new ClientController();
