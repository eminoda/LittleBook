<template>
	<div>
		<vv-header title="首页" :backRouter="{ path: '/' }"></vv-header>
		<div class="banner">
			<van-swipe :autoplay="3000" indicator-color="white" :height="banner.height">
				<van-swipe-item>1</van-swipe-item>
				<van-swipe-item>2</van-swipe-item>
				<van-swipe-item>3</van-swipe-item>
				<van-swipe-item>4</van-swipe-item>
			</van-swipe>
		</div>
        <div class="recommend">
            <h2>最新文章</h2>
            
        </div>
		<vv-footer></vv-footer>
	</div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';
const components = {}
components[Swipe.name] = Swipe;
components[SwipeItem.name] = SwipeItem;

export default {
  name: 'Home',
  components,
  data() {
    return {
      banner: {
        height: 0
      }
    };
  },
  created() {
    this.banner.height = window.innerHeight * 0.3
  }
};
</script>
<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.banner {
	padding-top: 46px;
}
</style>