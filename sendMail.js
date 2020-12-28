const nodemailer = require("nodemailer");
const { user, pass, to, subject } = require("./config");
module.exports = ({ img, text, arr }) => {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.163.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user, // generated ethereal user
        pass, // generated ethereal password
      },
    });
    let mailOptions = {
      from: user, // sender address
      to, // list of receivers
      subject, // Subject line
      html: `<p>${text}<br/><img src="${img}"/><br/><p>文章推荐${arr}</p></p>`, // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.log(error);
      console.log("Message sent: %s", info.messageId);
    });
  });
};
