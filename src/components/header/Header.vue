// 页面dom的结构设计要严谨，类名的赋予不多也不能少，且包含一定的语义
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt class="avatar-img" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="support-text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bg">
        <img :src="seller.avatar" :alt="seller.name">
      </div>
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right little-right-icon"></span>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow" ref="mydetail">
        <div class="detail-wrapper" :style="{minHeight:height+'px',height:'auto'}">
          <div class="detail-title">{{seller.name}}</div>
          <!-- <div class="star"> -->
          <Star :score="seller.score" :size="48"></Star>
          <!-- </div> -->
          <div class="youhui">
            <div class="youhui-title">
              <span class="left-splitline"></span>
              <span class="youhui-title-content">优惠信息</span>
              <span class="right-splitline"></span>
            </div>
            <div class="youhui-content">
              <div v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="youhui-text">{{item.description}}</span>
              </div>
            </div>
          </div>
          <div class="gonggao">
            <div class="gonggao-title">
              <span class="left-splitline"></span>
              <span class="gonggao-title-content">商家公告</span>
              <span class="right-splitline"></span>
            </div>
            <div class="gonggao-content">{{seller.bulletin}}</div>
          </div>
          <!-- align-items和align-content的深刻区别 -->
          <!-- <div class="child-1">
          <div class="child-2"></div>
          <div class="child-2"></div>
          </div>-->
        </div>
        <div class="detail-close icon-close" @click="hideDetail"></div>
      </div>
    </transition>
    <!-- <div class="hai"></div> -->
  </div>
</template>
<script>
import Star from "../star/Star";
export default {
  data() {
    return {
      msg: "牛皮",
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      detailShow: false,
      height: "0px"
    };
  },
  props: ["seller"],
  //生命周期
  created: function() {
    console.log(this.seller);
  },
  mounted: function() {},
  methods: {
    click: function(value) {
      alert(value + this.msg);
    },
    showDetail: function() {
      this.detailShow = true;
      this.$nextTick(() => {
        let minHeight = this.$refs.mydetail.getBoundingClientRect().height - 96;
        this.height = minHeight;
      });
    },
    hideDetail: function() {
      this.detailShow = false;
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/userful.scss";
// icon的公共样式拉出来
.icon {
  display: inline-block;
  vertical-align: top;
  &.decrease {
    @include bg-image("decrease_1");
  }
  &.discount {
    @include bg-image("discount_1");
  }
  &.guarantee {
    @include bg-image("guarantee_1");
  }
  &.invoice {
    @include bg-image("invoice_1");
  }
  &.special {
    @include bg-image("special_1");
  }
}
.header {
  color: white;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  .content-wrapper {
    position: relative;
    .avatar {
      display: inline-block;
      width: 64px;
      height: 64px;
      margin: 24px 16px 18px 24px;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      .title {
        font-size: 16px;
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image("brand");
          background-size: 30px 18px;
          vertical-align: top;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        font-size: 12px;
        line-height: 12px;
        font-weight: 200;
      }
      .support {
        /** 出现莫名的间隙，可能是font-size导致的，可以给父元素一个font-size：0px，在需要的地方重新设置font-size，
            就可以删除间隙
        **/
        margin: 10px 0 2px 0;
        font-size: 0px;
        line-height: 12px;
        font-weight: 200;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
        .support-text {
          vertical-align: top;
          font-size: 10px;
        }
      }
      .support-count {
        position: absolute;
        bottom: 12px;
        right: 12px;
        font-size: 10px;
        font-weight: 200;
        line-height: 12px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.2);
        display: inline-block;
        padding: 7px 0px 7px 8px;
        .count {
          padding: 7px 2px 7px 8px;
          line-height: 12px;
          vertical-align: top;
        }
        .icon {
          margin-left: 2px;
          vertical-align: top;
        }
      }
    }
    .bg img {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      filter: blur(5px);
    }
  }
  .bulletin {
    height: 28px;
    width: 100%;
    line-height: 28px;
    box-sizing: border-box;
    padding: 0 12px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-icon {
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      @include bg-image("bulletin");
      background-repeat: no-repeat;
      display: inline-block;
    }
    .bulletin-text {
      display: inline-block;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 10px;
      font-weight: 200;
      line-height: 28px;
      color: white;
      margin-left: 4px;
    }
    .little-right-icon {
      display: inline-block;
      margin-left: 4px;
    }
  }
  .detail {
    // fixed的写法,推荐fixed
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background: rgba(7, 17, 27, 0.8);
    width: 100%;
    //注意以下样式
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(5px);
    // 可有可无，最后对fade已经处理了
    transition: opacity 0.5s;
    /**
     absolute的写法
     position: absolute;
     z-index: 100;
     top: 0;
     left: 0;
     width: 100%;
     如果这里的height是auto,计算min-height的时候就不能获取它的高度，而要得到视口的高度
     height: auto;
     overflow: auto;
     background: rgba(7, 17, 27, 0.8);
    */

    // filter: blur(5px);
    .detail-wrapper {
      width: 100%;
      display: flex;
      align-content: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      .detail-title {
        font-size: 16px;
        line-height: 16px;
        font-weight: 700;
        width: 100%;
        text-align: center;
        color: white;
        margin-top: 64px;
      }
      .star {
        width: 100%;
        text-align: center;
        margin-top: 16px;
      }
      .youhui {
        margin-top: 28px;
        width: 85%;
        .youhui-title {
          display: flex;
          align-items: center;
          .right-splitline,
          .left-splitline {
            display: inline-block;
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            vertical-align: middle;
          }
          .youhui-title-content {
            margin: 0 12px;
            font-size: 14px;
            line-height: 14px;
            font-weight: 700;
            width: auto;
            text-align: center;
          }
        }
        .youhui-content {
          margin-top: 24px;
          & div {
            margin-top: 12px;
          }
          & div:first-child {
            margin-top: 0px;
          }
          .icon {
            display: inline-block;
            vertical-align: middle;
            width: 16px;
            height: 16px;
            margin: 0 6px 0 12px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
          }
          .youhui-text {
            display: inline-block;
            font-size: 12px;
            line-height: 12px;
            font-weight: 200;
          }
        }
      }
      .gonggao {
        margin-top: 28px;
        width: 85%;
        padding: 0 7.5%;
        .gonggao-title {
          display: flex;
          align-items: center;
          .right-splitline,
          .left-splitline {
            display: inline-block;
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            vertical-align: middle;
          }
          .gonggao-title-content {
            margin: 0 12px;
            font-size: 14px;
            line-height: 14px;
            font-weight: 700;
            width: auto;
            text-align: center;
          }
        }
        .gonggao-content {
          margin: 24px 12px 0 12px;
          font-size: 12px;
          line-height: 24px;
          font-weight: 200;
        }
      }
    }
    .detail-close {
      margin: 32px auto;
      width: 32px;
      height: 32px;
      line-height: 32px;
      //什么叫字体图标！！！它的font-size很关键
      font-size: 32px;
    }
  }
  // 完美
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
/**align-items和align-content的深刻区别
在侧边有多余间隙时候（一般都会有的），align-items单行生效，align-content多行生效
并且。align-items有space-around的类似效果，align-content则会严格按照基准线css样式对齐
  div {
   border: 1px solid #0f0f0f;
  }
  .child-1 {
    argin: 30px auto;
    display: flex;
    width: 100px;
    height: 60px;
    justify-content: space-around;
    align-content: center;
  }
  .child-2 {
    width: 30px;
    height: 20px;
  }
**/
</style>

