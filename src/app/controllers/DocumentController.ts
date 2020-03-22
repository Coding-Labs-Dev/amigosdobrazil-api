import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Document } from '@models/index';

class DocumentController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Document.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const document = await Document.create(body);

    return res.json(document);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const document = await Document.findOne({
      where: { id, deleted: false },
    });

    if (!document) return res.status(404).send();

    return res.json(document);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const document = await Document.findOne({
      where: { id, deleted: false },
    });

    if (!document) return res.status(404).send();

    await document.update(body);

    return res.json(document);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const document = await Document.findOne({
      where: { id, deleted: false },
    });

    if (!document) return res.status(404).send();

    await document.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new DocumentController();
