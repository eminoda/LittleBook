<template>
	<div class="list">
		<van-nav-bar title="BookList" left-text="返回" left-arrow fixed @click-left="$router.go(-1)" />
		<van-grid :column-num="5">
			<van-grid-item @click="onSort(item)" v-for="(item, index) in sortFields" :key="index">
				<template slot="text">
					<span :class="currentField == item.field ? 'red' : ''">{{ item.text + item.row }}</span>
				</template>
			</van-grid-item>
		</van-grid>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
			<div class="card" v-for="(item, index) in list" :key="index" @click="$router.push({ path: 'bookItem', query: { id: item.id } })">
				<van-image width="100" height="100" :src="item.frontCoverPath" />
				<div class="card-info">
					<div class="title">
						<van-tag type="danger" size="medium">{{ item.level }}</van-tag
						>{{ item.name }}
					</div>
					<div class="intro">
						<van-tag plain>{{ item.period }}</van-tag>
						<van-tag plain>{{ item.size }}</van-tag>
					</div>
					<div class="price-wraper">
						<span class="price-unit">￥</span>
						<span class="price">{{ item.price }}</span>
						<van-tag mark plain style="margin-left:2%" type="warning" v-if="item.isOpenSell">在售</van-tag>
						<van-tag mark plain style="margin-left:2%" v-else>已出让</van-tag>
					</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
import util from '../../services/util';
export default {
  name: 'BookList',
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      loading: false, // 判断置底
      finished: false,
      error: false, currentField: '',
      sortField: 'name',
      sortFields: [
        { direction: 'asc', text: '名称', field: 'name', row: ' ↑' },
        { direction: 'asc', text: '价格', field: 'price', row: ' ↑' },
        { direction: 'asc', text: '品相', field: 'level', row: ' ↑' }
      ]
    };
  },
  methods: {
    onSort(sort) {
      this.currentField = this.sortField = sort.field;
      for (let item of this.sortFields) {
        if (this.sortField == item.field) {
          item.direction = this.sortDirection = item.direction == 'asc' ? 'desc' : 'asc';
          item.row = item.direction == 'asc' ? ' ↑' : ' ↓';
        }
      }
      this.list = [];
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      this.$http
        .request({
          url: '/books',
          data: {
            page: this.page,
            pageSize: 10,
            sortField: this.sortField,
            sortDirection: this.sortDirection
          }
        })
        .then(data => {
          this.list = [...this.list, ...data.list];
          this.page = this.page + 1;
          this.loading = false;
          this.onFinished(data.totalPage);
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          util.showToast(err.message);
        });
    },
    onFinished(totalPage) {
      if (this.list < 10 || (totalPage && totalPage < this.page)) {
        this.finished = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_variables.scss';
.van-grid {
	position: fixed;
	top: 46px;
	z-index: 1;
	width: 100%;
	box-shadow: 0 5px 10px $gray-500;
	background: $white;
}
.red {
	color: red;
}
.van-list {
	padding-top: 96px;
	.card {
		margin: auto 2%;
		border-bottom: 1px solid $gray-200;
		width: $white;
		padding: 3%;
		display: flex;
		.van-tag {
			margin-right: 2%;
		}
		.card-image {
			width: 100px;
			background-color: $black;
		}
		.card-info {
			flex: 1;
			padding-left: 3%;
			.title {
				font-size: 1.6rem;
				font-weight: bold;
				margin-bottom: 5%;
			}
			.intro {
				margin-bottom: 5%;
			}
			.price-wraper {
				color: $red;
				.price {
					font-size: 1.6rem;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
