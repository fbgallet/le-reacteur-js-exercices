const cloudinary = require("cloudinary").v2;
const convertToBase64 = require("../utils/convert");

cloudinary.config({
  cloud_name: "dzfqscodm",
  api_key: "914797663638773",
  api_secret: process.env.CLOUDINARY_API_KEY,
});

const uploadToCloudinaryAndGetUrl = async (buffer, options) => {
  const result = await cloudinary.uploader.upload(
    convertToBase64(buffer),
    options
  );
  return result.secure_url;
};

module.exports = uploadToCloudinaryAndGetUrl;
