<template>
	<div class="page-wrap">
		<vv-header title="自我介绍"></vv-header>
		<div class="main">
			<div class="title">关于我</div>
			<p>我是一名前端开发工程师，从 java 转行后已经快工作 4 年半了。</p>
			<p>一直在一家创业小公司默默耕耘，说来惭愧，那么长时间的积累可能能力不及刚跨入这行业的新人。</p>
			<p>不过我喜欢前端这个职业，因为所见所得的开发方式，和 js 全平台通吃能语言能力让我动力满满。</p>
			<p>还是那句话：好好学习，天天向上！相信美好的事情总会发生~</p>
			<div class="title">发现我</div>
			<p>你可以在这些平台找到我，那里我一直输出前端相关的技术文章</p>
			<div class="logo-wrap">
				<div v-for="(item, index) in logos" :key="index">
					<van-image width="16rem" height="16rem" :src="item.img" />
					<div class="text">{{item.text}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mywebcat from '../../assets/qrcode/mywebcat.png';
import webcat from '../../assets/qrcode/webcat.jpg';
import toutiao from '../../assets/qrcode/toutiao.jpeg';
export default {
	name: 'Aboutme',
	data() {
		return {
			logos: [
				{
					img: toutiao,
					text: '头条号'
				},
				{
					img: webcat,
					text: '公众号'
				},
				{
					img: mywebcat,
					text: '我的微信'
				}
			]
		};
	}
};
</script>
<style lang="scss" scoped>
@import '../../scss/_variables.scss';

.main {
	padding: 46px 5% 60px;
	.title {
		font-weight: 600;
		font-size: 1.6rem;
		color: $black;
		margin-bottom: 1.2rem;
		margin-top: 1rem;
	}
	p {
		font-size: 1.2rem;
		color: $gray-600;
		line-height: 2rem;
	}
	.logo-wrap {
		display: flex;
		flex-wrap: wrap;
		.text {
			text-align: center;
			color: $gray-600;
			margin-bottom: 1%;
		}
	}
}
</style>