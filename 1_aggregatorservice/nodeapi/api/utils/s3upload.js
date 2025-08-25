const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand
} = require('@aws-sdk/client-s3')

const AWSS3REGION = process.env.AWSS3REGION;
const AWSACCESSKEY = process.env.AWSACCESSKEY;
const AWSSECRETACCESSKEY = process.env.AWSSECRETACCESSKEY;

const s3Client = new S3Client({
    region: AWSS3REGION,
    credentials: {
        accessKeyId: AWSACCESSKEY,
        secretAccessKey: AWSSECRETACCESSKEY
    }
})

const Bucket = 'scrapperservicedata'

async function s3upload({ Body, ContentType, folder, fileName }) {

    const uploadParams = {
        Bucket,
        Key: `${folder}/${fileName}`,
        Body,
        ContentType
    }

    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command);

    const fileUrl = `https://${Bucket}.s3.${AWSS3REGION}.amazonaws.com/${folder}/${fileName}`;

    console.log(fileUrl)

    return fileUrl;
}

export default s3upload;