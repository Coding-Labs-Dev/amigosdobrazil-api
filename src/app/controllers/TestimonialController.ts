import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Testimonial } from '@models/index';

class TestimonialController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Testimonial.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const testimonial = await Testimonial.create(body);

    return res.json(testimonial);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const testimonial = await Testimonial.findOne({
      where: { id, deleted: false },
    });

    if (!testimonial) return res.status(404).send();

    return res.json(testimonial);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const testimonial = await Testimonial.findOne({
      where: { id, deleted: false },
    });

    if (!testimonial) return res.status(404).send();

    await testimonial.update(body);

    return res.json(testimonial);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const testimonial = await Testimonial.findOne({
      where: { id, deleted: false },
    });

    if (!testimonial) return res.status(404).send();

    await testimonial.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new TestimonialController();
