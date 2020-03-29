import { Request, Response } from 'express';
import { getFile } from '@utils/File';

class TOSController {
  async show(_req: Request, res: Response): Promise<Response> {
    const tosData = await getFile('tos.html');
    const tos = tosData?.toString();

    return res.send(tos);
  }
}

export default new TOSController();
