const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "kakihari03@gmail.com",
    pass: "jswp ltht cugn jjlw",
  },
});


async function sendMail(email,subject,text,htmlText) {
 
  const info = await transporter.sendMail({
    from: 'kakihari03@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;