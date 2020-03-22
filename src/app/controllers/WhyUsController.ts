import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { WhyUs } from '@models/index';

class WhyUsController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await WhyUs.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const whyus = await WhyUs.create(body);

    return res.json(whyus);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const whyus = await WhyUs.findOne({
      where: { id, deleted: false },
    });

    if (!whyus) return res.status(404).send();

    return res.json(whyus);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const whyus = await WhyUs.findOne({
      where: { id, deleted: false },
    });

    if (!whyus) return res.status(404).send();

    await whyus.update(body);

    return res.json(whyus);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const whyus = await WhyUs.findOne({
      where: { id, deleted: false },
    });

    if (!whyus) return res.status(404).send();

    await whyus.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new WhyUsController();
