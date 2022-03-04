<template>
    <v-layout row wrap _datepicker-layout
              :class="{'v-input--has-state error--text': errorMessages && !outputDate}">
        <v-flex v-if="label"
                tag="label"
                class="text-truncate v-label v-label--datepicker"
                :class="{'error--text': errorMessages && !outputDate}"
                xs12>{{label}}</v-flex>
        <v-flex v-if="!hideDay"
                xs4>
            <v-select placeholder="Day"
                      v-model="day"
                      :items="days"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      hide-details
                      :error="errorMessages && !day"
                      :class="`daySelect_${innerKey}`"
                      :attach="`.daySelect_${innerKey}`"
                      outline>
            </v-select>
        </v-flex>
        <v-flex :class="[hideDay ? 'xs6' : 'xs4']">
            <v-select placeholder="Month"
                      v-model="month"
                      :items="months"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      :error="errorMessages && !month"
                      hide-details
                      :class="`monthSelect_${innerKey}`"
                      :attach="`.monthSelect_${innerKey}`"
                      outline>
            </v-select>
        </v-flex>
        <v-flex :class="[hideDay ? 'xs6' : 'xs4']">
            <v-select placeholder="Year"
                      v-model="year"
                      :items="years"
                      :menu-props="{offsetY: true, maxHeight: 150}"
                      :error="errorMessages && !year"
                      :class="`yearSelect_${innerKey}`"
                      :attach="`.yearSelect_${innerKey}`"
                      hide-details
                      outline>
            </v-select>
        </v-flex>
        <div class="v-text-field__details v-text-field__details--datepicker">
            <div class="v-messages theme--light error--text">
                <div class="v-messages__wrapper">
                    <div v-if="errorMessages && !outputDate"
                         class="v-messages__message text-xs-left">{{errorMessages}}</div>
                </div>
            </div>
        </div>
    </v-layout>
</template>

<script>
  import Moment from 'moment'
  import _ from 'lodash'

  export default {
    name: 'app-input-datepicker',
    $_veeValidate: {
      value () {
        return this.value
      },
      name () {
        return this.name
      }
    },
    props: {
      name: String,
      value: String,
      label: String,
      expiry: Boolean,
      hideDay: Boolean,
      errorMessages: null
    },

    data () {
      return {
        day: null,
        month: null,
        year: null,
        innerKey: _.random(999)
      }
    },

    computed: {
      years () {
        let year = new Date().getFullYear()
        if (this.expiry) {
          return Array.from({length: 50}, (v, k) => year + k)
        }
        return Array.from({length: year - 1900}, (v, k) => year - k)
      },
      months () {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      days () {
        let length = 31
        if (this.year && this.month) {
          length = Moment(`${this.year}-${this.month}`, 'YYYY-MMM').daysInMonth()
        }
        return Array.from({length: length}, (v, k) => k + 1).map((v) => v < 10 ? '0' + v : v)
      },
      outputDate () {
        if (this.hideDay) {
          this.day = '01'
        }
        if (this.day && this.month && this.year) {
          let _date = new Date(`${this.day || '01'} ${this.month || 'Jan'}  ${this.year || 1900}`)
          _date.setHours(_date.getHours() + (_date.getTimezoneOffset() / -60))
          return _date.toISOString().slice(0, 10)
        }
        return null
      }
    },

    watch: {
      outputDate () {
        this.$emit('input', this.outputDate)
      }
    },

    mounted () {
      if (Moment(this.value, 'YYYY-MM-DD', true).isValid()) {
        let date = this.value.split('-')
        this.year = Number(date[0])
        this.month = this.months[Number(date[1]) - 1]
        this.day = date[2]
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
