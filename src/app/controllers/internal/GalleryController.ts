import { Request, Response } from 'express';

import { Gallery, Photo, File } from '@models/index';

class ClientController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Gallery.findAll({
        where: { deleted: false },
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

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { title, photos } = body;

    const gallery = await Gallery.create({ title });

    await Promise.all(
      photos.map(async (photo: number) =>
        Photo.create({ fileId: photo, galleryId: gallery.id }),
      ),
    );

    return res.json(gallery);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const client = await Gallery.findOne({
      where: { id, deleted: false },
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
    });

    if (!client) return res.status(404).send();

    return res.json(client);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const gallery = await Gallery.findOne({
      where: { id, deleted: false },
      include: [
        {
          model: Photo,
          as: 'photos',
        },
      ],
    });

    if (!gallery) return res.status(404).send();

    const { title, active, photos, photosIds } = body;

    const galleryData = {
      title,
      active,
    };

    await gallery.update(galleryData);

    const removedPhotos = gallery.photos
      .filter(photo => !photosIds.includes(photo.id))
      .map(photo => photo.id);

    if (removedPhotos.length)
      await Photo.destroy({ where: { id: removedPhotos } });

    if (photos && photos.length)
      await Promise.all(
        photos.map(async (photo: number) =>
          Photo.create({ fileId: photo, galleryId: gallery.id }),
        ),
      );

    return res.json(gallery);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const gallery = await Gallery.findOne({
      where: { id, deleted: false },
    });

    if (!gallery) return res.status(404).send();

    await gallery.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new ClientController();
