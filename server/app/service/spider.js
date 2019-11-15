const Service = require("egg").Service;
// https://www.npmjs.com/package/superagent
const superagent = require("superagent");
require("superagent-charset")(superagent);
// https://www.npmjs.com/package/cheerio
const cheerio = require("cheerio");
class SpiderService extends Service {
  async fetchBookInfo(page) {
    let basePageUrl = `https://www.997788.com/5709/all_0/?shop_id=5709&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=&t10=&s0=&s1=&s2=&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&s11=&s12=&s13=&s14=&s15=&s=6334&ids=0&ide=0&jis=0&jie=0&page=${page}&ne=1#7`;
    let htmlText = await new Promise((resolve, reject) => {
      superagent
        .get(basePageUrl)
        .set(
          "Cookie",
          "PHPSESSID=5dstmj3h8fntb5ki1u7u54ehn1; login=1573812924; 997788p[sessionID]=a8e2e38425b41d3e1452a222c8db8def; 997788p[check]=cea2af0a37f81de45271ff822084fbef; 997788p[u_id]=1633115; 997788p[login_date]=2019-11-15+18%3A15%3A23; 997788p[last_date]=2019-11-15+18%3A15%3A23; 997788p[login_status]=1; 999977778888p[user_tel]=18702141422; 999977778888p[user_name]=18702141422; server_date=2019-11-15+18%3A15%3A25; end_date=2019-11-15+18%3A25%3A25"
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
    let $ = cheerio.load(htmlText);
    let $list = $(".mainright table.tbc");
    let list = [];
    for (let index in $list) {
      if (!isNaN(index)) {
        let rootSelector = $list[index];
        let name = $(rootSelector)
          .find("tbody tr td p a strong font")
          .text();
        let properies = $($list[0])
          .find("tbody tr td div div div.tbc_div2")
          .eq(2)
          .text()
          .split("，");
        let level = $($list[0])
          .find("tbody tr td[width='50']")
          .text()
          .match(/(?:(\d+|\d+\.\d+)品)/)[1];
        let price = $($list[0])
          .find("tbody tr td[width='80']")
          .text()
          .match(/(?:￥(\d+|\d+\.\d+))/)[1];
        let frontCoverPath = $($list[0])
          .find("tbody tr td[width='120'] div a img")
          .attr("src");
        list.push({
          name,
          period: properies[0],
          size: properies[3],
          category: properies[1],
          theme: properies[5],
          press: properies[6],
          level,
          price,
          frontCoverPath
        });
      }
    }
    return list;
  }
}
module.exports = SpiderService;
