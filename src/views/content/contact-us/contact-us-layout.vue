<template>
  <div class="p-relative overflow-hidden">
    <div>
      <slot></slot>
    </div>
    <!--BACKGROUND ELEMENTS-->
    <div v-if="$vuetify.breakpoint.mdAndUp" class="_contact-us--bg-elements">
      <div>
        <app-svg-icon name="brand/NG_CONTACT" color="var(--green)" class="svg-icon--contact"></app-svg-icon>
      </div>
      <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
        <app-svg-icon
          name="brand/NG_CREATIVE_PLAY"
          color="var(--orange)"
          class="svg-icon--creativeplay"
        ></app-svg-icon>
      </div>
      <!-- <div v-parallax="$helpers.getSpeedAnimationUp()" v-scrollanim="{ bEnt: 'before-fadein', enter: 'fadein smooth-parallax' }"> -->
      <div v-parallax="$helpers.getSpeedAnimationUp()"  class="smooth-parallax">
        <app-svg-icon
          name="patterns/NG_Pattern-01"
          color="none var(--yellow)"
          class="svg-icon--pattern-01"
        ></app-svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact-us-layout'
}
</script>

<style lang="stylus" scoped>
._contact-us--bg-elements {
  .svg-icon {
    position: absolute;

    &--contact {
      width: 90px;
      height: 90px;
      top: 90px;
      right: calc(50% - 35%);
    }

    &--creativeplay {
      width: 105px;
      height: 105px;
      // top: 360px;
      top: -620px;
      left: calc(50% - 35%);
      transform: rotate(0deg);
      @media (max-width 1440px) {
        left: calc(50% - 40%);
      }
      @media (max-width 1024px) {
        left: calc(50% - 50%);
      }
    }

    &--pattern-01 {
      width: 220px;
      height: 250px;
      // bottom: -7.5em;
      bottom: 1em;
      left: calc(50% - 25%);
      transform: rotate(0deg);
      @media (max-width 1440px) {
        left: calc(50% - 33%);
      }
      @media (max-width 1024px) {
        left: calc(50% - 45%);
      }
    }
  }
}
</style>
