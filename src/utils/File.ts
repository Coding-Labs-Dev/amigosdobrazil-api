import fs from 'fs';
import path from 'path';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({ region: 'us-east-1' });

export async function getFile(
  fileKey: string,
): Promise<Buffer | string | null> {
  if (process.env.STORAGE === 's3') {
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    });
    return signedUrl;
  }

  const file = fs.readFileSync(path.resolve(process.cwd(), 'tmp', fileKey));
  if (!file) return null;
  return file;
}

export async function deleteFile(fileKey: string): Promise<void> {
  if (process.env.STORAGE === 's3') {
    await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
      })
      .promise();
  } else {
    fs.unlinkSync(path.resolve(process.cwd(), 'tmp', fileKey));
  }
}
