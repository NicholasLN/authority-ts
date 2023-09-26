import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

import { logError } from "./logging";

function uploadFile(file: any, fileName: string): Promise<any> {
  // if (
  //   process.env.AWS_ACCESS_KEY_ID != "your aws access key id" &&
  //   process.env.AWS_SECRET_ACCESS_KEY != "your aws secret key" &&
  //   process.env.AWS_S3_BUCKET_NAME != "your aws bucket name"
  // ) {
  //   const config = new 
  //   const s3 = new S3({
  //     ke: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   });

  //   const params = {
  //     Bucket: process.env.AWS_S3_BUCKET_NAME,
  //     Key: fileName,
  //     Body: new Buffer(file.buffer, "binary"),
  //     "Content-Type": file.mimetype,
  //     "Content-Disposition": "inline; filename=" + fileName,
  //     ACL: "public-read",
  //     fileUpload: true,
  //   };

  //   console.log(params);

  //   // upload and return a url
  //   return new Upload({
  //     client: s3,
  //     params: params as any
  //   }).done();
  // } else {
  //   logError(
  //     "AWS S3 credentials not set. You will not be able to upload files."
  //   );
  //   return Promise.reject({ msg: "No AWS credentials" });
  // }
  return Promise.reject({msg: "Not supported at this time."});
}

export default uploadFile;
