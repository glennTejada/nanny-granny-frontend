<template>
    <v-layout column>
        <app-table-list v-model="selected"
                        :headers="headers"
                        :items="items"
                        id="listFavourites"
                        class="_table">
            <template slot="_items" slot-scope="{props}">
                <tr class="_tr"
                    @click="toggleTools(props)">
                    <td class="px-0 hidden-xs-only">
                        <v-checkbox v-model="props.selected"
                                    :ripple="false"
                                    class="checkbox-ma-0"
                                    primary
                                    hide-details></v-checkbox>
                    </td>
                    <td v-if="type === 'NANNY'"
                        class="px-0 hidden-xs-only">
                        <app-avatar :src="props.item.object.getAvatarUrl()"
                                    :id="`image${props.item.object.id}`"
                                    height="auto"
                                    class="_avatar"></app-avatar>
                    </td>
                    <td class="font--medium primary--text _td_name" @click="toggleTools(props)">
                        <app-btn-view-profile :item="props.item.object" >
                            <span class="primary--text">{{props.item.object.first_name || props.item.object.name}}</span>
                        </app-btn-view-profile>
                    </td>
                    <td class="font--medium text-capitalize _td_location">
                        {{(props.item.object.postcode.location || '') | lowerCase}}
                    </td>
                    <td class="_note text--charcoal py-3 _td_note">
                        <v-textarea v-model.trim="props.item.notes"
                                    auto-grow
                                    solo
                                    hide-details
                                    maxlength="50"
                                    rows="1"
                                    :ref="'amc_notes' + props.item.id"
                                    class="v-textarea--editing"
                                    style="font-size:14px"
                                    :disabled="!props.expanded"></v-textarea>
                    </td>
                    <td class="_td-date hidden-xs-only">
                        {{props.item.created_at | formatDate('Do MMM')}}
                    </td>
                    <td class="text-xs-right hidden-xs-only">
                        <app-svg-icon name="brand/NG_EDIT"
                                      width="20"
                                      style="cursor: pointer"
                                      @click="_handleExpanded(props)"
                                      color="var(--blue)"></app-svg-icon>
                    </td>
                    <td v-if="$vuetify.breakpoint.xsOnly && toolsId === props.item.id"
                        class="_tr--tools d-flex align-center">
                        <div class="text-xs-center">
                            <v-btn icon
                                   color="primary"
                                   class="v-btn--icon_square"
                                   outline><span class="icon-NG_DELETE"></span></v-btn>
                            <v-btn icon
                                   color="primary"
                                   class="v-btn--icon_square"
                                   outline><span class="icon-NG_CONTACT"></span></v-btn>
                            <v-btn icon
                                   color="primary"
                                   class="v-btn--icon_square"
                                   @click="_handleExpanded(props)"
                                   outline><span class="icon-NG_EDIT"></span></v-btn>
                        </div>
                    </td>
                </tr>
            </template>
            <template slot="expand"
                      slot-scope="{props}">
                <div class="text-xs-center py-3">
                    <v-btn class="elevation-0 primary"
                           :disabled="!props.item.notes"
                           :loading="loading"
                           @click="saveNote(props)">Save
                    </v-btn>
                    <v-btn color="primary"
                           @click="cancelNote(props)"
                           outline>Cancel
                    </v-btn>
                </div>
            </template>
        </app-table-list>
        <v-flex v-if="$vuetify.breakpoint.smAndUp && items.length > 0"
                text-xs-center>
            <v-layout>
                <v-flex class="mr-auto" style="max-width: 64px">
                    <v-btn color="primary"
                           :disabled="selected.length < 1"
                           outline
                           class="_btn-app-icon"
                           :loading="loadingRemove"
                           @click="remove">
                        <app-svg-icon name="brand/NG_DELETE"></app-svg-icon>
                    </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn class="primary elevation-0"
                           :disabled="selected.length < 1"
                           :loading="loadingChat"
                           @click="sendMessage"
                           color="primary">
                        <app-svg-icon name="brand/NG_CONTACT" width="20" class="mr-2"></app-svg-icon>
                        Send message
                    </v-btn>
                    <v-btn color="primary"
                           @click="print"
                           outline>
                        Print favourites
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import Printd from 'printd'
  import AppTableList from '../../../../components/app-table/app-table-list'
  import AppAvatar from '../../../../components/app-avatar'
  import AppBtnViewProfile from '../../../../components/app-buttons/app-btn-view-profile'

  export default {
    name: 'favourites-shortlist',

    components: {AppBtnViewProfile, AppAvatar, AppTableList},

    data () {
      return {
        selected: [],
        toolsId: 0,
        loadingRemove: false,
        loadingChat: false,
        beforeEditingCache: null,
        headers: [
          {
            text: '',
            sortable: false
          }, {
            text: '',
            sortable: false
          }, {
            text: 'Name',
            sortable: false,
            style: {width: '180px'}
          }, {
            text: 'Location',
            sortable: false
          }, {
            text: 'My Notes',
            sortable: false
          }, {
            text: 'Date',
            sortable: false
          }, {
            text: 'Edit',
            sortable: false,
            style: {width: '30px', paddingRight: '0'}
          }
        ]
      }
    },

    computed: {
      type () {
        return this.$auth.check(['parent']) ? 'NANNY' : 'JOB'
      },
      items () {
        return this.$store.getters['favourites/shortlist/collection']
      },
      loading () {
        return this.$store.getters['favourites/shortlist/loading']
      }
    },

    created () {
      if (this.type === 'JOB') {
        this.headers = this.headers.slice(1)
      }
      this.$store.dispatch('favourites/shortlist/FAVOURITES_GET', this.type)
    },

    methods: {
      sendMessage () {
        if (this.selected.length > 0) {
          this.loadingChat = true
          const _ids = this.$lodash.map(this.selected, 'user_id')
          this.$store.dispatch('chat/GET_ROOM', {user_ids: _ids})
            .then(res => {
              this.$router.push(`/chat/${res.data.id}`)
            })
            .finally(() => (this.loadingChat = false))
        }
      },
      print () {
        const cssText = `
          .v-table {
            border-collapse: collapse;
            min-width: 100%;
          }
          .v-table {
            text-align: left;
          }
        `
        const d = new Printd()
        d.print(document.getElementById('listFavourites'), cssText)
      },
      saveNote (props) {
        this.$store.dispatch('favourites/shortlist/FAVOURITES_ADD_NOTE', {
          type: this.type,
          id: props.item.object.id,
          notes: props.item.notes
        }).then(() => {
          this.beforeEditingCache = null
          props.expanded = false
        })
      },
      cancelNote (props) {
        if (this.beforeEditingCache && this.beforeEditingCache.id === props.item.id) {
          props.item.notes = this.beforeEditingCache.notes
        }
        this.beforeEditingCache = null
        props.expanded = !props.expanded
      },
      remove () {
        if (this.selected.length > 0) {
          this.loadingRemove = true
          this.$store.dispatch('favourites/FAVOURITES_DELETE', {type: this.type, id: this.selected[0].object.id})
            .then(() => {
              this.$store.commit('favourites/shortlist/FAVOURITES_DELETE', this.selected[0].id)
            }).finally(() => (this.loadingRemove = false))
        }
      },
      _handleExpanded (props) {
        if (!this.beforeEditingCache) {
          this.beforeEditingCache = Object.assign({}, props.item)
        }
        if (this.beforeEditingCache.id === props.item.id) {
          props.item.notes = this.beforeEditingCache.notes
        }
        setTimeout(() => {
          const vTextArea = this.$refs['amc_notes' + props.item.id]
          if (props.expanded && vTextArea) {
            vTextArea.focus()
          }
        }, 100)
        // this.$refs.amc_notes.$el.children[0].focus()
        // console.log(this.$refs.amc_notes)
        props.expanded = !props.expanded
      },
      toggleTools (props) {
        this.toolsId = this.toolsId === props.item.id || props.expanded ? 0 : props.item.id
      }
    }
  }
</script>

<style lang="stylus" scoped>
    @media (max-width: 599px)
        textarea
            text-align center
        table.v-table
            display block
            float: left;
            tbody
                display block
                td,tr,th
                    display block
                ._tr
                    position relative
                    td
                        float left
                        height auto
                    ._td_name
                        text-align right
                        width 48%
                        border-right 1px solid #4d4dff
                    ._td_location
                        text-align left
                        width 48%
                        color #4d4dff !important
                        caret-color #4d4dff !important
                    ._td_note
                        text-align center
                        width 100%
                    &--tools
                        padding: 20px;
                        width 100%
                        height 100% !important
                        background-color var(--sand)
                        [class*='icon-']
                            font-size 24px
                            line-height 1
    @media (min-width: 600px)
        ._table
            margin-bottom 50px
        table.v-table
            tbody
                td,
                th
                    padding-left 16px
                    padding-right 16px
                    &:last-child
                        padding-left 0
                        padding-right 0
                ._tr
                    td
                        height 130px
                    ._note
                        textarea
                            width 100%
                            resize none
                            overflow hidden
                            &.v-input--is-disabled
                                border none !important
                    ._avatar
                        width 51px
                        height 51px
</style>
