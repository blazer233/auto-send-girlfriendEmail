const nodemailer = require("nodemailer");
const { default: Axios } = require("axios");
const rp = require("request-promise");
const cheerio = require("cheerio");
const schedule = require("node-schedule");
const url = "http://wufazhuce.com";

const robots = async () => {
  const opts = {
    url,
    transform: body => cheerio.load(body),
  };
  let $ = await rp(opts);
  let img = $("#carousel-one .carousel-inner .item.active>a>img").attr("src");
  let text = $("#carousel-one .fp-one-cita>a").eq(0).text();
  let arr = [];
  $(".fp-one-articulo > ul").each((index, item) => {
    let el = $(item);
    let title = el.find("a").text().trim();
    let href = el.find("a").attr("href");
    arr.push({ title, href });
  });
  return { img, text, arr };
};

// 发送邮件函数
const sendMail = async ({ img, text, arr }) => {
  var user = "839752074@qq.com"; //自己的邮箱
  var pass = ""; //qq邮箱授权码,如何获取授权码下面有讲
  var to = ""; //对方的邮箱
  var li_ = arr.map(
    ({ href: h, title: t }, index) =>
      `<li>${index + 1}、<a href='${h}'>${t}</a></li><br/>`
  );
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
    html: `<p>${text}<br/><img src="${img}"/><br/><ul>文章推荐${li_}</ul></p>`,
  });
  console.log("success");
};

//每天下午5点21分发送
schedule.scheduleJob({ hour: 0, minute: 1 }, async () => {
  let { img, text, arr } = await robots();
  console.log("start:" + new Date(), text, img);
  sendMail({
    img,
    text: `现在是晚上${0}点 ${1}分 ：${text}`,
    arr,
  });
});
