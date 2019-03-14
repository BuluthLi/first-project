<template>
  <div class="seller">
    <div>{{count}}</div>
    <h1 @click="dec">我是左边，我是减法</h1>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    console.log(this.$store);
    return {};
  },
  computed: {
    ...mapState({
      count: state => state.count.count
    })
  },
  methods: {
    dec() {
      // 只是派发action的异步事件,推荐action
      this.$store.dispatch("count/acDecrease", 1);
      // 调用mutations事件
      // this.$store.commit("count/add", 1);
    }
  }
};
</script>
<style>
</style>
