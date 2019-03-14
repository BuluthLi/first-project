// vetical-align是针对行内元素的，是具有包含关系的才会生效
// 例如content-left中的price和content-right就是很明显的比较
<template>
  <div class="shopcart">
    <div class="hia" @click="haicehsiSHIFT" v-show="0">haihai</div>
    <div class="content" @click="listFode">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="totalCount>0?'have':'none'">
            <i class="icon-shopping_cart"></i>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
        </div>
        <div class="price" :class="{'high-light':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="freight" v-if="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <!-- 需要禁止冒泡(stop是阻止冒泡，prevent是阻止默认行为，例如a标签的跳转；两种修饰符可以链式书写) -->
      <div
        class="content-right"
        v-if="minPrice"
        :class="payClass"
        @click.stop.prevent="pay"
      >{{payDesc}}</div>
    </div>
    <transition-group
      name="drop"
      tag="div"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >
      <div class="ball-container" v-for="(item,index) in balls" :key="index+10" v-show="item.show">
        <div class="ball-inner inner-hook"></div>
      </div>
    </transition-group>
    <transition name="listshow">
      <div class="selectedgoods-list" v-show="listShow">
        <div class="list-header">
          <span>购物车</span>
          <span @click="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li v-for="(item,index) in selectedGoods" :key="index" class="selected-item">
              <div class="selected-item-name">{{item.name}}</div>
              <div class="selected-item-price">
                <span class="icon">￥</span>
                <span>{{item.price}}</span>
              </div>
              <div class="selected-cartcontral-box">
                <CartControl :food="item" v-on:add="drop"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="shade-fade">
      <div class="shade" v-show="listShow" @click="closeListShow"></div>
    </transition>
  </div>
