<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <!-- 可以传数据，但不好 -->
    <!-- <router-view class="router-view" :goods="goods"></router-view> -->
    <!-- keep-alive将当前组件状态保存到内存中 -->
    <keep-alive>
      <router-view class="router-view" :seller="seller"></router-view>
    </keep-alive>
    <a href="http://www.baidu.com"></a>
    <!-- <div class="content">i am content</div> -->
    <!-- 最好大小写区分，行业规范，敏不敏感暂且不论 -->
    <!-- <div class="hai"></div> -->
  </div>
</template>
<script>
import Header from "./components/header/Header.vue";
export default {
  data() {
    return {
      msg: "牛皮",
      seller: {},
      goods: []
    };
  },
  // 生命周期
  created: function() {
    this.$http
      .post("/api/data", {})
      .then(res => {
        console.log(res);
        this.seller = res.data.seller;
        this.goods = res.data.goods;
        // this.hai(this.seller);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted: function() {
    //仍然存在异步问题
    // console.log(this.seller);
  },
  methods: {
    click: function(value) {
      alert(value + this.msg);
    }
    // hai: function(data) {
    //   console.log("函数数据：", data);
    //   console.log("页面数据：", this.seller);
    // }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import "./common/scss/userful.scss";
#app {
  margin: 0;
  padding: 0;
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      text-decoration: none;
      flex: 1;
      text-align: center;
      color: rgb(77, 85, 93);
    }
    .router-link-active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>

