<template>
  <div class="seller">
    <div>{{count.count}}</div>
    <h1 @click="add(2)">我是右边，我是加法</h1>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // 获取count module下的count
    ...mapGetters("count", {
      count: "count"
    })
  },
  methods: {
    ...mapActions({
      add: "count/acAdd"
    })
    // add() {
    //   this.$store.dispatch("count/acAdd", 2);
    // }
  }
};
</script>
<style>
</style>
