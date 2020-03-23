import { Request, Response, response } from 'express';
import Sequelize from 'sequelize';
import { PassThrough } from 'stream';
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

    const { originalname, mimetype, filename } = fileData;

    const [type, subType] = mimetype.split('/');

    const file = await File.create({
      file: filename,
      originalName: originalname,
      type,
      subType,
      userId: auth?.userId,
    });

    return res.json(file);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const file = await File.findOne({ where: { file: id } });

    if (!file) return res.status(404).send();

    const fileData = await getFile(id);

    const readStream = new PassThrough();
    readStream.end(fileData);

    res.set('Content-Type', `${file.type}/${file.subType}`);
    return readStream.pipe(res);
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
