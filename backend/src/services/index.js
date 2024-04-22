const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Secret_access_key, Access_key } = require("../config");

const s3client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: Access_key,
    secretAccessKey: Secret_access_key,
  },
});

async function uploadAndShareFile(data) {
  try {
    const key = `files/users/${Date.now()}-expenses.txt`;

    const uploadCommand = new PutObjectCommand({
      Bucket: "bucket.animesh.practice",
      Key: key,
      Body: data,
    });

    await s3client.send(uploadCommand);

    const getObjectCommand = new GetObjectCommand({
      Bucket: "bucket.animesh.practice",
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
