<template>
  <div class="seller" ref="sellerscroll">
    <div class="seller-wrapper">
      <div class="header-box">
        <div class="header-title">
          <div class="title">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <Star :size="36" :score="seller.score"></Star>
              <span class="rating-count">({{seller.ratingCount}})</span>
              <span class="sell-count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="coll">
            <div class="icon icon-favorite"></div>
            <div class="coll-text">{{coll[0]}}</div>
          </div>
        </div>
        <div class="header-desc">
          <div class="desc-item">
            <div class="text">起送价</div>
            <div class="msg">
              {{seller.minPrice}}
              <span>元</span>
            </div>
          </div>
          <div class="desc-item">
            <div class="text">商家配送</div>
            <div class="msg">
              {{seller.deliveryPrice}}
              <span>元</span>
            </div>
          </div>
          <div class="desc-item">
            <div class="text">平均配送时间</div>
            <div class="msg">
              {{seller.deliveryTime}}
              <span>元</span>
            </div>
          </div>
        </div>
      </div>
      <Split></Split>
      <div class="GG-box">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
        <ul class="activity">
          <li v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <Split></Split>
      <div class="seller-img-title">商家实景</div>
      <div class="pic-wrapper">
        <div class="seller-img-wrapper" ref="imgscroll">
          <div class="seller-img-box">
            <img class="img-item" v-for="(item,index) in seller.pics" :key="index" :src="item">
          </div>
        </div>
      </div>
      <Split></Split>
      <ul class="seller-msg">
        <li class="title">商家信息</li>
        <li v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Star from "../star/Star";
import Split from "../split/Split";
export default {
  data() {
    return {
      coll: ["收藏", "已收藏"],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      sellerScroll: null,
      imgScroll: null,
      currentPageIndex: 0,
      timer: null
    };
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sellerScroll = new BScroll(this.$refs.sellerscroll, {
        click: true
      });

      this.imgScroll = new BScroll(this.$refs.imgscroll, {
        scrollX: true, //横向滚动
        scrollY: false, //不允许纵向滚动
        // snap: {
        //   loop: true, //循环
        //   threshold: 0.3,
        //   speed: 100, //轮播间隔
        //   stepX: 120
        // },
        click: true
      });
      // this.imgScroll.on("scrollEnd", () => {
      //   let page = this.imgScroll.getCurrentPage().pageX;
      //   this.currentPageIndex = page;
      //   clearTimeout(this.timer);
      //   // this.play();
      // });
    });
  },
  updated() {
    // if(this.sellerScroll){
    // }
  },
  methods: {
    play: function() {
      let playPage = this.currentPageIndex + 1;
      console.log(playPage);
      // if (playPage === 2) {
      //   playPage = 0;
      // }
      this.timer = setTimeout(() => {
        this.imgScroll.goToPage(playPage, 0, 400);
      }, 400);
    }
  },
  components: {
    Star,
    Split
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/userful.scss";

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  font-weight: normal;
  .seller-wrapper {
    .header-box {
      width: 100%;
      box-sizing: border-box;
      padding: 18px;
      .header-title {
        display: flex;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          flex: 1;
          .name {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
          }
          .star-wrapper {
            margin-top: 8px;
            .star {
              display: inline-block;
            }
            span {
              margin-left: 8px;
              font-size: 10px;
              line-height: 18px;
              color: rgb(77, 85, 93);
              &.sell-count {
                margin-left: 12px;
              }
            }
          }
        }
        .coll {
          .icon {
            font-size: 24px;
            line-height: 24px;
            color: rgba(240, 20, 20, 1);
          }
          .coll-text {
            margin-top: 4px;
            font-size: 10px;
            line-height: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .header-desc {
        display: flex;
        padding-top: 18px;
        .desc-item {
          flex: 1;
          text-align: center;
          font-size: 10px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          .text {
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .msg {
            margin-top: 4px;
            font-size: 24px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            span {
              font-size: 10px;
            }
          }
        }
      }
    }
    .GG-box {
      width: 100%;
      box-sizing: border-box;
      padding: 18px 18px 0 18px;
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .content {
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px 18px 12px;
        margin-top: 8px;
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
        color: rgba(240, 20, 20, 1);
      }
      .activity {
        li {
          list-style: none;
          padding: 16px 12px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);

          .icon {
            width: 18px;
            height: 18px;
            display: inline-block;
            vertical-align: middle;
            background-size: 18px 18px;
            &.decrease {
              @include bg-image("decrease_3");
            }
            &.discount {
              @include bg-image("discount_3");
            }
            &.guarantee {
              @include bg-image("guarantee_3");
            }
            &.invoice {
              @include bg-image("invoice_3");
            }
            &.special {
              @include bg-image("special_3");
            }
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            margin-left: 6px;
            font-size: 12px;
            font-weight: 200;
            color: rgba(7, 17, 27, 1);
            line-height: 16px;
          }
        }
      }
    }
    .seller-img-title {
      margin: 18px 18px 12px 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .pic-wrapper {
      margin: 12px 0 18px 0;
      padding: 0 15px;
      box-sizing: border-box;
      .seller-img-wrapper {
        width: 100%;

        height: 90px;
        overflow: hidden;
        .seller-img-box {
          width: 504px;
          height: 90px;
          white-space: nowrap;
          // padding: 0 15px;
          box-sizing: border-box;
          .img-item {
            width: 120px;
            height: 90px;
            margin: 0 3px;
          }
        }
      }
    }
    .seller-msg {
      margin: 18px 18px 12px 18px;
      li {
        list-style: none;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding: 16px 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
        font-weight: 200;
        &:last-child {
          border-bottom: none;
        }
      }
      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        padding-left: 0;
        font-weight: normal;
      }
    }
  }
}
</style>
