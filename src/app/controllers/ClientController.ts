import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { Client } from '@models/index';

class ClientController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await Client.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const client = await Client.create(body);

    return res.json(client);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, deleted: false },
    });

    if (!client) return res.status(404).send();

    return res.json(client);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, deleted: false },
    });

    if (!client) return res.status(404).send();

    await client.update(body);

    return res.json(client);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id, deleted: false },
    });

    if (!client) return res.status(404).send();

    await client.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new ClientController();
