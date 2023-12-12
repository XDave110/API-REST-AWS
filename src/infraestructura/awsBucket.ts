import AWS from 'aws-sdk';

export class S3Service {
   
s3: AWS.S3;

constructor() {
   this.s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
      });
}

async uploadFileToBucket(filePath: string, fileBuffer: Buffer): Promise<string> {
    const params = {
      Bucket: 'api-awsbucket',
      Key: filePath,
      Body: fileBuffer,
      ACL: 'public-read',
    };
  
    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error('Error al subir archivo a S3:', error);
      throw new Error('Error al subir archivo a S3');
    }
  }

  }
  