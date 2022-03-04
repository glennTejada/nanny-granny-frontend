<template>
    <inbox-layout>
        <v-layout column>
            <v-flex id="markHeader">
                <app-name-page name="Inbox"
                               :hide-divider="$auth.check(['nanny'])"
                               icon>
                    <template slot="icon">
                        <app-svg-icon name="brand/NG_EMAIL_FILLED"
                                      :color="`var(--${$auth.check('parent') ? 'yellow':'blue_medium'})`"></app-svg-icon>
                    </template>
                    <div v-if="$auth.check(['nanny'])"
                         class="mt-5"
                         style="max-height: 50px">
                        <v-btn to="/chat/message-create"
                               outline
                               color="primary">Create a new message
                        </v-btn>
                    </div>
                </app-name-page>
            </v-flex>
            <v-flex>
                <!--fill-height-->
                <v-container
                             w--max--800
                             style="min-height: 500px; padding-top:0px">
                    <v-layout column>
                        <v-flex :style="{opacity: loading ? '.5':'1'}">
                            <v-scroll-x-transition mode="out-in">
                                <v-flex :key="`page_${pagination.current_page}`">
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs12>
                                            <app-list-inbox v-model="selected"
                                                            ref="listBox"
                                                            :items="inbox"
                                                            selectable></app-list-inbox>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-scroll-x-transition>
                        </v-flex>
                        <v-flex class="d-flex my-5">
                            <v-btn color="primary"
                                   outline
                                   :disabled="selected.length < 1"
                                   :loading="deleting"
                                   class="_btn-app-icon"
                                   @click="remove">
                                <app-svg-icon name="brand/NG_DELETE"></app-svg-icon>
                            </v-btn>
                            <div v-if="pagination.last_page > 1"
                                 class="text-xs-center">
                                <v-pagination v-model="currentPage"
                                              class="app-pagination"
                                              :length="pagination.last_page"
                                              :total-visible="5"></v-pagination>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </inbox-layout>
</template>

<script>
  import AppListInbox from '../../../components/app-lists/inbox/app-list-inbox'
  import AppNamePage from '../../../components/app-name-page'
  import InboxLayout from './inbox-layout'

  const DEF_PER_PAGE = 15
  export default {
    name: 'inbox',

    components: {InboxLayout, AppNamePage, AppListInbox},

    data () {
      return {
        loading: false,
        deleting: false,
        selected: [],
        currentPage: 1
      }
    },

    computed: {
      inbox () {
        return this.$store.getters['inbox/collection']
      },
      pagination () {
        return this.$store.getters['inbox/pagination']
      }
    },

    watch: {
      currentPage (val) {
        this.loading = true
        this.$store.dispatch('inbox/FETCH', {per_page: DEF_PER_PAGE, page: val})
          .then(res => {
            this.$vuetify.goTo('#markHeader', {offset: 200})
          })
          .finally(() => {
            this.selected = []
            this.loading = false
          })
      }
    },

    mounted () {
      this.$store.commit('inbox/RESET')
      this.$store.dispatch('inbox/FETCH', {per_page: DEF_PER_PAGE, page: this.currentPage})
    },

    beforeDestroy () {
      this.$store.commit('inbox/RESET')
    },

    methods: {
      remove () {
        this.deleting = true
        const _data = Object.assign({}, {ids: this.selected})
        this.$store.dispatch('inbox/DELETE', _data)
          .finally(() => {
            this.$refs.listBox.selected = []
            this.deleting = false
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._btn-delete
        border 1px solid
        border-radius 2px
        padding 9px
        color var(--blue)
        &:hover
            color var(--blue_hover)
            cursor pointer
    ._btn-app-icon
        @media (max-width 600px)
            display none
</style>
