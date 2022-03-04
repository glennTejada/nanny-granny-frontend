<template>
    <v-layout class="row wrap _card">
        <v-flex xs12 pa-0>
            <div class="preview"
                 :style="{backgroundColor: theme.bgColor}">
                <app-svg-icon class="preview-pattern"
                              preserveAspectRatio="xMinYMin slice"
                              :name="`themes/profile/NG_BG-0${pattern}`"
                              :color="`${theme.borderColor} url(#svgicon_themes_profile_NG_BG-0${pattern}_a)`"></app-svg-icon>
            </div>
        </v-flex>
        <v-flex class="_tools">
            <div class="_block-pattern">
                <p class="__title">Pattern</p>
                <v-btn-toggle v-model="pattern"
                              mandatory
                              class="d-flex wrap elevation-0 btn-toggle-group-background">
                    <v-btn v-for="n in 6"
                           :value="n"
                           :key="'pt'+n"
                           :ripple="false"
                           class="_btn-tools"
                           flat>
                        <div class="_btn-tools__content rounded--brand">
                            <app-svg-icon :icon="`themes/profile/NG_BG-0${n}`"
                                          :original="true"></app-svg-icon>
                        </div>
                    </v-btn>
                </v-btn-toggle>
            </div>
            <div class="_block-color">
                <p class="__title">Colour theme</p>
                <v-btn-toggle v-model="color"
                              mandatory
                              class="d-flex wrap elevation-0 btn-toggle-group-background">
                    <v-btn v-for="(item, i) in colors"
                           :value="item"
                           :key="'th'+i"
                           :ripple="false"
                           class="_btn-tools"
                           flat>
                        <div class="_btn-tools__content rounded--brand"
                             :style="{border: `2.8px solid ${item.border}`, backgroundColor: item.bg}"></div>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import '../../components/app-icons/themes'

  export default {
    name: 'app-card-profile-bg',

    props: {
      value: {
        type: Object
      }
    },

    data () {
      return {
        pattern: null,
        color: null,
        inputTheme: this.value || this.defaultTheme(),
        colors: [
          {bg: '#fde7e5', border: '#f56225'},
          {bg: '#d6f4fd', border: '#4d4dff'},
          {bg: '#f6f4eb', border: '#039e8b'},
          {bg: '#039e8b', border: '#fde7e5'},
          {bg: '#4d4dff', border: '#fde7e5'},
          {bg: '#fde7e5', border: '#4d4dff'}
        ]
      }
    },

    computed: {
      theme () {
        if (this.color) {
          return Object.assign({pattern: this.pattern}, {bgColor: this.color.bg}, {borderColor: this.color.border})
        }
      }
    },

    watch: {
      theme () {
        this.$emit('input', this.theme)
      }
    },

    created () {
      this.pattern = this.inputTheme.pattern
      this.color = this.colors.filter((item) => item.bg === this.inputTheme.bgColor && item.border === this.inputTheme.borderColor)[0]
    },

    methods: {
      defaultTheme () {
        return {
          pattern: 1,
          bgColor: '#fde7e5',
          borderColor: '#f56225'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .__title
        margin 22px 0 20px
        @media(min-width 600px)
            margin 22px 0 0
            padding-left 12px
        @media(min-width 768px)
            margin 30px 0 0
    .v-btn-toggle
        flex-wrap nowrap
        overflow auto
        margin 0 -12px
        @media(min-width 600px)
            flex-wrap wrap
            margin 0
        ._btn-tools
            height auto
            max-width 85px
            margin-right 12px
            opacity: 1 !important
            color var(--charcoal)
            @media(min-width 600px)
                margin: 12px 12px 0 0
            @media(min-width 768px)
                max-width 68px
        ._btn-tools__content
            min-width 62px
            max-width 62px
            height 64px
            background-color var(--sand)
            padding 0
            overflow hidden
            @media(min-width 768px)
                min-width 48px
                max-width 48px
                height 50px
            .svg-icon
                width 100%
                height 100%
            &.v-btn--active:after
                right -2px
    .v-btn:hover
        opacity 1
    .v-btn--active:before,
    .v-btn:hover:before,
    .v-btn:focus:before
        background-color transparent
    .preview
        width 100%
        height 182px
        overflow hidden
        position relative
        @media(min-width 768px)
            width 197px
            height 222px
        &-pattern
            height 100%
            position absolute
            left 0
            top 0
        svg:not(:root)
            overflow visible

    @media(min-width 600px)
        ._card
            border 1px solid var(--grey_2)
        ._tools
            display flex
            padding 0 8px 20px
            > div
                max-width 50%
    @media(min-width 768px)
        ._card
            flex-wrap nowrap !important
            > div
                min-width auto !important
                flex-basis auto !important
        ._tools
            padding 0 24px 0
</style>
