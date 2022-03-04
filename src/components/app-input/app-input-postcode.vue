<template>
    <v-autocomplete :label="label"
                    v-model="select"
                    :items="items"
                    :loading="loading"
                    :search-input.sync="search"
                    append-icon="null"
                    :hide-details="hideDetails"
                    :height="height"
                    :item-text="itemText"
                    :outline="outline"
                    :solo="!this.outline"
                    dense
                    :menu-props="{maxHeight: 166}"
                    :cache-items="cacheItems"
                    return-object
                    :error-messages="errorMessages"
                    :attach="`.${elemId}`"
                    :class="[`app-autocomplete ${elemId}`, outline ? 'with-label':'']">
        <template slot="selection"
                  slot-scope="{item, select}">
            <div class="text-truncate" style="max-width: 100%">{{item.location}}, {{item.state}} {{item.postcode}}</div>
        </template>
        <template slot="item"
                  slot-scope="{item}">
            <v-list-tile-content>
                <v-list-tile-title>
                    {{item.location}}, {{item.state}} {{item.postcode}}
                </v-list-tile-title>
            </v-list-tile-content>
        </template>
        <template slot="no-data">
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title v-text="'No result found'"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-autocomplete>
</template>

<script>
  import ApiPostCode from '../../api/postcode'

  export default {
    name: 'app-input-postcode',

    props: {
      outline: Boolean,
      label: {
        type: String,
        default: 'Input postcode'
      },
      value: [Object, Number],
      height: {
        type: [String, Number],
        default: 48
      },
      hideDetails: {
        type: Boolean,
        default: true
      },
      cacheItems: {
        type: Boolean,
        default: false
      },
      errorMessages: String,
      returnId: Boolean
    },

    data () {
      return {
        loading: false,
        items: [],
        search: null,
        elemId: 'inputPostcode_' + this.makeSalt()
      }
    },

    computed: {
      select: {
        get () {
          if (!this.$lodash.isEmpty(this.value)) {
            this.items.push(this.value)
            return this.value
          }
          return null
        },
        set (val) {
          this.$emit('input', this.returnId ? val.id : val)
        }
      }
    },

    watch: {
      search (val) {
        this.loading = false
        val && val.length > 2 && val !== this.select && this.debouncedFindPostCode(val)
      }
    },

    created () {
      if (!this.$lodash.isEmpty(this.value)) {
        this.items.push(this.value)
        this.select = this.value
      }
      this.debouncedFindPostCode = this.$lodash.debounce(this.findPostCode, 500)
    },

    methods: {
      findPostCode (val) {
        this.loading = true
        ApiPostCode.find(val)
                   .then(res => {
                     this.items = res.data.locality || []
                   })
                   .finally(() => (this.loading = false))
      },
      itemText (item) {
        return item.location + item.postcode
      },
      forceSetValue (value) {
        this.select = value
      },
      makeSalt () {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
