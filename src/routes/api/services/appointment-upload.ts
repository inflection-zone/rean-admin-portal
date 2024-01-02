import * as fs from 'fs';
import { S3 } from 'aws-sdk';
import {BUCKET_NAME} from '$env/static/private';
import {ACCESS_KEY_ID} from '$env/static/private';
import {SECRET_ACCESS_KEY} from '$env/static/private';
import {REGION} from '$env/static/private';

export const uploadAppoinmentPdf = async (
    fileName:string,
	filePath:string,
	) => {

        const s3 = new S3({
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey:SECRET_ACCESS_KEY,
            region: REGION,
          });
        
          const bucketName = BUCKET_NAME;
          const filePathOnS3 = `${fileName}`; // Replace with your desired path and filename
          const fileContent = fs.createReadStream(filePath); // Replace with the content or buffer of your file
        
          const params = {
            Bucket: bucketName,
            Key: filePathOnS3,
            Body: fileContent,
          };
        
          try {
            await s3.upload(params).promise();
            return {
              status: 200,
              body: { success: true, message: 'File uploaded successfully to S3.' },
            };
          } catch (error) {
            console.error('Error uploading file to S3:', error);
            return {
              status: 500,
              body: { success: false, message: 'Error uploading file to S3.' },
            };
          }

};