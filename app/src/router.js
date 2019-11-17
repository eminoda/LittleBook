import Vue from 'vue';
import Router from 'vue-router';

const Welcome = () => require.ensure([], () => require('./pages/Welcome.vue'), 'Welcome');
const Home = () => require.ensure([], () => require('./pages/tabbar/Home.vue'), 'Home');
const User = () => require.ensure([], () => require('./pages/tabbar/User.vue'), 'User');
const BookList = () => require.ensure([], () => require('./pages/book/BookList.vue'), 'BookList');
const BookItem = () => require.ensure([], () => require('./pages/book/BookItem.vue'), 'BookItem');

Vue.use(Router);

const routes = [
	{ path: '/', component: Welcome },
	{ path: '/home', component: Home },
	{ path: '/user', component: User },
	{ path: '/bookList', component: BookList },
	{ path: '/bookItem', component: BookItem, name: 'bookItem' }
];
const routers = new Router({
	routes
});
export default routers;
