import { Request, Response } from 'express';

import { FormContact } from '@models/index';

class FormContactController {
  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const formContact = await FormContact.create(body);

    return res.json(formContact);
  }
}

export default new FormContactController();
