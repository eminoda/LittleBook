import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;

import 'vant/lib/index.css';
import './scss/style.scss';
import { Button, Image, List, Grid, GridItem, Cell, CellGroup, Toast, NavBar, Icon, Search, Tag, Loading, Tabbar, TabbarItem, Dialog } from 'vant';
import http from './services/http';

import './filter';
import './directive';

Vue.component(Button.name, Button);
Vue.component(Image.name, Image);
Vue.component(List.name, List);
Vue.component(Grid.name, Grid);
Vue.component(GridItem.name, GridItem);
Vue.component(Cell.name, Cell);
Vue.component(CellGroup.name, CellGroup);
Vue.component(Toast.name, Toast);
Vue.component(NavBar.name, NavBar);
Vue.component(Icon.name, Icon);
Vue.component(Search.name, Search);
Vue.component(Tag.name, Tag);
Vue.component(Loading.name, Loading);

let context = require.context('./components', true, /^\.\/.*vue$/);
context.keys().map(item => {
	let component = context(item).default;
	Vue.component(component.name, component);
	console.log(component.name + ` is Loaded`);
});
Vue.use(Tabbar).use(TabbarItem);
Vue.use(http);
Vue.use(Dialog);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
