/**
  没事看看better-scroll的文档，这是滚动的很好的框架，熟悉之后对业务编程有很大帮助
  并且可以对比学习源码
 */
<template>
  <div class="goods">
    <!-- <transition name="move">
      <div style="color:red;font-size:26px;" v-show="showshow">woshi徐若海</div>
    </transition>
    <div @click="showshowtoggle">点击切换</div>-->
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <!-- 动态类名 -->
        <!-- :style="{'color':hai}" -->
        <!-- :style="styleObject" -->
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="menu-item"
          :class="{'on':index==currentIndex}"
          @click="_selectMenu(index)"
        >
          <div class="inner-box">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>
            <span class="menu-item-text">{{item.name}}</span>
          </div>

          <!-- {{item.name}} -->
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-height-hook">
          <div class="foods-title">{{item.name}}</div>
          <ul class="foods-content">
            <li
              v-for="(item,index) in item.foods"
              :key="index"
              class="foods-item"
              @click.stop.prevent="showFood(item)"
            >
              <div class="main-img">
                <img :src="item.icon" alt>
              </div>
              <div class="main-detail">
                <div class="detail-title">{{item.name}}</div>
                <div class="detail-retitle">{{item.description}}</div>
                <div class="detail-extra">
                  <span>月售{{item.sellCount}}份</span>
                  <span class="detail-rating">好评率{{item.rating}}%</span>
                </div>
                <div class="detail-price" ref="hai">
                  <span class="cur-price">
                    <span>￥</span>
                    {{item.price}}
                  </span>
                  <span class="old-price" v-show="item.oldPrice">
                    <span>￥</span>
                    {{item.oldPrice}}
                  </span>
                  <div class="detail-select">
                    <CartControl :food="item" v-on:add="drop"></CartControl>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :ceshi-array="ceshiArray"
      :selected-goods="selectedGoods"
      ref="shopcart"
    ></ShopCart>
    <Food ref="food" :selected-single-food="selectedSingleFood" v-on:add="drop"></Food>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import ShopCart from "../shopcart/ShopCart.vue";
import CartControl from "../cartcontrol/CartControl.vue";
import Food from "../food/Food.vue";
export default {
  data() {
    return {
      goods: [],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      //存放各个区块的高度
      listHeight: [],
      //滚动条的位置
      scrollY: 0,
      ceshiArray: [1, 2, 3, 4],
      showshow: false,
      // 传入商品详情的商品
      selectedSingleFood: {}
    };
  },
  // App.vue传值
  props: ["seller"],
  // 计算属性
  computed: {
    currentIndex: function() {
      let scrollY = this.scrollY;
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 检测数组的最后一个下标越界和对应的位置
        if (!height2 || (scrollY >= height1 && scrollY < height2)) {
          return i;
        }
      }
    },
    // 遍历查找用户选择的商品(注意数据的层次结构)
    selectedGoods: function() {
      let results = [];
      this.goods.forEach((good, index) => {
        good.foods.forEach((food, innerIndex) => {
          if (food.count) {
            results.push(food);
          }
        });
      });
      return results;
    }
  },
  created: function() {
    this.$http.post("/api/goods", {}).then(res => {
      console.log(res);
      this.goods = res.data;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    });
  },
  mounted: function() {
    console.log(this.$refs);
  },
  methods: {
    showshowtoggle: function() {
      this.showshow = !this.showshow;
    },
    // 初始化滚动插件
    _initScroll: function() {
      console.log(this.$refs.menuwrapper);
      this.menuScroll = new BScroll(this.$refs.menuwrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
        probeType: 3, //检测实时位置
        click: true
      });
      this.foodsScroll.on("scroll", pos => {
        let scrollY = Math.abs(Math.round(pos.y));
        this.scrollY = scrollY;
      });
    },
    // 计算响应的区块的高度
    _calculateHeight: function() {
      let itemList = document.getElementsByClassName("foods-height-hook");
      let height = 0;
      this.listHeight.push(height);
      console.log(itemList);
      for (let i = 0; i < itemList.length; i++) {
        height += itemList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    //手动点击选择菜单
    _selectMenu: function(index) {
      let itemList = document.getElementsByClassName("foods-height-hook");
      let el = itemList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    drop: function(e) {
      this.$refs.shopcart.drop(e);
    },
    // 显示具体的food详情
    showFood: function(item) {
      console.log(item);
      this.selectedSingleFood = item;
      this.$refs.food.show();
    }
  },
  components: {
    ShopCart,
    CartControl,
    Food
  }
};
</script>
<style scoped lang="scss">
@import "../../common/scss/userful.scss";
// .move-enter-active,
// .move-leave-active {
//   transition: all 5s linear;
// }
// .move-enter,
// .move-leave-to {
//   transform: translate3d(100%, 0, 0);
// }
// 除去ul默认样式
ul {
  list-style: none;
}
// 选中样式
.on {
  background: red;
}
// 单独样式开始
.goods {
  display: flex;
  width: 100%;
  position: absolute;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper {
    width: 80px;
    background: #f3f5f7;
    box-sizing: border-box;
    padding: 0 12px;
    ul {
      list-style: none;
      .menu-item {
        &.on {
          position: relative;
          z-index: 10;
          background: white;
          margin-top: -1px;
          width: 80px;
          margin-left: -12px;
          padding: 0 12px;
          font-weight: 700;
          box-sizing: border-box;
          &::after {
            border: none;
          }
        }
        width: 100%;
        height: 54px;
        // height: auto;
        // padding: 10px 0;
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 14px;
        flex-wrap: wrap;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          vertical-align: middle;
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
        .menu-item-text {
          font-size: 12px;
          vertical-align: middle;
          line-height: 14px;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .foods-title {
      width: 100%;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      background: #f3f5f7;
      box-sizing: border-box;
      padding-left: 14px;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
    .foods-item {
      display: flex;
      box-sizing: border-box;
      margin: 0 18px;
      padding: 18px 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .main-img {
        width: 57px;
        height: 57px;
        img {
          width: 57px;
          height: 57px;
        }
      }
      .main-detail {
        margin-left: 10px;
        flex: 1;
        .detail-title {
          margin-top: 2px;
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .detail-retitle,
        .detail-extra {
          margin-top: 8px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
          .detail-rating {
            margin-left: 12px;
          }
        }
        .detail-retitle {
          line-height: 14px;
        }
        .detail-price {
          margin-bottom: 0px;
          margin-top: 2px;
          line-height: 24px;
          color: rgb(147, 153, 159);
          position: relative;

          .cur-price {
            color: #f01414;
            font-size: 14px;
            font-weight: 700;
            span {
              margin-right: -4px;
              font-size: 10px;
              font-weight: normal;
            }
          }
          .old-price {
            margin-left: 8px;
            font-size: 10px;
            font-weight: 700;
            text-decoration: line-through;
            span {
              margin-right: -4px;
              font-weight: normal;
            }
          }
          .detail-select {
            position: absolute;
            right: 0;
            bottom: 0;
            width: auto;
            height: 24px;
          }
        }
      }
    }
    .foods-item:last-child {
      &::after {
        border: none;
      }
    }
  }
}
</style>
