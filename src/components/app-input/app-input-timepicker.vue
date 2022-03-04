<template>
    <v-layout row wrap _datepicker-layout
              :class="{'v-input--has-state error--text': errorMessages && !outputTime}">
        <v-flex v-if="label"
                tag="label"
                class="text-truncate v-label v-label--datepicker"
                :class="{'error--text': errorMessages && !outputTime}"
                xs12>{{label}}
        </v-flex>
        <v-flex xs4>
            <v-select placeholder="Hour"
                      v-model="hour"
                      :items="hours"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      hide-details
                      :error="errorMessages && !hour"
                      solo>
            </v-select>
        </v-flex>
        <v-flex xs4>
            <v-select placeholder="Minute"
                      v-model="minute"
                      :items="minutes"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      :error="errorMessages && !minute"
                      hide-details
                      solo>
            </v-select>
        </v-flex>
        <v-flex xs4>
            <v-select v-model="meridiem"
                      :items="meridiems"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      :error="errorMessages && !meridiem"
                      hide-details
                      solo>
            </v-select>
        </v-flex>
        <div class="v-text-field__details v-text-field__details--datepicker">
            <div class="v-messages theme--light error--text">
                <div class="v-messages__wrapper">
                    <div v-if="errorMessages && !outputTime"
                         class="v-messages__message">{{errorMessages}}
                    </div>
                </div>
            </div>
        </div>
    </v-layout>
</template>

<script>
  import Moment from 'moment'

  export default {
    name: 'app-input-timepicker',
    $_veeValidate: {
      value () {
        return this.value
      },
      name () {
        return this.name
      }
    },
    props: {
      value: String,
      label: String,
      name: String,
      errorMessages: null
    },

    data () {
      return {
        hour: null,
        minute: null,
        meridiem: null
      }
    },

    computed: {
      meridiems () {
        return ['am', 'pm']
      },
      minutes () {
        return Array.from({length: 59}, (v, k) => (k === 0) ? 0 : k + 1).map((v) => v < 10 ? '0' + v : v.toString())
      },
      hours () {
        return Array.from({length: 12}, (v, k) => k + 1).map((v) => v < 10 ? '0' + v : v.toString())
      },
      outputTime () {
        if (this.hour && this.minute && this.meridiem) {
          return `${this.hour}:${this.minute}:${this.meridiem}`
        }
        return null
      }
    },

    watch: {
      outputTime () {
        this.$emit('input', this.outputTime)
      }
    },

    created () {
      if (!this.value) {
        let [hour, minute, meridiem] = Moment().format('hh:mm:a').split(':')
        this.hour = hour
        this.minute = minute
        this.meridiem = meridiem
        this.$emit('input', this.outputTime)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._datepicker-layout
        position relative

    .v-label
        &--datepicker
            position absolute
            top 0
            padding 8px 12px !important

    .v-text-field__details--datepicker
        margin-top -4px
        padding 0 12px
</style>
