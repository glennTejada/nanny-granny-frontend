<template>
    <v-flex :class="{'app-card-listing xs12': true, 'md6': grid}">
        <v-card :class="{'border border--grey_2 _card-item': true, '_card-item--small': grid}"
                light
                flat>
            <v-flex>
                <v-container pa-0>
                    <v-layout row wrap _card-body>
                        <v-flex :class="{'xs12': true, 'md6': !grid}">
                            <v-layout row wrap>
                                <v-flex xs12 class="_card--header" px-3>
                                    <slot name="header"></slot>
                                </v-flex>
                                <v-flex xs12 px-3>
                                    <v-layout row _details>
                                        <slot name="details">
                                            <v-flex xs6>
                                                <div>{{type === 'job' ? 'Type of work' : 'Looking for'}}</div>
                                                <div class="text-no-wrap">
                                                    {{type === 'job' ? 'Children' : 'Providing care for'}}
                                                </div>
                                                <div>Hourly rate</div>
                                            </v-flex>
                                            <v-flex xs6 class="font--medium">
                                                <div class="text-truncate">
                                                    <span>{{typeWorkList ? typeWorkList.name : ''}}</span>
                                                </div>
                                                <div class="text-truncate">
                                                <!--
                                                    <span>{{item.child_count}} children:</span>
                                                -->
                                                    <span v-for="(age, index) in ageList" v-bind:key="index">
                                                        {{ageList.length !== (index + 1) ? age.name+',' : age.name  }}</span>
                                                </div>
                                                <div>${{item.price_min}} {{item.price_min !== item.price_max ? ' - ' +
                                                    item.price_max : ''}}
                                                </div>
                                            </v-flex>
                                        </slot>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex :class="{'xs12 px-3': true, 'md6': !grid}">
                            <div class="_qualifications d-flex">
                                <v-tooltip v-for="item in qualifications"
                                           :key="item.slug"
                                           :lazy="true"
                                           :class="{'hidden-xs-only': item.slug === 'meal_prep' || item.slug === 'household_cleaning'}"
                                           content-class="app-tooltip"
                                           nudge-bottom="0"
                                           color="white"
                                           bottom>
                                    <app-svg-icon slot="activator"
                                                  :class="{'primary--text': item.isActive}"
                                                  :name="`brand/NG_${item.slug.toString().toUpperCase()}`"></app-svg-icon>
                                    <span class="text--charcoal"
                                          style="font-size: 1rem">{{item.name | capitalize}}</span>
                                </v-tooltip>
                            </div>
                            <slot name="description">
                                <p v-line-clamp:20="$vuetify.breakpoint.smAndDown ? 3 : 7"
                                   :class="{'text-small ma-0 _desc': true, 'hidden-xs-only hidden-sm-and-up': grid}">
                                    {{item.description}}</p>
                            </slot>
                            <div class="hidden-md-and-up mt-3 mb-2"
                                 :class="{'hidden-xs-only hidden-sm-and-up': grid}">
                                <app-btn-view-profile :item="item" class="d-link text-small">
                                    {{type === 'job' ? 'View job' : 'View profile'}}
                                </app-btn-view-profile>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex v-if="!hideActions"
                    class="border--top border--grey_2 _actions d-flex align-center">
                <v-layout row wrap>
                    <v-flex :class="{'xs12 d-flex px-3': true, 'md6': !grid}">
                        <div class="_actions--items">
                            <!--<a class="pl-0"-->
                               <!--@click.stop.prevent="view(`/inbox/conversation/${item.id}`)">-->
                                <!--<app-svg-icon name="brand/NG_CONTACT"></app-svg-icon>-->
                                <!--{{type === 'job' ? 'Apply' : 'Contact'}}-->
                            <!--</a>-->
                            <app-btn-chat-room :user-ids="[item.user_id || item.id]"
                                               class="d-link d-inline ma-0 d-link--contact pl-0 text-xs-left"
                                               flat>
                                <div>
                                    <app-svg-icon name="brand/NG_CONTACT"></app-svg-icon>
                                    {{type === 'job' ? 'Apply' : 'Contact'}}
                                </div>
                            </app-btn-chat-room>
                            <a href="#"
                               @click.stop.prevent="shortlist">
                                <app-svg-icon
                                        :name="`brand/NG_FAVOURITES${item.is_favorite ? '_FILL' : ''}`"></app-svg-icon>
                                Shortlist
                            </a>
                            <a href="#"
                               @click.stop.prevent="recommend">
                                <app-svg-icon name="brand/NG_INBOX"></app-svg-icon>
                                Recommend
                            </a>
                        </div>
                    </v-flex>
                    <v-flex md6
                            :class="{'hidden-sm-and-down': !grid, 'hidden-xs-only hidden-sm-and-up': grid}">
                        <app-btn-view-profile :item="item" class="d-link">
                            {{type === 'job' ? 'View job' : 'View profile'}}
                        </app-btn-view-profile>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-card>
    </v-flex>
