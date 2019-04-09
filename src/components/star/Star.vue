<template>
  <div class="star" :class="starSize">
    <span v-for="(classItem,index) in classBox" :key="index" class="star-item" :class="classItem"></span>
  </div>
</template>
<script>
const ON = "on";
const HALF = "half";
const OFF = "off";
const FULL_SCORE = 5;
export default {
  data() {
    return {
      star: "测试Star"
    };
  },
  props: ["score", "size"],
  //   计算属性
  computed: {
    starSize: function() {
      return "star-" + this.size;
    },
    classBox: function() {
      let results = [];
      let score = this.score;
      //点亮的整颗星
      for (let i = 0; i < parseInt(score); i++) {
        results.push(ON);
      }
      //点亮的半颗星
      let half = score - parseInt(score) > 0 ? true : false;
      if (half) {
        results.push("half");
      }
      //没点亮的星星
      let off = FULL_SCORE - results.length;
      for (let i = 0; i < off; i++) {
        results.push(OFF);
      }
      // console.log(results);
      return results;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/userful.scss";
.star.star-24 .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 6px;
  background-size: 10px 10px;
  background-repeat: no-repeat;
}
.star.star-36 .star-item {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
  background-repeat: no-repeat;
}
.star.star-48 .star-item {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  background-size: 20px 20px;
  background-repeat: no-repeat;
}
.star.star-24 .on {
  @include bg-image("star24_on");
}
.star.star-24 .half {
  @include bg-image("star24_half");
}
.star.star-24 .off {
  @include bg-image("star24_off");
}
.star.star-36 .on {
  @include bg-image("star36_on");
}
.star.star-36 .half {
  @include bg-image("star36_half");
}
.star.star-36 .off {
  @include bg-image("star36_off");
}
.star.star-48 .on {
  @include bg-image("star48_on");
}
.star.star-48 .half {
  @include bg-image("star48_half");
}
.star.star-48 .off {
  @include bg-image("star48_off");
}
.star-item:last-child {
  margin-right: 0px;
}
</style>


