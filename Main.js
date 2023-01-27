require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const url = cloudinary.url("1664802569356wp6100717_arypi7", {
  transformation: [
    {
      overlay: {
        font_family: "Poppins",
        font_size: 100,
        font_weight: "bold",
        text: "Patrick Ray P Sapusao sapusao sapusao",
      },
      color: "#333",
      effect: "colorize",
      y: "0",
      width: "1000",
    },
  ],
});

console.log(url);
