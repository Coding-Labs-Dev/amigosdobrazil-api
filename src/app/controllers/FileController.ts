import { Request, Response } from 'express';
import { File } from '@models/index';
import { getFile } from '@utils/File';

class FileController {
  async show(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;

    const file = await File.findOne({ where: { file: id } });

    if (!file) return res.status(404).send();

    const fileData = await getFile(id);

    if (!fileData) return res.status(404).send();

    if (typeof fileData === 'string') return res.redirect(fileData);

    res.set('Content-Type', `${file.type}/${file.subType}`);
    return res.send(fileData);
  }
}

export default new FileController();
