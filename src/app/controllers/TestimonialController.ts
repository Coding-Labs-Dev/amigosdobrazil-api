import { Request, Response } from 'express';

import { Testimonial } from '@models/index';

class TestimonialController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Testimonial.findAll({
        where: { deleted: false },
      }),
    );
  }
}

export default new TestimonialController();
