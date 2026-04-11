import imageCompression from "browser-image-compression";

export const imageCompressionBlob = async (blob: Blob, fileName: string) => {
  const file = new File([blob], `${fileName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
  const compressionFile = await imageCompression(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    initialQuality: 0.6,
    fileType: "image/webp",
  });
  return compressionFile;
};
