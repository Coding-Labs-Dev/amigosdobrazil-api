import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

class TransactionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { body: fileData } = req;

    const parameters = {
      Bucket: process.env.S3_BUCKET,
      Key: `transactions/${uuid()}`,
      Body: JSON.stringify(fileData),
    };

    try {
      console.log('uploading', parameters);
      const response = await s3.putObject(parameters).promise();
      console.log('uploaded', response);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}

export default new TransactionController();
