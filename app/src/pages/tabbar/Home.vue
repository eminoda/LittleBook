<template>
	<div class="page-wrap">
		<vv-header title="首页" :backRouter="{ path: '/' }"></vv-header>
		<div class="banner">
			<van-swipe :autoplay="3000" indicator-color="white" :height="banner.height">
				<van-swipe-item v-for="(item, index) in articles" :key="index">
					<img width="100%" :src="item.image_url" :alt="index.title" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="recommend-wrap">
			<h2>「前端」推荐文章</h2>
			<div class="title-desc">如下是最受欢迎的 10 篇小短文，相信质量也受到各位读者的肯定。如果你有兴趣，不妨一读。</div>
			<a class="article-wrap" :href="'https://toutiao.com/' + item.source_url" v-for="(item, index) in articles" :key="index" target="_blank">
				<img :src="item.image_url" alt />
				<div class="article-info">
					<div class="title">{{ item.title }}</div>
					<div class="sub-title">
						<span>阅读量：{{ item.go_detail_count }}</span>
						<span style="margin-left:3%;">时间：{{ item.behot_time | timeUnix('YYYY-MM-DD') }}</span>
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
	h2 {
		background-color: $gray-300;
		padding: 2% 0;
	}
	.title-desc {
		padding-bottom: 3%;
		color: $gray-600;
	}
	.article-wrap {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 4%;
		padding-bottom: 2%;
		border-bottom: 1px solid $gray-300;
		img {
			width: 100px;
			height: 60px;
		}
		.article-info {
			position: relative;
			height: 60px;
			margin-left: 2%;
			width: 100%;
			.title {
				font-size: 1.4rem;
				font-weight: bold;
			}
			.sub-title {
				position: absolute;
				bottom: 1%;
				width: 100%;
				color: $gray-600;
				font-size: 1.2rem;
			}
		}
	}
}
</style>