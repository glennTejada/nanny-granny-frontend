<template>
    <div class="v-input v-text-field v-text-field--single-line v-text-field--solo v-text-field--enclosed theme--light"
         :class="{'v-input--has-state error--text': errorMessages}">
        <div class="v-input__control">
            <div class="v-input__slot px-0">
                <div class="v-text-field__slot gmap-text-field__slot">
                    <label v-show="!inputAddress"
                           aria-hidden="true"
                           class="v-label theme--light"
                           style="left: 12px; right: auto; position: absolute;">Location</label>
                    <gmap-autocomplete v-model="inputListeners"
                                       aria-label="Location"
                                       placeholder=""
                                       @place_changed="setPlace"
                                       class="gmap-text-field"></gmap-autocomplete>
                </div>
            </div>
            <div class="v-text-field__details">
                <div class="v-messages theme--light"
                     :class="{'error--text': errorMessages}">
                    <div class="v-messages__wrapper">
                        <div v-if="errorMessages"
                             class="v-messages__message">
                            {{errorMessages}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'app-input-gmap-autocomplete',
    $_veeValidate: {
      value () {
        return this.value
      },
      name () {
        return this.name
      }
    },
    props: {
      value: Object,
      label: String,
      name: String,
      errorMessages: null
    },
    data () {
      return {
        inputListeners: null,
        place: this.value
      }
    },
    computed: {
      inputAddress () {
        if (!this.inputListeners) return ''
        return this.inputListeners.target.value
      }
    },
    watch: {
      inputAddress () {
        this.$emit('input', null)
      }
    },
    methods: {
      setPlace (place) {
        this.$emit('input', place)
      }
    }
  }
</script>

<style lang="stylus">
    .gmap-text-field__slot
        margin-right: -1px
        margin-left: -1px
    .gmap-text-field
        padding: 12px !important
        min-height: 44px
    .pac-container
        border: 1px solid var(--grey_1)
        border-top: none
</style>
