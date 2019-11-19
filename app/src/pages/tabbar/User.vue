<template>
	<div class="page-wrap" v-view-height>
		<vv-header title="更多"></vv-header>
		<div class="main">
			<div class="title">关于我</div>
			<van-cell-group>
				<van-cell title="自我介绍" icon="smile-o" is-link clickable :to="{path:'/user/aboutme'}" />
				<van-cell
					title="头条主页"
					is-link
					icon="fire-o"
					v-href="'http://m.toutiao.com/profile/4111809042459227/#mid=1648328783293452?from=littlebook'"
				/>
				<van-cell
					title="博客主页"
					is-link
					icon="bookmark-o"
					v-href="'https://eminoda.github.io?from=littlebook'"
				/>
			</van-cell-group>
			<div class="title">连环画</div>
			<van-cell-group>
				<van-cell title="店主介绍" icon="shop-collect-o" @click="show=!show" />
			</van-cell-group>
		</div>
		<vv-footer></vv-footer>
		<van-dialog v-model="show" title="店主介绍" show-cancel-button>
			<div style="padding: 20px;">
				<h3>上海旧书店</h3>
				<p>997788 平台经营了 10 多年的老字号连环画店铺。</p>
				<p>诚信为本,广交天下连友</p>
				<p>联系方式：15201833035</p>
			</div>
		</van-dialog>
	</div>
</template>
<script>
export default {
	name: 'Home',
	data() {
		return { show: false };
	}
};
</script>
<style lang="scss" scoped>
@import '../../scss/_variables.scss';

.title {
	padding: 10px 20px;
	font-size: 1.6rem;
	color: $gray-500;
	background-color: $gray-100;
}
</style>