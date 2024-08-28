const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  Amazon_Access_key,
  Amazon_Secret_access_key,
  Amazon_Bucket_Name,
} = require("../config");

const s3client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: Amazon_Access_key,
    secretAccessKey: Amazon_Secret_access_key,
  },
});

async function uploadAndShareFile(data) {
  try {
    const key = `files/users/${Date.now()}-expenses.txt`;

    const uploadCommand = new PutObjectCommand({
      Bucket: Amazon_Bucket_Name,
      Key: key,
      Body: data,
    });

    await s3client.send(uploadCommand);

    const getObjectCommand = new GetObjectCommand({
      Bucket: Amazon_Bucket_Name,
      Key: key,
    });
    const Send = await s3client.send(getObjectCommand);

    const presignedUrl = await getSignedUrl(s3client, getObjectCommand);

    return presignedUrl;
  } catch (error) {
    console.error("Error uploading and sharing file:", error);
  }
}

module.exports = {
  uploadAndShareFile,
};
