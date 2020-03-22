varName="$(tr [A-Z] [a-z] <<< "$1")"
modelName="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"


cat > ./src/app/controllers/${modelName}Controller.ts << EOF
import { Request, Response } from 'express';
import Sequelize from 'sequelize';

import { $modelName } from '@models/index';

class ${modelName}Controller {
  async index(_req: Request, res: Response): Promise<Response> {
    return res.json(
      await $modelName.findAll({
        where: { deleted: false },
      }),
    );
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const $varName = await $modelName.create(body);

    return res.json($varName);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const $varName = await $modelName.findOne({
      where: { id, deleted: false },
    });

    if (!$varName) return res.status(404).send();

    return res.json($varName);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const $varName = await $modelName.findOne({
      where: { id, deleted: false },
    });

    if (!$varName) return res.status(404).send();

    await $varName.update(body);

    return res.json($varName);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const $varName = await $modelName.findOne({
      where: { id, deleted: false },
    });

    if (!$varName) return res.status(404).send();

    await $varName.update({ deleted: true });

    return res.status(200).send();
  }
}

export default new ${modelName}Controller();
EOF