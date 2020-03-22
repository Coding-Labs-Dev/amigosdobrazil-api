import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Hero } from '@models/index';

class HeroController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Hero.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const hero = await Hero.create(body);

    return res.json(hero);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const hero = await Hero.findOne({
      where: { id, deleted: false },
    });

    if (!hero) return res.status(404).send();

    return res.json(hero);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const hero = await Hero.findOne({
      where: { id, deleted: false },
    });

    if (!hero) return res.status(404).send();

    await hero.update(body);

    return res.json(hero);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const hero = await Hero.findOne({
      where: { id, deleted: false },
    });

    if (!hero) return res.status(404).send();

    await hero.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new HeroController();
