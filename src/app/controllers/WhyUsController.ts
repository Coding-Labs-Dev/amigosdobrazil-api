import { Request, Response } from 'express';

import { WhyUs } from '@models/index';

class WhyUsController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await WhyUs.findAll({
        where: { deleted: false },
      }),
    );
  }
}

export default new WhyUsController();
