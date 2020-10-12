import { Request, Response } from 'express';

import { Setting } from '@models/index';

class SettingController {
  async show(_req: Request, res: Response): Promise<Response> {
    return res.json(await Setting.findByPk(1));
  }
}

export default new SettingController();
