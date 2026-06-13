const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlo5opq2z",
  api_key: "128355241398956",
  api_secret: "xdkBSdNlw93pNQBp53VNOT4TeTk",
});
(error, result) => {

  console.log("CLOUDINARY ERROR:", error);

  console.log("CLOUDINARY RESULT:", result);

  if (error) {
    return res.status(500).json(error);
  }

  // ...
}

module.exports = cloudinary;