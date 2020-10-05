import { Request, Response } from 'express';
import { File } from '@models/index';
import { getFile } from '@utils/File';

class FileController {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await File.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { file: fileData } = req;
    const { auth } = req;

    const { originalname, mimetype, filename, key } = fileData;

    const [type, subType] = mimetype.split('/');

    const file = await File.create({
      file: key || filename,
      originalName: originalname,
      type,
      subType,
      userId: auth?.userId,
    });

    return res.json(file);
  }

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

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const file = await File.findOne({
      where: { id, deleted: false },
    });

    if (!file) return res.status(404).send();

    await file.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new FileController();
