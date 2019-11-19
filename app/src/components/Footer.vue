<template>
	<van-tabbar v-model="active" route>
		<van-tabbar-item v-for="(item, index) in tabbars" :key="index" :to="item.to" :icon="item.icon">{{ item.name }}</van-tabbar-item>
	</van-tabbar>
</template>
<script>
export default {
  name: 'vv-footer',
  data() {
    return {
      tabbars: [{
        icon: "home-o",
        to: { path: '/home' },
        name: "首页"
      }, {
        icon: "shop-o",
        to: { path: '/bookList' },
        name: "书店"
      }, {
        icon: "more-o",
        to: { path: '/user' },
        name: "更多"
      }]
    }
  },
  computed: {
    active: {
      get() {
        for (let item of this.tabbars) {
          if (this.$router.currentRoute.path == item.to.path) {
            return item.name
          }
        }
        return '';
      },
      set() {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/_variables.scss';
</style>