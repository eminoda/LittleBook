const Service = require('egg').Service;
// https://www.npmjs.com/package/superagent
const superagent = require('superagent');
require('superagent-charset')(superagent);
// https://www.npmjs.com/package/cheerio
const cheerio = require('cheerio');
const initBookUrl =
	'https://www.997788.com/5709/all_3_102_6024/?shop_id=5709&d=102&r=&v1=&v2=&v3=&v4=&v5=&v6=&v7=&v8=&v9=&v10=&v11=&v12=&s0=&s1=&s2=&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&s11=&s12=&s13=&s14=&s15=&t2=0&t4=0&t5=2&t6=&t7=0&t8=0&t9=&t10=&z=0&p=0&v=0&u=1&y=2&o=o&s=5841&ids=41858292&ide=41473343&jis=24&jie=24&page=146&ne=1#7';
class SpiderService extends Service {
	async getTotalBookList(page = initBookUrl) {
		const htmlText = await this.service.spider.fetchBookInfo(page);
		let { list, totalPage, currentPage, nextPageUrl } = this.service.spider.parseBook(htmlText);
		let names = [];
		let bookPromise = [];
		for (let item of list) {
			names.push(item.name);
			bookPromise.push(
				new Promise((resolve, reject) => {
					resolve(this.ctx.model.Book.create(item));
				})
			);
		}
		await Promise.all(bookPromise);
		console.log(currentPage, totalPage, names.join(','));
		console.log(Number(currentPage) + 1, Number(totalPage));
		console.log();
		if (Number(currentPage) + 1 <= Number(totalPage)) {
			nextPageUrl = page.split('?')[0] + nextPageUrl;
			console.log('nextPageUrl', nextPageUrl);
			return this.service.spider.getTotalBookList(nextPageUrl);
		}
	}
	// 爬取 上海旧书店 所有书籍（自家的书，只作用 Demo 示例）
	async fetchBookInfo(page) {
		return new Promise((resolve, reject) => {
			superagent
				.get(page)
				.set(
					'Cookie',
					'PHPSESSID=9ke6fnon5vsokmoejtcvajbiq5; login=1574093231; 999977778888p[user_tel]=18702141422; 999977778888p[user_name]=18702141422; h5_localstorage_num=1; 997788p[sessionID]=39607be1456d45f8b611010c9a791efe; 997788p[check]=180f452f5ae1bf1eb0fb88eee4a1eff2; 997788p[u_id]=1633115; 997788p[login_date]=2019-11-19+01%3A28%3A30; 997788p[last_date]=2019-11-19+01%3A28%3A30; 997788p[login_status]=1; server_date=2019-11-19+01%3A28%3A40; end_date=2019-11-19+01%3A38%3A40'
				)
				.charset('gbk')
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
		let $list = $('table.tbc');
		let list = [];
		for (let index in $list) {
			if (!isNaN(index)) {
				let rootSelector = $list[index];
				let name = $(rootSelector)
					.find('tbody tr td p a strong font')
					.text();
				let properies = $(rootSelector)
					.find('tbody tr td div div div.tbc_div2')
					.eq(2)
					.text()
					.split('，');
				let levelText = $(rootSelector)
					.find("tbody tr td[width='50']")
					.text();
				let level = levelText.match(/(?:(\d+|\d+\.\d+)品)/) ? levelText.match(/(?:(\d+|\d+\.\d+)品)/)[1] : 5;
				let price = $(rootSelector)
					.find("tbody tr td[width='80']")
					.text()
					.match(/(?:￥(\d+|\d+\.\d+))/)[1];
				let frontCoverPath = $(rootSelector)
					.find("tbody tr td[width='120'] div a img")
					.attr('src');
				let bookDetailHref = $(rootSelector)
					.find('tbody tr td p a')
					.attr('href');
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
					isOpenSell: isOpenSell == '进入购买' ? 1 : 0
				});
			}
		}
		return {
			list,
			totalPage: $('#showpage table tr td[align="center"]')
				.text()
				.match(/(?:显示(\d+)页)/)[1],
			currentPage: $('#showpage table tr td[align="center"] font strong')
				.eq(0)
				.text(),
			nextPageUrl: $('#showpage table tr td[align="center"] a')
				.eq(2)
				.attr('onclick')
				.match(/(?:this.href=\'(.+)\')/)[1]
		};
	}

	async fetchToutiaoArticle(userId, mediaId) {
		let response = await this.service.toutiao.fetchUserProfilePage({
			userId,
			mediaId
		});
		let cookie = this.service.toutiao.getCookie(response);
		response = await this.service.toutiao.fetchUserArticalPage({
			userId,
			headers: {
				cookie: cookie
			}
		});
		return response.data.data;
	}
}
module.exports = SpiderService;
