<template>
    <v-btn-toggle v-model="select"
                  @change="handleInput"
                  mandatory
                  color="transparent"
                  class="elevation-0 _btn-toggle-icon">
        <v-btn v-for="item in items"
               :key="item.name"
               :value="item.name"
               color="transparent"
               flat>
            <div v-if="outline"
                 class="primary--text">
                <app-brandshape-border :width="$vuetify.breakpoint.xsOnly ? '60px':'66px'"
                                       :height="$vuetify.breakpoint.xsOnly ? '60px':'66px'">
                    <div class="d-flex align-center justify-center fill-height">
                        <app-svg-icon :name="`brand/${item.name}`" class="pa-1"></app-svg-icon>
                    </div>
                </app-brandshape-border>
            </div>
            <app-brandshape v-else
                            :color="$vuetify.theme.sand"
                            :width="$vuetify.breakpoint.xsOnly ? '60px':'66px'"
                            :height="$vuetify.breakpoint.xsOnly ? '60px':'66px'">
                <div class="d-flex align-center justify-center fill-height pa-3"
                     :style="{backgroundColor: $vuetify.theme.primary}">
                    <app-svg-icon :name="`brand/${item.name}`"
                                  color="#fff"></app-svg-icon>
                </div>
            </app-brandshape>
        </v-btn>
    </v-btn-toggle>
</template>

<script>
  import AppBrandshape from '../app-brandshape'
  import AppBrandshapeBorder from '../app-brandshape-border'
  export default {
    name: 'app-btn-toggle-icon',
    components: {AppBrandshapeBorder, AppBrandshape},
    props: {
      value: String,
      items: {
        type: Array,
        required: true
      },
      outline: Boolean
    },
    data () {
      return {
        select: null
      }
    },
    created () {
      if (this.value) {
        this.select = this.items.filter(item => item.name === this.value)[0].name
      }
    },
    methods: {
      handleInput () {
        this.$emit('input', this.select)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-toggle-icon._btn-toggle-icon
        background-color transparent
        @media (min-width 600px)
            display flex
        .v-btn
            height auto
            opacity .7
            &.v-btn--active
                opacity 1
</style>
