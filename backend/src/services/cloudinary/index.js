const { v2: cloudinary } = require("cloudinary");
const config = require("../../config");

cloudinary.config({
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRECT,
    cloud_name: config.CLOUDINARY_CLOUD_NAME
});

const uploadphotoincloudinary = async (images) => {
    try {
        const upload = await cloudinary.uploader.upload(images, {
            folder: "expesnsetracker"
        });
        return upload.url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error(`Error in uploadphotoincloudinary function: ${error.message}`);
    }
};

module.exports = { uploadphotoincloudinary };