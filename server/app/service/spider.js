const Service = require("egg").Service;
// https://www.npmjs.com/package/superagent
const superagent = require("superagent");
require("superagent-charset")(superagent);
// https://www.npmjs.com/package/cheerio
const cheerio = require("cheerio");

class SpiderService extends Service {
  // 爬取 上海旧书店 所有书籍（自家的书，只作用 Demo 示例）
  async fetchBookInfo(page) {
    let basePageUrl = `https://www.997788.com/5709/all_1_55_6006/?shop_id=5709&id1=55&s0=&s1=&s2=&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&s11=&s12=&s13=&s14=&s15=&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=&t10=&z=0&p=0&v=0&u=1&y=2&s=6006&ids=1710096&ide=1559515&jis=24&jie=880&page=${page}&pr=1#7`;
    return new Promise((resolve, reject) => {
      superagent
        .get(basePageUrl)
        .set(
          "Cookie",
          "PHPSESSID=hfr2104oeacjkjmcnt14vocgm2; login=1573832068; 997788p[sessionID]=bacc3c13f71de23b85ff5c1435f0c698; 997788p[check]=50a44be031b6553196758e7d8209aa65; 997788p[u_id]=1633115; 997788p[login_date]=2019-11-15+23%3A34%3A27; 997788p[last_date]=2019-11-15+23%3A34%3A27; 997788p[login_status]=1; 999977778888p[user_tel]=18702141422; 999977778888p[user_name]=18702141422; server_date=2019-11-15+23%3A34%3A29; end_date=2019-11-15+23%3A44%3A29"
        )
        .charset("gbk")
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.text);
          }
        });
    });
  }

  parseBook(htmlText) {
    let $ = cheerio.load(htmlText);
    let $list = $(".mainright table.tbc");
    let list = [];
    for (let index in $list) {
      if (!isNaN(index)) {
        let rootSelector = $list[index];
        let name = $(rootSelector)
          .find("tbody tr td p a strong font")
          .text();
        let properies = $(rootSelector)
          .find("tbody tr td div div div.tbc_div2")
          .eq(2)
          .text()
          .split("，");
        let level = $(rootSelector)
          .find("tbody tr td[width='50']")
          .text()
          .match(/(?:(\d+|\d+\.\d+)品)/)[1];
        let price = $(rootSelector)
          .find("tbody tr td[width='80']")
          .text()
          .match(/(?:￥(\d+|\d+\.\d+))/)[1];
        let frontCoverPath = $(rootSelector)
          .find("tbody tr td[width='120'] div a img")
          .attr("src");
        let bookDetailHref = $(rootSelector)
          .find("tbody tr td p a")
          .attr("href");
        let isOpenSell = $(rootSelector)
          .find("tbody tr td[width='70'] a")
          .text();
        list.push({
          name,
          period: properies[0],
          size: properies[3],
          category: properies[1],
          theme: properies[5],
          press: properies[6],
          level,
          price,
          frontCoverPath,
          bookDetailHref,
          isOpenSell: isOpenSell == "进入购买" ? 1 : 0
        });
      }
    }
    return list;
  }
}
module.exports = SpiderService;
