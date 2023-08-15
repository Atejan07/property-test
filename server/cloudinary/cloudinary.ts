import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'ddm6kawa9',
  api_key: process.env.CLOUDINARY_API_KEY || '173743349211811',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'HuwrAiQ_RXtZ9xOgajZz0XnpoFs',
});

export async function handleUpload(file: any) {
  const res = await cloudinary.uploader.upload(file, {
    folder: 'properties',
    resource_type: 'auto',
  });
  return res;
}
