import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import { User } from '@models/index';

class SessionController {
  // async index(_req: Request, res: Response): Promise<Response> {
  //   return res.json(
  //     await Session.findAll({
  //       where: { deleted: false },
  //     }),
  //   );
  // }

  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).send();

    if (!(await user.checkPassword(password))) return res.status(401).send();

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  // async show(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const session = await Session.findOne({
  //     where: { id, deleted: false },
  //   });

  //   if (!session) return res.status(404).send();

  //   return res.json(session);
  // }

  // async update(req: Request, res: Response): Promise<Response> {
  //   const { body } = req;
  //   const { id } = req.params;
  //   const session = await Session.findOne({
  //     where: { id, deleted: false },
  //   });

  //   if (!session) return res.status(404).send();

  //   await session.update(body);

  //   return res.json(session);
  // }

  // async delete(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const session = await Session.findOne({
  //     where: { id, deleted: false },
  //   });

  //   if (!session) return res.status(404).send();

  //   await session.update({ deleted: true });

  //   return res.status(200).send();
  // }
}

export default new SessionController();
