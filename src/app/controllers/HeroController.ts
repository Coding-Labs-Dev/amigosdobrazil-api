import { Request, Response } from 'express';

import { Hero } from '@models/index';

class HeroController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Hero.findAll({
        where: { deleted: false },
      }),
    );
  }
}

export default new HeroController();
