<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="decrease icon-remove_circle_outline icon"
        v-show="food.count"
        @click="decrease"
        :key="1"
      ></div>
    </transition>
    <!-- <transition name="move"> -->
    <div class="num" v-show="food.count" :key="2">{{food.count}}</div>
    <!-- </transition> -->
    <div class="add icon icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      show: true
    };
  },
  props: ["food"],
  computed: {
    count: function() {}
  },
  methods: {
    decrease() {
      if (this.food.count) {
        this.food.count--;
      }
    },
    add(e) {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        // 引用類型，值修改vue不會報錯，基础类型不可以
        this.food.count++;
      }
      // 为了两个动画效果不冲突
      this.$nextTick(() => {
        this.$emit("add", e);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cartcontrol {
  font-size: 0px;
  display: flex;
  align-items: center;
  & span {
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    padding: 5px;
  }
  .decrease {
    display: inline-block;
  }

  .num {
    display: inline-block;
    width: 12px;
    // height: 24px;
    color: rgb(147, 153, 159);
    font-size: 10px;
    text-align: center;
  }
  .add {
    display: inline-block;
  }
}
// -------------------------------------------------------
// vue的transition过渡的样式类不能用sass的层叠写法（写在外面）
// 进入完成的样式

// 刚进入和离开的样式
.move-enter,
.move-leave-to {
  opacity: 0;
}

// 进入动画类名，添加样式
.move-enter-active {
  transition: opacity 0.3s ease;
  animation: bounce-in 0.3s ease;
}
@keyframes bounce-in {
  0% {
    transform: translateX(12px) rotate(0);
  }
  50% {
    transform: translateX(6px) rotate(90deg);
  }
  100% {
    transform: translateX(0) rotate(180deg);
  }
}
@keyframes bounce-out {
  0% {
    transform: translateX(0) rotate(0);
  }
  50% {
    transform: translateX(6px) rotate(90deg);
  }
  100% {
    transform: translateX(12px) rotate(180deg);
  }
}
// 离开动画类名，添加样式
.move-leave-active {
  transition: opacity 0.3s ease;
  animation: bounce-out 0.3s ease;
}
</style>
