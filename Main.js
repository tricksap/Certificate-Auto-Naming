require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const homeDir = require("os").homedir();

const targetDir = `${homeDir}/Desktop/AutoCertificate/`;
// const desktopDir = `${homeDir}/Desktop/AutoCertificate/`;

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
  console.log("folder Created");
}

let names = ["fofo babar", "babarr fooba"];
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//download image
const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

for (n of names) {
  //customize the certificate with the specific names in the var n
  const url = cloudinary.url("5819472-01_hxyono", {
    transformation: [
      {
        overlay: {
          font_family: "Montserrat",
          font_size: 100,
          font_weight: "bold",
          text: n,
        },
        color: "#14b1ab",
        effect: "colorize",
        y: "-50",
        width: "1500",
      },
    ],
  });

  ////cloudinary upload code
  // cloudinary.uploader
  //   .upload(url)
  //   .then((result) => console.log(result.secure_url));

  //call download function
  (async () => {
    await download_image(url, targetDir + n + ".png");

    console.log(n + "Done"); // true
  })();
}
