<template>
  <div :class='"star star-" + size'>
    <span class="star-item" :class="starClass" v-for="(starClass , index) in starClasses" :key="index"></span>
  </div>
</template>

<script type='es6'>
export default {
  props: {
    size: String,
    score: Number
  },
  computed: {
    starClasses () {
      const {score} = this
      let starArr = []
      const scoreInteger = Math.floor(score)
      for (let i = 0; i < scoreInteger; i++) {
        starArr.push('on')
      }
      if (score * 10 - scoreInteger * 10 >= 5) {
        starArr.push('half')
      }
      while (starArr.length < 5) {
        starArr.push('off')
      }
      /* for (let i = starArr.length ; i<5 ;i++){
          starArr.push('off')
        } */
      return starArr
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
