import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary
 * @param fileData The image data (base64 string)
 * @param folderPath Optional folder path in Cloudinary
 * @returns The Cloudinary upload result
 */
export const uploadToCloudinary = async (
  fileData: string,
  folderPath: string = "DealDash/products"
) => {
  try {
    if (!fileData) {
      throw new Error("No file data provided");
    }

    if (typeof fileData !== "string" || !fileData.startsWith("data:image/")) {
      throw new Error("Invalid file data format; expected base64 image");
    }

    const result = await cloudinary.v2.uploader.upload(fileData, {
      folder: folderPath,
      resource_type: "image",
    });

    console.log("Upload successful:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error(
      `Failed to upload to Cloudinary: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};