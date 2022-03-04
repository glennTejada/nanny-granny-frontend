<template>
    <v-layout align-center fill-height>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md6>
                    <v-select label="Select club"
                              v-model="selectedClub"
                              :items="clubs"
                              item-text="name"
                              v-validate="'required'"
                              :error-messages="errors.first('club')"
                              data-vv-name="club"
                              :menu-props="{offsetY: true}"
                              return-object
                              solo>
                        <template slot="selection"
                                  slot-scope="{item, index}">
                            <span class="text--black">{{ item.name | capitalize }}</span>
                        </template>
                    </v-select>
                </v-flex>
                <v-flex xs12 md6>
                    <app-input-gmap-autocomplete v-model="location"
                                                 :key="'gmap_'+keyGmap"
                                                 v-validate="'required'"
                                                 :error-messages="errors.first('location')"
                                                 data-vv-name="location"></app-input-gmap-autocomplete>
                    <!--<button @click="addMarker">Add</button>-->
                </v-flex>
                <v-flex xs12 md6>
                    <v-menu ref="menu"
                            :close-on-content-click="false"
                            v-model="datePicker"
                            :nudge-top="30"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            attach="#datePicker"
                            id="datePicker"
                            min-width="100%">
                        <v-text-field label="Select date"
                                      slot="activator"
                                      v-model="formatDate"
                                      v-validate="'required'"
                                      :error-messages="errors.first('date')"
                                      data-vv-name="date"
                                      persistent-hint
                                      solo></v-text-field>
                        <v-date-picker v-model="date"
                                       width="100%"
                                       no-title @input="datePicker = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                    <app-input-timepicker v-model="time"></app-input-timepicker>
                </v-flex>
                <v-flex xs12 md6>
                    <v-checkbox label="Notify everyone in this club"
                                v-model="form.is_notify"
                                :ripple="false"></v-checkbox>
                </v-flex>
                <v-flex xs12 md6>
                    <v-btn class="primary elevation-0 mx-0"
                           :loading="loading"
                           @click="submit"
                           block>Create event
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
  import AppInputTimepicker from '@/components/app-input/app-input-timepicker'
  import AppInputGmapAutocomplete from '../../../../../components/app-input/app-input-gmap-autocomplete'
  import Moment from 'moment'

  export default {
    name: 'clubhouse-club-meet-up-create',
    components: {AppInputGmapAutocomplete, AppInputTimepicker},
    data () {
      return {
        keyGmap: 1,
        loading: false,
        datePicker: false,
        autocomplete: null,
        time: null,
        date: null,
        location: null,
        selectedClub: null,
        form: {
          category_id: null,
          parent_id: null, // <- club id
          address_name: null,
          lat: null,
          lng: null,
          date_event: null, // date + time
          is_notify: null
        }
      }
    },
    computed: {
      clubs () {
        return this.$store.getters['clubhouse/clubs/collection']
          .filter((item) => item.is_favorite)
      },
      /*
      clubs () {
        return this.$lodash.map(this.$store.getters['clubhouse/clubs/club'], 'club')
        //  .filter((item) => item.is_favorite)
      },
      */
      formatDate () {
        if (!this.date) return null
        const [year, month, day] = this.date.split('-')
        return `${day}/${month}/${year}`
      },
      dateEvent () {
        if (this.date && this.time) {
          let _date = Moment(`${this.date} ${this.time}`).format('YYYY-MM-DD HH:mm:ss')
          return _date
        }
        return undefined
      }
    },

    watch: {
      dateEvent (val) {
        this.form.date_event = val
      },
      selectedClub (val) {
        if (!val) {
          this.form.category_id = null
          return
        }
        this.form.category_id = (val.category || {}).id
        this.form.parent_id = val.id
      },
      location (val) {
        if (!val) {
          this.form.address_name = null
          this.form.lat = null
          this.form.lng = null
          return
        }
        this.form.address_name = val.formatted_address
        this.form.lat = val.geometry.location.lat()
        this.form.lng = val.geometry.location.lng()
      }
    },

    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            this.$store.dispatch('clubhouse/meetUp/STORE', this.form)
              .then(() => {
                this.selectedClub = null
                this.date = null
                this.keyGmap++
                this.showSnackBar('Meet-up has been created successfully.', 'success')
              })
              .finally(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
