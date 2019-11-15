"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // http://127.0.0.1:7001/api/books?Name=5628hvh97b63q
  router.resources("books", "/api/books", controller.book); // books.index books.create
  router.resources("book", "/api/books/:id", controller.book); // books.show

  router.get("/api/spider/page", controller.spider.page);
};
