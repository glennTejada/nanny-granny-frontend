<template>
    <reviews-layout>
        <v-layout _review-layout column fill-height>
            <v-flex>
                <app-name-page name="My Reviews"></app-name-page>
            </v-flex>
            <v-flex>
                <v-container w--max--800>
                    <v-layout column>
                        <v-flex>
                            <app-table-list v-model="selected"
                                            :headers="header"
                                            :items="items">
                                <template v-if="items.length > 0" slot="_items"
                                          slot-scope="{props}">
                                    <tr class="_tr">
                                        <td v-if="$auth.check('parent')"
                                            class="px-0 hidden-xs-only">
                                            <v-checkbox v-model="props.selected"
                                                        :ripple="false"
                                                         class="checkbox-ma-0"
                                                        primary
                                                        hide-details></v-checkbox>
                                        </td>
                                        <td v-if="$auth.check('parent')"
                                            class="px-0 hidden-xs-only">
                                            <app-avatar :src="props.item.review_user.getAvatarUrl()"
                                                        :id="`image${props.item.review_user.id}`"
                                                        height="auto"
                                                        class="_avatar"></app-avatar>
                                        </td>
                                        <td class="primary--text font--medium">
                                            {{ $auth.check('parent') ? props.item.review_user.first_name : props.item.user.first_name}}
                                        </td>
                                        <td class="text-small text--charcoal">
                                            {{props.item.review_text}}
                                        </td>
                                        <td class="">
                                            <v-rating :value="props.item.rating"
                                                      class="d-inline-block app-rating"
                                                      :size="$vuetify.breakpoint.xsOnly ? 18 : 24"
                                                      hover
                                                      dense
                                                      readonly
                                                      background-color="success"
                                                      color="success"></v-rating>
                                        </td>
                                        <td v-if="$auth.check('parent')"
                                            class="text-xs-right hidden-xs-only">
                                            <app-svg-icon name="brand/NG_EDIT"
                                                          width="20"
                                                          style="cursor: pointer"
                                                          color="var(--blue)"
                                                          @click="edit(props.item)"></app-svg-icon>
                                        </td>
                                    </tr>
                                </template>
                            </app-table-list>
                        </v-flex>
                        <v-flex v-if="$auth.check('parent')" hidden-xs-only mt-4>
                            <v-btn color="primary"
                                   outline
                                   :disabled="selected.length < 1"
                                   class="_btn-app-icon ma-0"
                                   :loading="loading"
                                   @click="remove">
                                <app-svg-icon name="brand/NG_DELETE"></app-svg-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </reviews-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import AppTableList from '../../../components/app-table/app-table-list'
  import AppAvatar from '../../../components/app-avatar'
  import ReviewsLayout from './reviews-layout'

  export default {
    name: 'reviews',
    components: {ReviewsLayout, AppAvatar, AppTableList, AppNamePage},
    data () {
      return {
        selected: [],
        loading: false,
        headers: [
          {
            text: '',
            sortable: false,
            style: {width: '40px'},
            role: ['parent']
          }, {
            text: '',
            sortable: false,
            style: {width: '60px'},
            role: ['parent']
          }, {
            text: 'Name',
            sortable: false,
            style: {width: '110px'},
            role: ['nanny', 'parent']
          }, {
            text: 'Review',
            sortable: false,
            role: ['nanny']
          }, {
            text: 'My Review',
            sortable: false,
            role: ['parent']
          }, {
            text: 'Rating',
            sortable: false,
            style: {width: '170px'},
            role: ['nanny']
          }, {
            text: 'My Rating',
            sortable: false,
            style: {width: '170px'},
            role: ['parent']
          }, {
            text: 'Edit',
            sortable: false,
            style: {textAlign: 'right', width: '50px'},
            role: ['parent']
          }
        ]
      }
    },

    computed: {
      header () {
        return this.headers.filter(item => item.role.indexOf(this.$auth.user().role) > -1)
      },
      items () {
        return this.$store.getters['reviews/collection']
      }
    },

    mounted () {
      this.$store.dispatch('reviews/FETCH', (this.$auth.check('parent') ? 'my' : 'forme'))
    },

    beforeDestroy () {
      this.$store.commit('reviews/SUCCESS', [])
    },

    methods: {
      edit (review) {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-review-store',
          data: {review: review, action: 'update'},
          options: {
            maxWidth: 685
          }
        })
      },
      remove () {
        if (this.selected.length > 0) {
          this.loading = true
          const _ids = this.$lodash.map(this.selected, 'id')
          this.$store.dispatch('reviews/DELETE', {ids: _ids})
              .finally(() => (this.loading = false))
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._review-layout
        padding-bottom 150px
        position relative
        overflow hidden
        min-height 500px
        ._tr
            height 130px
            > td
                padding 16px
</style>
