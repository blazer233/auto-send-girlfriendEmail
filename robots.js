const rp = require("request-promise");
const cheerio = require("cheerio");
const url = "http://wufazhuce.com";
module.exports = async () => {
  const opts = {
    url,
    transform: body => cheerio.load(body),
  };
  let $ = await rp(opts);
  let img = $("#carousel-one .carousel-inner .item.active>a>img").attr("src");
  let text = `现在是凌晨${0}点 ${0}分 ：${$("#carousel-one .fp-one-cita>a")
    .eq(0)
    .text()}`;
  let arr = "";
  $(".fp-one-articulo > ul > li > a").each(
    (index, item) =>
      (arr += `<p>${index + 1}、<a href='${$(item).attr("href")}'>${$(item)
        .text()
        .replace(/\s+/g, "")}</a></p><br/>`)
  );
  return { img, text, arr };
};
