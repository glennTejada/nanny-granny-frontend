<template>
    <v-btn flat
           @click="showForm"
           :ripple="false"
           block
           class="ma-0 pa-0">
        <div class="text-xs-center"
             style="max-width: 100%">
            <app-brandshape :color="$vuetify.theme.blueLight"
                            :width="$vuetify.breakpoint.xsOnly ? '100px':'120px'"
                            :height="$vuetify.breakpoint.xsOnly ? '100px':'120px'"
                            class="mx-auto">
                <div class="d-flex align-center justify-center fill-height pa-3"
                     :style="{backgroundColor: '#fff'}">
                    <app-svg-icon name="ui/NG_CLOSE"
                                  :color="$vuetify.theme.primary"></app-svg-icon>
                </div>
            </app-brandshape>
            <p class="my-3 primary--text text-truncate font-class">Create a new club category</p >
        </div>
    </v-btn>
</template>

<script>
  import AppBrandshape from '../app-brandshape'
  export default {
    name: 'app-btn-club-category-create',
    components: {AppBrandshape},
    props: {
      color: {
        type: String
      }
    },
    methods: {
      showForm () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-club-category-create',
          options: {
            maxWidth: 685
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .v-btn
        max-width 100%
        height auto
        &:before
            content none
    .svg-icon
        width 40px
        height 40px
        transform rotate(45deg)
    .font-class
        font-size: 1.0em;
</style>
