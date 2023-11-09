const cloudinary = require("cloudinary").v2;
const convertToBase64 = require("../utils/convert");

cloudinary.config({
  cloud_name: "dzfqscodm",
  api_key: "914797663638773",
  api_secret: "5CQRFjjg5aS0DIr2kdXJ3PKGuFc",
});

const uploadToCloudinaryAndGetUrl = async (buffer, options) => {
  const result = await cloudinary.uploader.upload(
    convertToBase64(buffer),
    options
  );
  return result.secure_url;
};

module.exports = uploadToCloudinaryAndGetUrl;
