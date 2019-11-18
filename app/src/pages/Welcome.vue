<template>
	<div class="desc">
		<div class="line">
			<h1>LittleBook（小人书）</h1>
			<div class="sub-title">一个综合的前端 Node.js 项目，用来展示连环画书籍的店铺。</div>
			<div class="sub-title">你可以作为前端（全栈）开发的练手入门项目。</div>

			<h2>技术栈</h2>
			<van-image width="40" height="40" :src="item" v-for="(item, index) in logo" :key="index" />
			<div class="sub-title">Vue+Vant+Egg+Mongoose+Redis</div>

			<h2>
				项目地址
				<span>觉得不错，点个 star 吧</span>
			</h2>
			<!-- <van-image width="100" height="100" :src="qrcode.gitee" alt="gitee" /> -->
			<div class="link">https://gitee.com/eminoda/LittleBook</div>

			<van-button to="/home" type="primary" size="large" style="margin-top:20px;">进入 Demo</van-button>
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
import mongoose from '../assets/logo/mongoose.png';
export default {
	name: 'app',
	data() {
		return {
			logo: [vue, vant, egg, mongoose, redis],
			qrcode: { gitee, webcat, toutiao }
		};
	}
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
h2 {
	span {
		font-size: 12px;
		font-weight: normal;
		color: $gray-500;
	}
}
.desc {
	padding: 0 4% 0;
	.line {
		border-bottom: 1px solid $gray-200;
		padding-bottom: 5%;
	}
	.sub-title {
		font-size: 1.4rem;
		margin-top: 1rem;
		color: $black;
		padding-bottom: 2%;
	}
	.link {
		font-size: 1.3rem;
		color: $gray-800;
	}
}
</style>
