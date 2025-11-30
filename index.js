import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";


inquirer
  .prompt([
    /* Pass your questions in here */
    {
    type: "input",
    name: "url",
    message: "Enter the URL you want to convert to a QR code:"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    answers = answers.url;

    var qr_png = qr.image(answers, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    var png_string = qr.imageSync(answers, { type: "png" });
    
    fs.writeFile("URL.txt", answers, function (err) {
      if (err) return console.log(err);
      console.log("URL saved to file.");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
        console.log("An error occurred:", error);
    }
  });

  
