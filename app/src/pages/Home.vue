<template>
	<div class="desc">
		<div class="line">
			<h1>BookSearch</h1>
			<div class="sub-title">针对图书搜索场景来实践的 Node 服务应用，可以作为前端（全栈）开发的练手入门项目。</div>

			<h2>技术栈</h2>
			<van-image width="40" height="40" :src="item" v-for="(item,index) in logo" :key="index" />

			<h2>项目地址</h2>
			<!-- <van-image width="100" height="100" :src="qrcode.gitee" alt="gitee" /> -->
			<div class="link">https://gitee.com/eminoda/BookSearch</div>

			<van-button to="/bookList" type="primary" size="large" style="margin-top:20px;">进入 Demo</van-button>
		</div>
		<div class="line">
			<h2>关于我</h2>
			<div class="sub-title">你可以关注我的微信公众号 or 头条号，在那里会有更多前端相关文章。</div>
			<van-image width="100" height="100" :src="qrcode.webcat" alt="webcat" />
			<van-image width="100" height="100" :src="qrcode.toutiao" alt="toutiao" />
		</div>
	</div>
</template>
<script>
import gitee from '../assets/qrcode/gitee.png';
import webcat from '../assets/qrcode/webcat.jpg';
import toutiao from '../assets/qrcode/toutiao.jpeg';
import vant from '../assets/logo/vant.png';
import vue from '../assets/logo/vue.png';
import egg from '../assets/logo/egg.png';
import redis from '../assets/logo/redis.png';
import sequelize from '../assets/logo/sequelize.png';
export default {
	name: 'app',
	data() {
		return {
			logo: [vue, vant, egg, sequelize, redis],
			qrcode: { gitee, webcat, toutiao }
		};
	}
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.desc {
	padding: 20px 4% 0;
	.line {
		border-bottom: 1px solid $gray-200;
		padding-bottom: 5%;
	}
	.sub-title {
		font-size: 1.4rem;
		margin-top: 1rem;
		color: $gray-500;
	}
	.link {
		font-size: 1.3rem;
		color: $gray-500;
	}
}
</style>
