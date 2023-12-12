import AWS from "aws-sdk";

export class DB {
    documentClient: AWS.DynamoDB.DocumentClient;
  
    constructor() {
        
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

      this.documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1'});
    }
  
    async create(params: any): Promise<any> {
        try {
          console.log('Guardado correctamente en DynamoDB');
          await this.documentClient.put(params).promise();
         
        } catch (error) {
          console.error('Error al guardar en DynamoDB:', error);
          throw error;
        }
      }
      async getItemBySession(session: string): Promise<any> {
        try {
          if (session.length !== 128) {
            throw new Error('Solicitud incorrecta: Longitud de sesión inválida');
          }
      
          const params = {
            TableName: 'sesiones-alumnos',
            FilterExpression: 'sessionString = :session',
            ExpressionAttributeValues: {
              ':session': session,
            },
          };
      
          const data = await this.documentClient.scan(params).promise();
          return data.Items;
        } catch (error) {
          console.error('Error al obtener el elemento desde DynamoDB:', error);
          throw error;
        }
      }
      
      
      async updateSession(session: string): Promise<boolean> {
      try {
        const active = false;
        const sessionData = await this.getItemBySession(session);
    
        if (sessionData.length > 0) {
          const sessionToUpdate = sessionData[0];
          sessionToUpdate.active = active; 
          const params = {
            TableName: 'sesiones-alumnos',
            Key: {
              'id': sessionToUpdate.id 
            },
            UpdateExpression: 'SET active = :active',
            ExpressionAttributeValues: {
              ':active': active
            }
          };
    
          await this.documentClient.update(params).promise();
          console.log('Sesión actualizada exitosamente.');
          return true; 
        } else {
          console.log('No se encontró la sesión con sessionString:', session);
          return false;
        }
      } catch (error) {
        console.error('Error al actualizar la sesión:', error);
        throw error;
      }
    }
    
  }
  