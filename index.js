const robots = require("./robots");
const sendMail = require("./sendMail");
const CronJob = require("cron").CronJob;
new CronJob(
  "0 0 0 * * *",
  async () => {
    let { img, text, arr } = await robots();
    console.log("start:" + new Date(), text, img);
    sendMail({ img, text, arr });
  },
  null,
  true,
  "Asia/Chongqing"
);
