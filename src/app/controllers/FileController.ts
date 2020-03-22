import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { File } from '@models/index';

class FileController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await File.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const file = await File.create(body);

    return res.json(file);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const file = await File.findOne({
      where: { id, deleted: false },
    });

    if (!file) return res.status(404).send();

    return res.json(file);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const file = await File.findOne({
      where: { id, deleted: false },
    });

    if (!file) return res.status(404).send();

    await file.update(body);

    return res.json(file);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const file = await File.findOne({
      where: { id, deleted: false },
    });

    if (!file) return res.status(404).send();

    await file.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new FileController();
