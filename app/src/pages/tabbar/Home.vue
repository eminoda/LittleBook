<template>
	<div class="page-wrap">
		<vv-header title="首页" :backRouter="{ path: '/' }"></vv-header>
		<div class="banner">
			<van-swipe :autoplay="3000" indicator-color="white" :height="banner.height">
				<van-swipe-item v-for="(item,index) in articles" :key="index">
					<img width="100%" :src="item.image_url" :alt="index.title" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="recommend-wrap">
			<h2>「前端」推荐文章</h2>
			<a
				class="article-wrap"
				:href="'https://toutiao.com/'+item.source_url"
				v-for="(item,index) in articles"
				:key="index"
				target="_blank"
			>
				<img :src="item.image_url" alt />
				<div class="article-info">
					<div class="title">{{item.title}}</div>
					<div class="sub-title">
						<span>阅读量：{{item.go_detail_count}}</span>
						<span>发布时间：{{item.behot_time|timeUnix}}</span>
					</div>
				</div>
			</a>
		</div>
		<vv-footer></vv-footer>
	</div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';
const components = {};
components[Swipe.name] = Swipe;
components[SwipeItem.name] = SwipeItem;

import util from '../../services/util';
export default {
	name: 'Home',
	components,
	data() {
		return {
			banner: {
				height: 0
			},
			articles: []
		};
	},
	created() {
		this.banner.height = window.innerHeight * 0.3;
		this.getArticle();
	},
	methods: {
		getArticle() {
			this.$http
				.request({
					url: '/toutiao/articles',
					data: {}
				})
				.then(data => {
					this.articles = data.splice(0, 10);
				})
				.catch(err => {
					util.showToast(err.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.banner {
	padding-top: 46px;
}

.recommend-wrap {
	.article-wrap {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 4%;
		padding-bottom: 2%;
		border-bottom: 1px solid $gray-300;
		img {
			width: 100px;
		}
		.article-info {
			padding-left: 2%;
			.title {
				font-size: 1.4rem;
				font-weight: bold;
			}
		}
	}
}
</style>