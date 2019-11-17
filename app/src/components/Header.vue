<template>
	<van-nav-bar :title="title" left-text="返回" left-arrow fixed @click-left="clickLeft" />
</template>
<script>
export default {
  name: 'vv-header',
  data() {
    return {

    }
  },
  methods: {
    clickLeft() {
      if (this.backRouter) {
        this.$router.push(this.backRouter)
      } else {
        this.$router.go(-1)
      }
    }
  },
  props: {
    backRouter: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/_variables.scss';
</style>