import { Request, Response } from 'express';

import { FormContact } from '@models/index';

class FormContactController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await FormContact.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const formContact = await FormContact.create(body);

    return res.json(formContact);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const formContact = await FormContact.findOne({
      where: { id, deleted: false },
    });

    if (!formContact) return res.status(404).send();

    return res.json(formContact);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const formContact = await FormContact.findOne({
      where: { id, deleted: false },
    });

    if (!formContact) return res.status(404).send();

    await formContact.update(body);

    return res.json(formContact);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const formContact = await FormContact.findOne({
      where: { id, deleted: false },
    });

    if (!formContact) return res.status(404).send();

    await formContact.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new FormContactController();
