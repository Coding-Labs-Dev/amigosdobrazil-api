import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Setting } from '@models/index';

class SettingController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Setting.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const setting = await Setting.create(body);

    return res.json(setting);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const setting = await Setting.findOne({
      where: { id, deleted: false },
    });

    if (!setting) return res.status(404).send();

    return res.json(setting);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const setting = await Setting.findOne({
      where: { id, deleted: false },
    });

    if (!setting) return res.status(404).send();

    await setting.update(body);

    return res.json(setting);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const setting = await Setting.findOne({
      where: { id, deleted: false },
    });

    if (!setting) return res.status(404).send();

    await setting.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new SettingController();
