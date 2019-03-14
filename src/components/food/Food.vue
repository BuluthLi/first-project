<template>
  <transition name="food-fade">
    <div class="food" v-show="showFood" ref="fooddetailscroll">
      <div class="just-scroll-dom">
        <div class="food-content">
          <div class="cover-box">
            <span class="back icon-arrow_lift" @click="hide"></span>
            <img :src="selectedSingleFood.image" alt>
          </div>
          <div class="name">{{selectedSingleFood.name}}</div>
          <div class="sale-data">
            <span class="sales">月售{{selectedSingleFood.sellCount}}份</span>
            <span class="rating">好评率{{selectedSingleFood.rating}}</span>
          </div>
          <div class="price-box">
            <span class="new-price">
              <span>￥</span>
              {{selectedSingleFood.price}}
            </span>
            <span class="old-price" v-show="selectedSingleFood.oldPrice">
              <span>￥</span>
              {{selectedSingleFood.oldPrice}}
            </span>
            <div class="cartcontrol-box">
              <transition name="cartcontro-fade">
                <div class="add" v-show="!selectedSingleFood.count" @click="addFirst">加入购物车</div>
              </transition>
              <CartControl
                :food="selectedSingleFood"
                v-on:add="drop"
                v-show="selectedSingleFood.count"
              ></CartControl>
            </div>
          </div>
        </div>
        <Split></Split>
        <div class="desc">
          <h1 class="desc-title">商品介绍</h1>
          <div class="desc-text">{{selectedSingleFood.info}}</div>
        </div>
        <Split></Split>
        <RatingTitle
          :ratings="selectedSingleFood.ratings"
          :title-text="titleText"
          v-on:onChangeSelectedType="onChangeSelectedType"
          v-on:onChangeOnlyText="onChangeOnlyText"
        ></RatingTitle>
        <ul class="rating-list">
          <li
            v-for="(item,index) in selectedSingleFood.ratings"
            :key="index"
            v-show="needShow(item.rateType,item.text)"
          >
            <div class="rating-intro">
              <div class="time">{{item.rateTime|dateFormat}}</div>
              <div class="ID-card">{{item.username}}</div>
              <img :src="item.avatar" alt>
            </div>
            <div class="rating-text">
              <span :class="item.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
              {{item.text}}
            </div>
          </li>
        </ul>
        <div
          class="no-rating"
          v-show="!selectedSingleFood.ratings||!selectedSingleFood.ratings.length"
        >暂无评价!</div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from "vue";
import BScroll from "better-scroll";
import CartControl from "../cartcontrol/CartControl.vue";
import Split from "../split/Split.vue";
import RatingTitle from "../ratingtitle/RatingTitle.vue";
import { dateFormat } from "../../common/js/dateFormat";
Vue.filter("dateFormat", function(time) {
  let date = new Date(time);
  return dateFormat(date, "yyyy-MM-dd hh:mm");
});
export default {
  data() {
    return {
      showFood: false,
      titleText: ["全部", "推荐", "吐槽"],
      foodDetailScroll: null,
      selectedType: 2,
      onlyText: 1
    };
  },
  props: {
    selectedSingleFood: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFood = true;
    },
    hide() {
      this.showFood = false;
    },
    drop: function(e) {
      this.$emit("add", e);
    },
    addFirst: function(e) {
      this.$emit("add", e);
      Vue.set(this.selectedSingleFood, "count", 1);
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
    },
    onChangeSelectedType(value) {
      this.selectedType = value;
      this.foodDetailScroll.refresh();
    },
    onChangeOnlyText(value) {
      this.onlyText = value;
      this.foodDetailScroll.refresh();
    }
  },
  created: function() {
    this.$nextTick(() => {
      console.log(this.$refs);
      this.foodDetailScroll = new BScroll(this.$refs.fooddetailscroll, {
        click: true
      });
    });
  },
  components: {
    CartControl,
    Split,
    RatingTitle
  }
};
</script>
<style lang="scss" scoped>
.food {
  position: fixed;
  z-index: 3;
  top: 0;
  bottom: 48px;
  width: 100%;
  background: white;
  overflow: hidden;
  //   相对transiton的效果，这里实际隐藏了一个语句（因为此语句无效果，所以隐藏，可以理解为是存在的）
  transform: translate3d(0, 0, 0);
  .cover-box {
    width: 100%;
    padding-top: 100%;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .back {
      font-size: 16px;
      color: white;
      z-index: 2;
      left: 10px;
      top: 10px;
      position: absolute;
    }
  }
  .name {
    margin: 18px;
    margin-bottom: 8px;
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    font-weight: 700;
  }
  .sale-data {
    font-size: 10px;
    margin: 0 18px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }
  .price-box {
    margin: 18px;
    display: flex;
    height: 24px;
    align-items: center;
    font-size: 10px;
    .new-price,
    .old-price {
      color: rgb(240, 20, 20);
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      & span {
        font-size: 10px;
        margin-right: -4px;
        font-weight: normal;
      }
    }
    .old-price {
      margin-left: 10px;
      text-decoration: line-through;
      font-weight: normal;
      color: rgb(147, 153, 159);
    }
    .cartcontrol-box {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      .add {
        box-sizing: border-box;
        width: 74px;
        height: 24px;
        border-radius: 24px;
        line-height: 24px;
        background: rgb(0, 160, 220);
        color: white;
        text-align: center;
      }
    }
  }
  .desc {
    padding: 18px;
    .desc-title {
      font-size: 14px;
      font-weight: normal;
      color: black;
    }
    .desc-text {
      margin: 6px 8px 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      line-height: 24px;
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
        .time {
          flex: 1;
        }
        img {
          width: 12px;
          border-radius: 50%;
          height: 12px;
          margin-left: 6px;
        }
      }
      .rating-text {
        font-size: 12px;
        line-height: 16px;
        margin-top: 6px;
        margin-left: 4px;
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
      }
    }
  }
  .no-rating {
    padding: 16px 18px;
    font-size: 16px;
    color: rgba(7, 17, 27, 0.5);
  }
}
.food-fade-enter-active,
.food-fade-leave-active {
  transition: transform 0.3s linear;
}
.food-fade-enter,
.food-fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
.cartcontro-fade-enter-active {
  transition: all 1s linear;
}
.cartcontro-fade-enter,
.cartcontro-fade-leave-to {
  opacity: 0;
}
</style>
