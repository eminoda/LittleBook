module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schema = new Schema({
    name: { type: String }, //书名
    price: { type: Number }, //价格
    period: { type: String }, //年代
    category: { type: String }, //类别 绘画版连环画 影剧版连环画 连环画封面 连环画原稿 连环画收藏包装袋
    size: { type: String }, //开本 16开 18开 20开 24开 28开 32开 34开 40开 48开 50开 60开 64开 80开 96开 140开 其他开本
    theme: { type: String }, //题材 现代题材 古典题材 外国题材 武侠题材 卡通题材
    press: { type: String }, //出版社
    frontCoverPath: { type: String }, //封面地址
    level: { type: Number }, //品相
    bookDetailHref: { type: String }, // temp 书籍详情
    isOpenSell: { type: Number }, // 1 可购买
    isDelete: { type: Number }, // 1 已删除
    createTime: { type: Date }
  });

  return mongoose.model("Book", schema);
};
