<template>
  <div class="seller">
    <div class="seller-wrapper">
      <!-- 此处公共类小而复杂，这种方式不好，不如使用分别赋予类名写样式 -->
      <div class="score-view">
        <div class="score-view-left">
          <div class="total-score">{{seller.score}}</div>
          <div class="score-desc">综合评分</div>
          <div class="score-rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="score-view-right">
          <div class="service-score-box">
            <span class="margin-right-12">服务态度</span>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <span class="margin-left-12 star-score">{{seller.serviceScore}}</span>
          </div>
          <div class="service-score-box">
            <span class="margin-right-12">商品评分</span>
            <Star :size="36" :score="seller.foodScore"></Star>
            <span class="margin-left-12 star-score">{{seller.foodScore}}</span>
          </div>
          <div class="service-time-box">
            <span>送达时间</span>
            <span class="margin-left-12 delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
    </div>
    <!-- <Left></Left>
    <Right></Right>-->
  </div>
</template>
<script>
import Left from "../left/Left";
import Right from "../right/Right";
import Star from "../star/Star";
import Split from "../split/Split";
export default {
  data() {
    return {};
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  components: {
    Left,
    Right,
    Star,
    Split
  }
};
</script>
 <style lang="scss" scoped>
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .seller-wrapper {
    .score-view {
      display: flex;
      font-size: 12px;
      .score-view-left {
        width: 132.5px;
        flex: 0 0 132.5px;
        margin: 18px auto;
        text-align: center;
        border-right: 1px solid rgba(147, 153, 159, 1);
        @media only screen and (max-width: 320px) {
          width: 120px;
          flex: 0 0 120px;
        }
        .total-score {
          font-size: 24px;
          line-height: 28px;
          color: rgba(255, 153, 0, 1);
        }
        .score-desc {
          margin-top: 6px;
          font-size: 12px;
          line-height: 12px;
          color: rgba(7, 17, 27, 1);
        }
        .score-rank {
          margin-top: 8px;
          font-size: 10px;
          line-height: 10px;
          color: rgba(147, 153, 153, 1);
        }
      }
      .score-view-right {
        flex: 1;
        margin: 10px auto 18px auto;
        padding-left: 24px;

        .service-score-box {
          display: flex;
          align-items: center;
          margin-top: 8px;
        }
        .service-time-box {
          margin-top: 8px;
        }
        .margin-left-12 {
          margin-left: 12px;
        }
        .margin-right-12 {
          margin-right: 12px;
        }
        .delivery-time {
          color: rgba(147, 153, 159, 1);
        }
        .star-score {
          color: rgba(255, 153, 0, 1);
        }
        // 注意使用media媒体查询，要去覆盖可能影响样式的css
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
          .margin-left-12 {
            margin-left: 6px;
          }
          .margin-right-12 {
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>

