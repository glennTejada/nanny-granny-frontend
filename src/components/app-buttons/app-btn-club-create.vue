<template>
    <div class="_card-club">
        <div class="_card-club--icon">
            <app-brandshape :color="color"
                            :width="$vuetify.breakpoint.xsOnly ? '60px':'80px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px':'80px'">
                <div class="d-flex align-center justify-center fill-height pa-3"
                     :style="{backgroundColor: primary ? $vuetify.theme.primary : $vuetify.theme.sand}">
                    <app-svg-icon name="ui/NG_CLOSE"
                                  :color="primary ? '#fff' : $vuetify.theme.primary"></app-svg-icon>
                </div>
            </app-brandshape>
        </div>
        <div>
            <slot>
                Ideas for another club?
            </slot>
            <a @click="dialogClubCreate"
               class="text-small">Create a new club</a>
        </div>
    </div>
</template>

<script>
  import AppBrandshape from '@/components/app-brandshape'

  export default {
    name: 'app-btn-club-create',
    components: {AppBrandshape},
    props: {
      color: {
        type: String,
        default: '#fff'
      },
      primary: Boolean
    },
    methods: {
      dialogClubCreate () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-club-create',
          options: {
            maxWidth: 685
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-club
        min-height 80px
        display flex
        align-items flex-start
        @media (min-width 600px)
            align-items center
        ._card-club
            &--icon
                position relative
                margin-right 24px
                @media (min-width 600px)
                    margin-right 40px
                .svg-icon
                    width 20px
                    height 20px
                    transform rotate(45deg)

</style>
