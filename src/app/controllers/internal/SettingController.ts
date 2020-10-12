import { Request, Response } from 'express';

import { Setting } from '@models/index';

class SettingController {
  async show(_req: Request, res: Response): Promise<Response> {
    return res.json(await Setting.findByPk(1));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const setting = await Setting.findByPk(1);

    if (!setting) return res.status(404).send();

    const { name, address, contact, pagSeguro, socialMedia } = body;

    const settingsData = {
      name,
      ...address,
      ...contact,
      ...pagSeguro,
      ...socialMedia,
    };

    await setting.update(settingsData);

    return res.json(setting);
  }
}

export default new SettingController();
