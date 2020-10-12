import { Request, Response } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import { User } from '@models/index';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).send();

    if (!(await user.checkPassword(password))) return res.status(401).send();

    const { id, name, surname } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const refreshToken = jwt.sign({ id }, authConfig.secret);

    return res.json({
      user: {
        id,
        name,
        surname,
        email,
      },
      token: {
        token,
        refreshToken,
        type: 'bearer',
      },
    });
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { auth } = req;
    if (!auth) return res.status(401).send();

    const { userId: id } = auth;

    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(401).send();

    const { name, surname, email } = user;

    return res.json({
      user: {
        id,
        name,
        surname,
        email,
      },
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return process.env.NODE_ENV !== 'production'
        ? res
            .status(401)
            .json({ error: { message: 'No Refresh Token provided' } })
        : res.status(401).send();

    try {
      const decoded = (await promisify(jwt.verify)(
        refreshToken,
        authConfig.secret,
      )) as { id: number };

      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) return res.status(401).send();

      const token = jwt.sign({ id: decoded.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        token,
      });
    } catch (err) {
      return process.env.NODE_ENV !== 'production'
        ? res.status(401).json({ error: { message: err.message } })
        : res.status(401).send();
    }
  }
}

export default new SessionController();
