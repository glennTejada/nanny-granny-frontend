<template>
    <v-card flat>
        <v-card-text class="select-all">
            <v-checkbox v-if="!readonly"
                        :ripple="false"
                        @click="clickSelectAll"
                        v-model="selecAllChecked"
                        class="mt-1"
                        hide-details>
                <template slot="label">
                    <span class="text-small text--charcoal">Select All</span>
                </template>
            </v-checkbox>
        </v-card-text>
        <v-card class="_card elevation-0">
            <v-card-text class="pa-0">
                <v-btn-toggle v-model="select"
                            class="d-flex wrap elevation-0"
                            multiple>
                    <v-btn v-for="item in items"
                        :value="item.id"
                        :ripple="false"
                        :key="item.id"
                        :disabled="readonly"
                        active-class="v-btn--active v-btn-app--active"
                        flat>
                        <div class="_btn-content">
                            <app-svg-icon :name="`${iconDir}/NG_${item.slug.toString().toUpperCase()}`"></app-svg-icon>
                            <span class="icon-label app-text-light">{{ item.name | capitalize }}</span>
                        </div>
                    </v-btn>
                </v-btn-toggle>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script>
  import '../app-icons'

  export default {
    name: 'app-btn-toggle-qualifications',

    props: {
      value: {
        type: Array,
        default: () => []
      },
      iconDir: String,
      items: {
        type: Array,
        required: true
      },
      readonly: Boolean
    },

    data () {
      return {
        select: this.value || [],
        selecAllChecked: this.checkSelectAll()
      }
    },
    methods: {
      clickSelectAll () {
        if (this.selecAllChecked) {
          this.select = []
          this.selecAllChecked = false
        } else {
          this.select = this.items.map(e => {
            return e.id
          })
          this.selecAllChecked = true
        }
      },
      checkSelectAll () {
        if (!Array.isArray(this.select)) {
          return false
        }
        return this.items.length === this.select.length
      }
    },
    watch: {
      value (v) {
        this.select = v
        this.selecAllChecked = this.checkSelectAll()
      },
      select () {
        this.$emit('input', this.select)
      }
    },
    mounted () {
      this.selecAllChecked = this.checkSelectAll()
    }
  }
</script>

<style lang="stylus" scoped>
    .select-all
        padding 5px 0
        span
            font-weight 600
    ._card
        max-width 750px
        border none !important
        .v-card__text
            border 1px solid var(--grey_3)
            .v-item-group
                padding-top 10px
                padding-bottom 10px
        .v-btn-toggle
            background transparent
            flex-direction column
            .v-btn
                opacity 1
                height auto
                border none
                color var(--grey_2) !important
                ._btn-content
                    display flex
                    flex-direction row
                    align-items center
                    justify-content flex-start
                    min-width 100%
                    padding 8px 16px
                    .svg-icon
                        width 20px
                        height 28px
                        margin-right 16px
                .icon-label
                    display block
                    /*text-decoration line-through*/
                    /*font-size 0.778em*/
                    font-size 1.1666rem
                    color var(--charcoal) !important
                    margin 0.2em
                &:hover
                    color var(--blue)
                    opacity 1
                    .icon-label
                        color var(--black)
                &-app--active
                    color var(--blue) !important
                    .icon-label
                        color var(--black) !important
                        text-decoration none
                    &:before
                        background-color transparent
                &:hover:before,
                &:focus:before
                    background-color transparent
                &.v-btn--disabled
                    color initial

    @media (min-width: 600px)
        ._card
            padding-top 0
            padding-bottom 0
            border-radius 0
            background-image repeating-linear-gradient(180deg, #ecebeb, #ecebeb 1px, #fff 1px, #fff 129px)
            .v-card__text
                .v-item-group
                    padding-top 0
                    padding-bottom 0
            .v-btn-toggle
                flex-direction row
                flex-wrap wrap
                .v-btn
                    width 25%
                    max-width: 25%
                    min-height 128px
                    ._btn-content
                        flex-direction column
                        .svg-icon
                            width 46px
                            margin 0
                            height 48px
                    .icon-label
                        font-size 0.778em
</style>
