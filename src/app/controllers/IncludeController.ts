import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Include } from '@models/index';

class IncludeController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Include.findAll({
        where: { deleted: false },
      }),
    );
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
