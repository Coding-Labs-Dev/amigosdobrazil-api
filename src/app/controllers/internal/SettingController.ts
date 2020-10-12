import { Request, Response } from 'express';

import { Setting } from '@models/index';

class SettingController {
  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const setting = await Setting.create(body);

    return res.json(setting);
  }

  async show(_req: Request, res: Response): Promise<Response> {
    return res.json(await Setting.findByPk(1));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const setting = await Setting.findByPk(1);

    if (!setting) return res.status(404).send();

    await setting.update(body);

    return res.json(setting);
  }
}

export default new SettingController();
