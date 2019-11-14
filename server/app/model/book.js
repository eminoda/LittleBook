module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schema = new Schema({
    name: { type: String }, //书名
    price: { type: Number }, //价格
    period: { type: String }, //年代
    category: { type: String }, //类别
    size: { type: Number }, //开本
    theme: { type: String }, //题材
    press: { type: String }, //出版社
    createTime: { type: Date }
  });

  return mongoose.model("Book", schema);
};