</template>

<script>
  import AppBtnViewProfile from '../../app-buttons/app-btn-view-profile'
  import AppBtnChatRoom from '../../app-buttons/app-btn-chat-room'

  export default {
    name: 'app-card-listing-base',
    components: {AppBtnChatRoom, AppBtnViewProfile},
    props: {
      hideActions: Boolean,
      grid: Boolean,
      type: String, // <- nanny/job
      item: Object
    },

    data () {
      return {
        icons: [
          'non_smoker',
          'drivers_licence',
          'has_car', 'pets',
          'first_aid',
          'light_housework',
          'meal_prep',
          'cooking_baking',
          'household_cleaning'
        ]
      }
    },

    computed: {
      qualifications () {
        let list = []
        let selectedList = this.$lodash.concat(this.item.personal_questions_list, this.item.work_preferences_list)
        let catalog = this.$lodash.concat(this.$store.getters['catalogs/qualifications'], this.$store.getters['catalogs/preferences'])
        catalog.forEach((item) => {
          if (this.icons.includes(item.slug)) {
            list.push(Object.assign({}, item, {isActive: selectedList.includes(item.id)}))
          }
        })
        return list
      },
      typeWorkList () {
        let _work = this.item.type_work_list || []
        if (Array.isArray(_work)) {
          return this.$store.getters['catalogs/workTypes'].filter((item) => _work.includes(item.id))[0]
        }
        return _work
      },
      ageList () {
        let _age = this.item.child_age_list || []
        return this.$store.getters['catalogs/childAge'].filter((item) => _age.includes(item.id))
      }
    },

    methods: {
      shortlist () {
        if (this.$auth.check()) {
          let _action = !this.item.is_favorite ? 'ADD' : 'DELETE'
          this.item.is_favorite = !this.item.is_favorite
          this.$store.dispatch(`favourites/FAVOURITES_${_action}`, {type: this.type, id: this.item.id})
              .catch(() => (this.item.is_favorite = !this.item.is_favorite))
        } else {
          this.$router.push('/login')
        }
      },
      recommend () {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-recommend',
          data: {
            id: this.item.id,
            namespaced: (this.type === 'job') ? 'jobs' : 'nannies'
          },
          options: {
            maxWidth: 950
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-item
        min-height 350px
        border-radius 0

        ._details
            > div:first-child
                max-width 120px

        ._qualifications
            overflow hidden
            width 100%
            color var(--grey_2)
            margin 20px 0 22px
            justify-content space-between

            > span
                display inline-block
                max-width 32px

            .svg-icon
                width 24px
                height 24px

        ._actions
            height 62px
        .d-link--contact, a
            padding 0 0 0 16px
            text-decoration none
            font-size 1em

            svg
                height 18px
                width 20px
                margin-right 2px
                margin-top: -4px

        ._desc
            word-wrap: break-word

    @media (min-width: 600px)
        ._card-item
            ._details
                > div:first-child
                    max-width 168px

    @media (min-width: 960px)
        ._card-item
            border-radius 2px

            ._card--header
                padding 20px 8px 8px !important

            ._card-body
                min-height 337px
                padding 30px 12px

            ._qualifications
                margin-bottom 32px
                justify-content flex-start

                > span
                    max-width 60px

                .svg-icon
                    width 28px
                    height 28px

            &--small
                ._qualifications
                    margin-bottom 0
                    justify-content space-between

            ._actions--items
                display flex
                align-items center
                padding-left 12px

            a
                font-size 1.286em

    @media (min-width: 1264px)
        ._card-item
            ._actions--items
                > a, .d-link--contact
                    padding-right 50px
</style>
