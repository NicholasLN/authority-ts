import AWS from "aws-sdk";
import { logError } from "./logging";

function uploadFile(file: any, fileName: string): Promise<any> {
  if (
    process.env.AWS_ACCESS_KEY_ID != "your aws access key id" &&
    process.env.AWS_SECRET_ACCESS_KEY != "your aws secret key" &&
    process.env.AWS_S3_BUCKET_NAME != "your aws bucket name"
  ) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: new Buffer(file.buffer, "binary"),
      "Content-Type": file.mimetype,
      "Content-Disposition": "inline; filename=" + fileName,
      ACL: "public-read",
      fileUpload: true,
    };

    console.log(params);

    // upload and return a url
    return s3.upload(params as any).promise();
  } else {
    logError(
      "AWS S3 credentials not set. You will not be able to upload files."
    );
    return Promise.reject({ msg: "No AWS credentials" });
  }
}

export default uploadFile;
