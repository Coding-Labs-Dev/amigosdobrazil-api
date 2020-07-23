import { Request, Response } from 'express';
import PagSeguro from '@services/PagSeguro';

class PaymentSessionController {
  async store(_: Request, res: Response): Promise<Response> {
    const pagSeguro = new PagSeguro();
    const token = await pagSeguro.createSession();
    return res.json({ token });
  }
}

export default new PaymentSessionController();
