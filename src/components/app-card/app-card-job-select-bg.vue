<template>
    <v-layout row wrap ma-0 class="border border--grey_2">
        <v-flex xs12 sm6 pa-0>
            <div class="preview"
                 :style="{backgroundColor: theme.bgColor}">
                <app-svg-icon class="preview-pattern"
                              preserveAspectRatio="xMinYMin slice"
                              :name="`themes/job/NG_BG-0${theme.pattern}`"
                              :original="true"></app-svg-icon>
            </div>
        </v-flex>
        <v-flex xs12 sm6 d-flex align-center>
            <div class="d-inline-block _tools">
                <p class="">Theme</p>
                <v-btn-toggle v-model="theme"
                              mandatory
                              class="elevation-0 btn-toggle-group-background">
                    <v-btn v-for="item in themes"
                           :value="item"
                           :key="'th_'+item.pattern"
                           :ripple="false"
                           class=""
                           flat>
                        <div class="rounded--brand"
                             :style="{border: `2.8px solid ${item.borderColor}`, backgroundColor: item.bgColor}"></div>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import '../../components/app-icons/themes'

  export default {
    name: 'app-card-job-select-bg',

    props: {
      value: {
        type: Object
      }
    },

    data () {
      return {
        themes: [
          {pattern: 1, bgColor: '#fde7e5', borderColor: '#f56225'},
          {pattern: 2, bgColor: '#d6f4fd', borderColor: '#4d4dff'},
          {pattern: 3, bgColor: '#f6f4eb', borderColor: '#039e8b'},
          {pattern: 4, bgColor: '#039e8b', borderColor: '#4d4dff'}
        ],
        theme: this.value
      }
    },

    watch: {
      theme () {
        this.$emit('input', this.theme)
      }
    },

    created () {
      let key = this.value && this.value.pattern ? (this.value.pattern - 1) : 0
      this.theme = this.themes[key]
    },

    methods: {
      defaultTheme () {
        return this.themes[0]
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._tools
        padding: 20px 0
        @media (min-width 700px)
            padding: 20px
    .v-btn-toggle
        flex-wrap wrap
        .v-btn:first-child
            padding-left 0 !important
        .rounded--brand
            width 42px
            height 43px
            @media (min-width 600px)
                width 50px
                height 51px
    .v-btn:hover
        opacity 1
    .v-btn--active:before,
    .v-btn:hover:before,
    .v-btn:focus:before
        background-color transparent
    .preview
        width 100%
        height 290px
        overflow hidden
        position relative
        @media (min-width 600px)
            height 210px
        &-pattern
            width 100%
            height 100%
            position absolute
            left 0
            top 0
        svg:not(:root)
            overflow visible
</style>
