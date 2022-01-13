const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "hoangvu1952000@gmail.com",
      pass: "nguyenhoangvu1952000",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info?.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
