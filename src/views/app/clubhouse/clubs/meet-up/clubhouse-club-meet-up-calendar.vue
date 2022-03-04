<template>
    <v-layout column justify-center align-center>
        <v-flex class="calendar--container">
            <v-date-picker :value="events"
                           multiple
                           full-width
                           class="calendar elevation-0"
                           no-title></v-date-picker>
        </v-flex>
    </v-layout>
</template>

<script>
  import Moment from 'moment'

  export default {
    name: 'clubhouse-club-meet-up-calendar',
    data () {
      return {
        date: null
      }
    },
    computed: {
      events () {
        return this.$lodash.map(this.$store.getters['clubhouse/meetUp/collection'], (item) => {
          return Moment(item.date_event).format('YYYY-MM-DD')
        })
      }
    }
  }
</script>

<style lang="stylus">
    .calendar
        &--container
            min-width 100%
        &.v-picker--date
            background-color transparent !important
            .v-picker__body
                background-color transparent !important
                .v-date-picker-header
                    max-width 350px
                    margin auto
                    @media (min-width 600px) and (max-width 959px)
                        padding 18px 16px
                    @media (min-width 1200px)
                        padding 18px 16px
                    .v-btn--icon
                        &:before
                            content none
                        @media (min-width 600px) and (max-width 959px)
                            position absolute
                            left -75px
                            top 130px
                            z-index 10
                            &:last-child
                                left auto
                                right -75px
                        @media (min-width 1200px)
                            position absolute
                            left -75px
                            top 130px
                            z-index 10
                            &:last-child
                                left auto
                                right -75px
                .v-date-picker-table.v-date-picker-table--date
                    justify-items center
                    overflow hidden
                    max-width 350px
                    margin auto
</style>
