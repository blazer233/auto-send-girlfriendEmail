const nodemailer = require("nodemailer");
const { default: Axios } = require("axios");
const schedule = require("node-schedule");
const url = "https://chp.shadiao.app/api.php";
const getHoneyedWords = () => Axios.get(url);

// 发送邮件函数
const sendMail = async text => {
  var user = ""; //自己的邮箱
  var pass = ""; //qq邮箱授权码,如何获取授权码下面有讲
  var to = ""; //对方的邮箱
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user, // 用户账号
      pass, //授权码,通过QQ获取
    },
  });
  await transporter.sendMail({
    from: `me<${user}>`, // sender address
    to: `you<${to}>`, // list of receivers
    subject: "小羊咩咩", // Subject line
    text: text, // plain text body
  });
  console.log("success");
};

//每天下午5点21分发送
schedule.scheduleJob({ hour: 23, minute: 59 }, async () => {
  console.log("start:" + new Date());
  let res = await getHoneyedWords();
  console.log(res.data);
  sendMail(`现在是晚上${23}点 ${59}分 ：
  
            ${res.data}`);
});
