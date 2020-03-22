import { Request, Response } from 'express';

import { User } from '@models/index';

class UserController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await User.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const user = await User.create(body);

    return res.json(user);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id, deleted: false },
    });

    if (!user) return res.status(404).send();

    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const user = await User.findOne({
      where: { id, deleted: false },
    });

    if (!user) return res.status(404).send();

    await user.update(body);

    return res.json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id, deleted: false },
    });

    if (!user) return res.status(404).send();

    await user.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new UserController();
