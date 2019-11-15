import Vue from "vue";
import Router from "vue-router";

const Home = () => require.ensure([], () => require("./pages/Home.vue"), "Home");
const BookList = () => require.ensure([], () => require("./pages/book/BookList.vue"), "BookList");
const BookItem = () => require.ensure([], () => require("./pages/book/BookItem.vue"), "BookItem");

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/bookList", component: BookList },
  { path: "/bookItem", component: BookItem, name: "bookItem" }
];
const routers = new Router({
  routes
});
export default routers;
