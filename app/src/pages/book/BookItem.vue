<template>
	<div>
		<van-search placeholder="请输入搜索关键词" v-model="bookId" show-action>
			<div slot="action" @click="onSearch">
				<span v-if="!isSearch">搜索</span>
				<van-loading v-if="isSearch" type="spinner" color="#1989fa" />
			</div>
		</van-search>
		<div class="item" v-if="book.id">
			<van-cell title="名称" :value="book.name" size="small" />
			<div class="tag">
				<van-tag type="primary" v-for="(item,index) in book.tags" :key="index">{{item.name}}</van-tag>
			</div>
			<van-cell title="点击量" :value="book.clickVolume" size="small" />
			<van-cell title="发布时间" :value="book.publicDate" size="small" />
			<van-cell title="分数" :value="book.score" size="small" />
			<van-cell title="排名" :value="book.rank" size="small" />
		</div>
	</div>
</template>

<script>
import util from '../../services/util';
export default {
	name: 'BookItem',
	data() {
		return {
			bookId: this.$route.query.id ? String(this.$route.query.id) : null,
			book: {},
			isSearch: false
		};
	},
	methods: {
		onSearch() {
			if (this.isSearch) {
				return;
			}
			this.isSearch = true;
			this.book = {};
			this.$http
				.request({
					url: `/books/${this.bookId}`
				})
				.then(data => {
					this.book = data;
					this.isSearch = false;
				})
				.catch(err => {
					util.showToast(err.message);
					this.isSearch = false;
				});
		}
	},
	created() {
		if (this.bookId) {
			this.onSearch();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tag {
	display: flex;
	justify-content: flex-start;
	padding: 0 16px;
	flex-wrap: wrap;
	.van-tag {
		margin-left: 1%;
		margin-bottom: 2%;
	}
}
</style>
