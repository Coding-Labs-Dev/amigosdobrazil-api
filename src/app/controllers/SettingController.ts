import { Request, Response } from 'express';

import { Setting } from '@models/index';

class SettingController {
  async show(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Setting.findByPk(1, {
        attributes: [
          'name',
          'email',
          'street',
          'neigh',
          'city',
          'state',
          'zip',
          'mainPhone',
          'altPhone',
          'maxInstallments',
          'maxNoInterestInstallments',
          'instagram',
          'facebook',
        ],
      }),
    );
  }
}

export default new SettingController();
