<template>
    <v-layout align-center justify-center fill-height column app-need-help
      class="bg-animate" v-scrollanim="{ bEnt: 'app-bg-white', enter: 'app-bg-sand' }">
        <h2>Need help?</h2>
        <div class="mt-3 app-need-help-text px-3 text-xs-center">
            <slot>
                Need help with the website or your account? Try our
                <router-link to="/faqs" tag="a" class="link-small">FAQs.</router-link>
            </slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <div v-if="$vuetify.breakpoint.mdAndUp"
                class="app-need-help--bg-elements smooth-parallax" v-parallax="$helpers.getSpeedAnimationUp()">
            <app-svg-icon name="patterns/NG_Pattern-15"
                          color="none var(--blue)"
                          class="svg-icon--pattern"></app-svg-icon>
        </div>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-card-faqs'
  }
</script>

<style lang="stylus" scoped>
    .app-need-help
        min-height 210px
        // background-color var(--sand)
        position relative
        overflow hidden
        &-text
            font-size 1.1428571428571428rem
        &--bg-elements
            position absolute
            right -28px
            bottom 0
            .svg-icon--pattern
                width 160px
                height 220px
    @media (min-width: 600px)
        .app-need-help
            min-height 270px
</style>
