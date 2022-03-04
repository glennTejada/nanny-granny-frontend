<template>
    <v-layout text-xs-center
              _find-card
              :class="[row ? '_find-card--row row' : 'column']">
        <v-flex v-if="!hideToggleRole"
                class="_find-card--toggle-box">
            <app-btn-toggle-role v-model="inputRole"
                                 class="_find-card--toggle-btn"></app-btn-toggle-role>
        </v-flex>
        <v-flex v-if="!hideTitle"
                class="_find-card--title text-xs-center">
            <app-svg-icon v-if="icon"
                          :name="title.icon"
                          :color="title.color"
                          class="mx-3"
                          height="58"></app-svg-icon>
                <div class="_find-card--title__text">
                    <slot name="title">
                        <component :is="titleTag">{{title.text}}</component>
                    </slot>
                </div>
        </v-flex>
        <v-flex class="_find-card--action-box">
            <v-layout text-xs-center justify-center _inputs>
                <v-flex class="_search-box">
                    <app-input-postcode v-model="postcode"
                                        class="_search-box--input"
                                        :height="row ? 48 : 56"
                                        @input="setFocusOnSearchButton"></app-input-postcode>
                    <v-btn :loading="loading"
                           :ripple="false"
                           flat
                           @click="find"
                           class="_btn-search pa-0 ma-0"
                           v-bind:class="{'_button-bg': !!postcode}" ref="btnSearch">
                        <app-svg-icon width="22" name="ui/NG_SEARCH"></app-svg-icon>
                    </v-btn>
                </v-flex>
                <v-flex v-if="inputRole === 'parent'"
                        class="d-flex _before-or align-center">
                    <v-btn to="/job-post" flat class="primary my-0">Post a job</v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppBtnToggleRole from '../app-buttons/app-btn-toggle-role'
  import '../app-icons/ui'

  export default {
    name: 'app-card-find',

    components: {AppBtnToggleRole},

    props: {
      row: Boolean,
      hideTitle: Boolean,
      icon: Boolean,
      hideToggleRole: Boolean,
      titleTag: {
        type: String,
        default: 'h2'
      },
      role: {
        type: String, // <- nanny/parent
        default: 'parent'
      }
    },

    data () {
      return {
        loading: false,
        titles: {
          parent: {
            text: 'Find a NannyGranny',
            icon: 'brand/NG_AGES_0-1',
            color: 'var(--green)'
          },
          nanny: {
            text: 'Find a Job',
            icon: 'brand/NG_JOIN_NETWORK',
            color: 'var(--orange)'
          }
        },
        postcode: null,
        inputRole: this.role
      }
    },

    computed: {
      title () {
        return this.titles[this.inputRole]
      }
    },

    watch: {
      inputRole (val) {
        this.$emit('change-role', val)
      }
    },

    methods: {
      find () {
        const _action = this.inputRole === 'parent' ? 'nannies/NANNIES_FIND' : 'jobs/JOBS_FIND'
        if (this.postcode) {
          this.loading = true
          this.$store.dispatch(_action, {postcode_id: this.postcode.id})
            .then((res) => {
              if (res.data.data.length > 0 || this.$auth.check()) {
                const _namespaced = this.inputRole === 'parent' ? 'nannies' : 'jobs'
                this.$store.commit(_namespaced + '/POSTCODE', this.postcode)
                this.$router.push({path: '/' + _namespaced, query: {redirect: 'find'}})
              } else {
                this.$emit('empty-result', this.postcode)
              }
            }).finally(() => (this.loading = false))
        }
      },
      setFocusOnSearchButton () {
        if (this.postcode) {
          this.$refs.btnSearch.$el.focus()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._find-card
        &--title
            display flex
            flex-direction column
            align-items center
            justify-content center
            @media (min-width 600px)
                flex-direction row
                margin 24px 0 50px
            .svg-icon
                margin-top 40px
                @media (min-width 600px)
                    margin-top 0

            &__text
                margin 20px 0 35px
                @media (min-width 600px)
                    margin 0
        &--row
            align-items: baseline
            > .flex
                padding 0 16px
            ._find-card--toggle-btn
                font-size 12px
            ._find-card
                &--toggle-box
                    max-width 440px
                &--action-box
                    max-width 697px
            ._search-box
                max-width 450px
            ._before-or
                .v-btn
                    height 48px

    ._inputs
        flex-direction column
        @media (min-width 600px)
            flex-direction row

    ._before-or
        flex-direction column

        &:before
            content 'or'
            margin 14px 24px
        @media (min-width 600px)
            max-width 215px
            flex-direction row

        .v-btn
            min-width 100%
            @media (min-width 600px)
                min-width 145px
                height 56px

    ._search-box
        position relative
        @media (min-width 600px)
            max-width 540px

        ._btn-search
            position absolute
            right 1px
            top 1px
            color var(--blue)
            font-size 28px
            padding 4px 18px
            min-width 54px
            max-width 54px
            height calc(100% - 3px)
            border-radius 50%
            background-color rgba(255, 255, 255, 0.8)

            &._button-bg
              background-color #dedede
              animation glowing 3000ms 3

            &:before
                content none !important

            &:hover
                color var(--blue_hover)
                cursor pointer
  @keyframes glowing {
    0% {
      background-color: #dedede
    }
    50% {
      background-color: inherit
    }
    100% {
      background-color: #dedede
    }
}
</style>
