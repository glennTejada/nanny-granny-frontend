<template>
  <div class="p-relative overflow-hidden">
    <div>
      <slot></slot>
    </div>
    <!--BACKGROUND ELEMENTS-->
    <div v-if="$vuetify.breakpoint.mdAndUp" class="_testimonials--bg-elements">
      <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
        <app-svg-icon
          name="brand/NG_CHILDCARE_QUAL"
          color="var(--blue_medium)"
          class="svg-icon--childcarequal"
        ></app-svg-icon>
      </div>
      <app-svg-icon
        name="patterns/NG_Pattern-01"
        color="none var(--green)"
        class="svg-icon--pattern-01"
      ></app-svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'testimonials-layout'
}
</script>

<style lang="stylus" scoped>
._testimonials--bg-elements {
  .svg-icon {
    position: absolute;

    &--childcarequal {
      width: 100px;
      height: 210px;
      // top: 140px;
      top: -2250px;
      right: calc(50% - 30%);
      transform: rotate(20deg);
      @media (max-width 1440px) {
        right: calc(50% - 40%);
      }
      @media (max-width 1024px) {
        right: calc(50% - 50%);
      }
    }

    &--pattern-01 {
      width: 215px;
      height: 250px;
      top: 70px;
      left: -6.9em;
      transform: rotate(0deg);
    }
  }
}
</style>