</template>
<script>
import CartControl from "../cartcontrol/CartControl";
export default {
  data() {
    return {
      // getDeliveryPrice: "",
      // getMinPrice: "",
      balls: [
        { show: false, el: null },
        { show: false, el: null },
        { show: false, el: null },
        { show: false, el: null },
        { show: false, el: null }
      ],
      dropedBalls: [],
      // 折叠
      fode: true,
      ceshi: [{ show: false, el: "hai" }],
      ceshi2: [{ show: false, el: "hai" }]
    };
  },
  props: ["deliveryPrice", "minPrice", "ceshiArray", "selectedGoods"],
  // watch一般不用对props传数据进行检测，但这是一个很好的方法
  watch: {
    // deliveryPrice(val, oldVal) {
    //   this.getDeliveryPrice = val;
    //   console.log("deliveryPrice数据观察：", val, oldVal);
    // }
  },
  computed: {
    totalPrice: function() {
      let totalPrice = 0;
      this.selectedGoods.forEach((el, index) => {
        totalPrice += el.price * el.count;
      });
      return totalPrice;
    },
    totalCount: function() {
      let totalCount = 0;
      this.selectedGoods.forEach((el, index) => {
        totalCount += el.count;
      });
      return totalCount;
    },
    payDesc: function() {
      if (this.totalPrice == 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.minPrice > this.totalPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return "去结算";
      }
    },
    payClass: function() {
      if (this.minPrice > this.totalPrice) {
        let diff = this.minPrice - this.totalPrice;
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow: function() {
      if (!this.totalCount) {
        this.fode = true;
        return false;
      }
      let show = !this.fode;
      return show;
    }
  },
  methods: {
    // 小球动画事件,（小球动画和count的加减分离开了，该函数只是单纯的小球动画）
    drop(e) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = e;
          this.dropedBalls.push(ball);
          return;
        }
      }
    },
    //变化的位置（transform）由js控制，外部box控制y轴，内部box控制x,具体变化函数由css控制
    beforeEnter: function(el) {
      // console.log(el);
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el;
          let x = rect.pageX - 32;
          let y = -(window.innerHeight - rect.pageY - 22);
          el.style.display = "";
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      // 触发重绘
      window.getComputedStyle(el);
      // let rf = el.offsetHeight();
      this.$nextTick(() => {
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
      // done();
    },
    //动画完成，释放该球
    afterEnter: function(el) {
      /** 涉及到深拷贝和浅拷贝问题，这里只是操作数组索引,即为通过操作dropedBalls的ball,其实操作的是一个索引，改变它指向的内存的值，ball.show = false;  el.style.display = "none";
       * this.balls的同一索引指向的值也会变化，于是有了下面通俗的方法二
       */

      // 法一
      let ball = this.dropedBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
      // 法二
      // let ball = this.dropedBalls.shift();
      // //ball是undefied表示没有球在运动，否则有，而且到了这一步，将他重置为静止的小球
      // if (!ball) {
      //   return;
      // }
      // for (let i = 0; i < this.balls.length; i++) {
      //   let reball = this.balls[i];
      //   if (reball.show) {
      //     reball.show = false;
      //     reball.el = null;
      //     el.style.display = "none";
      //     return;
      //   }
      // }
    },
    listFode: function() {
      this.fode = !this.fode;
    },
    haicehsiSHIFT: function() {
      let hai = this.ceshi[0];
      this.ceshi2.push(hai);
      let ha = this.ceshi2.shift();
      ha.el = "真的只是操作索引啊";
      console.log(this.ceshi);
      console.log(ha);
    },
    // 清空购物车
    empty: function() {
      this.selectedGoods.forEach(food => {
        if (food.count) {
          food.count = 0;
        }
      });
    },
    //关闭购物车列表
    closeListShow: function() {
      this.fode = true;
    },
    // 去结算
    pay: function() {
      window.alert(`需要支付${this.totalPrice}元`);
    }
  },
  components: {
    CartControl
  }
};
</script>
<style lang="scss" scoped>
.shopcart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  z-index: 100;
  .content {
    display: flex;
    background: #141d27;
    .content-left {
      font-size: 0px;
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -12px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        background: #141d27;
        border-radius: 50%;
        padding: 6px;
        margin: 0 15px;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;

          text-align: center;
          position: relative;
          &.have {
            background: #00a0dc;
          }
          &.none {
            background: #2b343c;
          }
          &.have .icon-shopping_cart {
            color: white;
          }
          .icon-shopping_cart {
            display: inline-block;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.1);
            line-height: 44px;
          }
          .num {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 24px;
            height: 16px;
            line-height: 16px;
            border-radius: 16px;
            font-size: 9px;
            box-sizing: border-box;
            padding: 0 6px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
            font-weight: 700;
            color: white;
            background: #f01414;
          }
        }
      }
      .price {
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        /* margin-top: 34px; */
        // vertical-align: top生效
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.high-light {
          color: white;
        }
      }
      .freight {
        display: inline-block;
        margin-left: 12px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      font-weight: 700;
      width: 105px;
      display: inline-block;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
      line-height: 24px;
      // vertical-align: bottom不生效
      vertical-align: bottom;
      padding-top: 12px;
      text-align: center;
      &.not-enough {
        background: #2b333b;
      }
      &.enough {
        background: #099b76;
        color: white;
      }
    }
  }
  .ball-container {
    position: fixed;
    bottom: 22px;
    left: 32px;
    z-index: 200;
    .ball-inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #00a0dc;
    }
  }
  .drop-enter-active {
    transition: transform 0.3s cubic-bezier(0.02, 0.09, 0.36, -0.81);
    & .ball-inner {
      transition: transform 0.3s linear;
    }
  }
  // 原本的位置，gai在哪就在哪
  .selectedgoods-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    // height: 300px;
    max-height: 305px;
    transform: translate3d(0, -100%, 0);
    // 进
    &.listshow-enter {
      transform: translate3d(0, 0, 0);
    }
    &.listshow-enter-active {
      transition: transform 0.3s ease;
    }
    &.listshow-enter-to {
      // transform: translate3d(0, -100%, 0);
    }
    // 退
    &.lsitshow-leave {
      // transform: translate3d(0, -100%, 0);
    }
    &.listshow-leave-active {
      transition: transform 0.3s ease;
      // transform: translate3d(0, 0, 0);
    }
    &.listshow-leave-to {
      transform: translate3d(0, 0, 0);
    }
    // 其他样式
    & .list-header {
      background: #f3f5f7;
      height: 40px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 5%;
      font-size: 14px;
      line-height: 40px;
      font-weight: 200;
      position: relative;
      & span:first-child {
        color: rgb(7, 17, 27);
      }
      & span:last-child {
        color: rgb(0, 160, 220);
        float: right;
      }
    }
    .list-content {
      background: white;
      max-height: 265px;
      overflow: hidden;
      overflow-y: auto;
      .selected-item {
        height: 48px;
        box-sizing: border-box;
        padding: 12px 5%;
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 14px;
        line-height: 24px;
        .selected-item-name {
          flex: 1;
          color: rgb(7, 17, 27);
        }
        .selected-item-price {
          margin-right: 12px;
          margin-left: 18px;
          color: rgb(240, 20, 20);
          // 消除字体间空隙
          font-size: 0px;
          display: flex;
          align-items: center;
          & span {
            font-size: 12px;
            font-weight: 700;
          }
          & .icon {
            font-size: 10px;
            font-weight: 200;
          }
        }
      }
    }
  }
  .shade {
    position: fixed;
    // 底部购物车是原生，购物车列表-1；故shade置为-2
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    &.shade-fade-enter,
    &.shade-fade-leave-to {
      opacity: 0;
    }
    .shade-fade-enter-active,
    .shade-fade-leave-active {
      transition: opacity 0.3 ease;
    }
  }
}
</style>


