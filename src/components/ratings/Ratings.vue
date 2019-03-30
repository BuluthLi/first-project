<template>
  <div class="ratings" ref="ratingsscroll">
    <div class="ratings-wrapper">
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
      <RatingTitle
        :ratings="ratings"
        :title-text="titleText"
        v-on:onChangeSelectedType="onChangeSelectedType"
        v-on:onChangeOnlyText="onChangeOnlyText"
      ></RatingTitle>
      <ul class="rating-list">
        <li v-for="(item,index) in ratings" :key="index" v-show="needShow(item.rateType,item.text)">
          <div class="rating-intro">
            <img :src="item.avatar" alt>
            <div class="star-wrapper">
              <div class="name">{{item.username}}</div>
              <star :size="24" :score="item.score"></star>
              <span class="delivery-tiem">{{item.deliveryTime}}分钟送达</span>
            </div>
            <div class="time">{{item.rateTime|dateFormat}}</div>
          </div>
          <div class="rating-content">{{item.text}}</div>
          <div class="rating-text">
            <span :class="item.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
            <span
              v-for="(innerItem,innerIndex) in item.recommend"
              :key="innerIndex"
              class="recommend-item"
            >{{innerItem}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- <Left></Left>
    <Right></Right>-->
  </div>
</template>
<script>
import Vue from "vue";
import Left from "../left/Left";
import Right from "../right/Right";
import Star from "../star/Star";
import Split from "../split/Split";
import RatingTitle from "../ratingtitle/RatingTitle.vue";
import BScroll from "better-scroll";
import { dateFormat } from "../../common/js/dateFormat";
Vue.filter("dateFormat", time => {
  let date = new Date(time);
  return dateFormat(date, "yyyy-MM-dd hh:mm");
});
export default {
  data() {
    return {
      ratingsScroll: null,
      ratings: [],
      titleText: ["全部", "满意", "不满意"],
      selectedType: 2,
      onlyText: 1
    };
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.$http
      .post("/api/ratings", {})
      .then(res => {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.ratingsScroll = new BScroll(this.$refs.ratingsscroll, {
            click: true
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onChangeSelectedType(value) {
      this.selectedType = value;
      this.ratingsScroll.refresh();
    },
    onChangeOnlyText(value) {
      this.onlyText = value;
      this.ratingsScroll.refresh();
    },
    needShow(type, text) {
      if (this.onlyText && !text) {
        return false;
      }
      if (this.selectedType == 2) {
        return true;
      } else {
        return type === this.selectedType;
      }
    }
  },
  components: {
    Left,
    Right,
    Star,
    Split,
    RatingTitle
  }
};
</script>
 <style lang="scss" scoped>
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .ratings-wrapper {
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
  .rating-list {
    li {
      margin: 0 18px;
      padding: 16px 0;
      list-style: none;
      border-bottom: 1px solid rgba(7, 17, 27, 0.2);
      .rating-intro {
        display: flex;
        font-size: 10px;
        line-height: 12px;
        color: rgb(147, 153, 159);

        img {
          width: 28px;
          border-radius: 50%;
          height: 28px;
          margin-left: 6px;
        }
        .star-wrapper {
          margin-left: 12px;
          .name {
            font-size: 10px;
            line-height: 12px;
            color: rgba(7, 17, 27, 1);
          }
          .star-24 {
            margin-top: 4px;
            display: inline-block;
            vertical-align: top;
          }
          span {
            margin-top: 4px;

            display: inline-block;
            align-items: center;
          }
        }
        .time {
          flex: 1;
          text-align: right;
        }
      }
      .rating-content {
        font-size: 12px;
        line-height: 18px;
        color: rgba(7, 17, 27, 1);
        margin: 6px 0 0 40px;
      }
      .rating-text {
        font-size: 12px;
        line-height: 16px;
        margin-top: 8px;
        margin-left: 44px;
        span {
          vertical-align: middle;
          font-size: 12px;
          line-height: 12px;
        }
        .icon-thumb_up {
          color: rgb(0, 160, 220);
        }
        .icon-thumb_down {
          color: rgb(147, 153, 159);
        }
        .recommend-item {
          display: inline-block;
          margin: 4px;
          padding: 0 6px;
          font-size: 9px;
          line-height: 16px;
          color: rgb(147, 153, 159);
          border: 1px solid rgba(7, 17, 27, 0.1);
          &:first-child {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>

