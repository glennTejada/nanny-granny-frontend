<template>
  <div class="p-relative overflow-hidden" :style="{width:'100%'}">
    <div>
      <slot></slot>
    </div>
    <!--BACKGROUND ELEMENTS-->
    <div v-if="$vuetify.breakpoint.mdAndUp" class="_safety_middle--bg-elements">
      <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
        <app-svg-icon
          name="patterns/NG_Pattern-02"
          color="none var(--green)"
          class="svg-icon--pattern-02"
        ></app-svg-icon>
      </div>
      <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
        <app-svg-icon
          name="brand/NG_ACTIVE"
          color="var(--blue)"
          class="svg-icon--active"
        ></app-svg-icon>
      </div>
      <div v-parallax="$helpers.getSpeedAnimationUp()" class="smooth-parallax">
        <app-svg-icon
          name="patterns/NG_Pattern-16"
          color="none var(--orange)"
          class="svg-icon--pattern-16"
        ></app-svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'safety-layout-middle'
}
</script>

<style lang="stylus" scoped>
._safety_middle--bg-elements {
  .svg-icon {
    position: absolute;

    &--pattern-02 {
      width: 180px;
      height: 250px;
      // top 310px
      top: -530px;
      left: -4.2em;
      transform: rotate(35deg);
    }

    &--active {
      width: 90px;
      height: 80px;
      // top 150px
      top: -700px;
      right: calc(50% - 30%);
      transform: rotate(10deg);
      @media (max-width 1440px) {
        right: calc(50% - 40%);
      }
      @media (max-width 1024px) {
        right: calc(50% - 50%);
      }
    }

    &--pattern-16 {
      width: 120px;
      height: 100px;
      // top: 820px;
      top: -170px;
      right: -1em;
      z-index: 5;
    }
  }
}
</style>
