import AWS from 'aws-sdk';

export class SNSService {
  private sns: AWS.SNS;

  constructor() {
    this.sns = new AWS.SNS({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN, 
    });
  }

  async enviarMensajeAlumno(mensaje: string): Promise<void> {
    try {
      const topicArn = 'arn:aws:sns:us-east-1:660372242299:Final-Semestre'; 
      await this.sns.publish({
        TopicArn: topicArn,
        Message: mensaje,
      }).promise();
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw new Error('Error al enviar el mensaje al alumno.');
    }
  }
}
