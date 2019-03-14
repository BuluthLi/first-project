<template>
  <div class="rating-title">
    <div class="type">
      <div class="all" :class="{'active':selectedType==2}" @click="onChangeSelectedType(2)">
        <span class="title">{{titleText[0]}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="like" :class="{'active':selectedType==0}" @click="onChangeSelectedType(0)">
        <span class="title">{{titleText[1]}}</span>
        <span class="count">{{like.length}}</span>
      </div>
      <div class="dislike" :class="{'active':selectedType==1}" @click="onChangeSelectedType(1)">
        <span class="title">{{titleText[2]}}</span>
        <span class="count">{{dislike.length}}</span>
      </div>
    </div>
    <div class="onlytext">
      <span class="icon-check_circle normal" :class="{'gouxuan':onlyText}"></span>
      <span style="margin-left:4px;" @click="onChangeOnlyText">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      selectedType: 2,
      onlyText: 1,
      ratingscroll: null
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    titleText: {
      type: Array,
      default() {
        return ["全部", "推荐", "吐槽"];
      }
    }
  },
  computed: {
    like() {
      return this.ratings.filter(item => {
        return item.rateType === 0;
      });
    },
    dislike() {
      return this.ratings.filter(item => {
        return item.rateType === 1;
      });
    }
  },
  methods: {
    onChangeSelectedType: function(type) {
      this.selectedType = type;
      this.$emit("onChangeSelectedType", type);
    },
    onChangeOnlyText: function() {
      this.onlyText = !this.onlyText;
      this.$emit("onChangeOnlyText", this.onlyText);
    }
  }
};
</script>
<style lang="scss" scoped>
.rating-title {
  padding: 0 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);

  .type {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(226, 232, 238, 0.1);
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      color: rgb(77, 85, 93);
      font-size: 12px;
      line-height: 16px;
      .count {
        font-size: 8px;
        margin-left: 4px;
      }
    }
    .all {
      background: rgba(0, 160, 220, 0.2);
    }
    .like {
      margin-left: 8px;
      background: rgba(0, 160, 220, 0.2);
    }
    .dislike {
      margin-left: 8px;
      background: rgba(77, 85, 93, 0.2);
    }
    .active {
      background: rgb(0, 160, 220);
      color: white;
    }
  }
  .onlytext {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 12px;
    color: rgb(147, 153, 159);
    .gouxuan {
      color: rgb(0, 160, 220);
    }
  }
}
</style>
