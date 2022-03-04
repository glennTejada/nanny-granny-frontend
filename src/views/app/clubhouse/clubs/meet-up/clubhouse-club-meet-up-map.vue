<template>
    <v-layout>
        <v-flex>
            <gmap-map ref="gmap"
                      :center="center"
                      :options="options"
                      :zoom="10"
                      style="width:100%;  height: 400px;">
                <gmap-marker v-for="m in markers"
                             :key="`marker_${m.meetUpId}`"
                             :position="{lat: m.place.latitude, lng: m.place.longitude}"
                             :clickable="true"
                             :icon="{url: require('@/assets/img/icons/ui/NG_MAP_MARKER.svg'), scaledSize: {width: m.width, height: m.height, f: 'px', b: 'px'}}"
                             style="color: var(--orange);"
                             @click="showMeetUp(m.meetUpId)"/>
            </gmap-map>
        </v-flex>
    </v-layout>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'

  export default {
    name: 'clubhouse-club-meet-up-map',

    props: {
      items: Array
    },

    data () {
      return {
        data: null,
        center: {lat: 45.508, lng: -73.587},
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
          styles: [
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': [{'color': '#e9e9e9'}, {'ightness': 17}]
            }, {
              'featureType': 'landscape',
              'elementType': 'geometry',
              'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]
            }, {
              'featureType': 'road.highway',
              'elementType': 'geometry.fill',
              'stylers': [{'color': '#ffffff'}, {'lightness': 17}]
            }, {
              'featureType': 'road.highway',
              'elementType': 'geometry.stroke',
              'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]
            }, {
              'featureType': 'road.arterial',
              'elementType': 'geometry',
              'stylers': [{'color': '#ffffff'}, {'lightness': 18}]
            }, {
              'featureType': 'road.local',
              'elementType': 'geometry',
              'stylers': [{'color': '#ffffff'}, {'lightness': 16}]
            }, {
              'featureType': 'poi',
              'elementType': 'geometry',
              'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]
            }, {
              'featureType': 'poi.park',
              'elementType': 'geometry',
              'stylers': [{'color': '#dedede'}, {'lightness': 21}]
            }, {
              'elementType': 'labels.text.stroke',
              'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]
            }, {
              'elementType': 'labels.text.fill',
              'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]
            }, {
              'elementType': 'labels.icon',
              'stylers': [{'visibility': 'off'}]
            }, {
              'featureType': 'transit',
              'elementType': 'geometry',
              'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]
            }, {
              'featureType': 'administrative',
              'elementType': 'geometry.fill',
              'stylers': [{'color': '#fefefe'}, {'lightness': 20}]
            }, {
              'featureType': 'administrative',
              'elementType': 'geometry.stroke',
              'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]
            }
          ]
        },
        places: [],
        currentPlace: null
      }
    },

    computed: {
      google: gmapApi,
      selectedMeetUp () {
        return this.$store.getters['clubhouse/meetUp/selected']
      },
      markers () {
        const _data = []
        this.$lodash.forEach(this.items, (item) => {
          let _marker = Object.assign({}, {place: item.place})
          _marker.meetUpId = item.id
          _marker.place.latitude = Number(_marker.place.latitude)
          _marker.place.longitude = Number(_marker.place.longitude)
          _marker.width = (this.selectedMeetUp || {}).id === item.id ? 34 : 20
          _marker.height = (this.selectedMeetUp || {}).id === item.id ? 40 : 26
          _data.push(_marker)
        })
        return _data
      }
    },

    watch: {
      markers () {
        this.setMapBounds()
      }
    },

    mounted () {
      if (this.markers.length > 0) {
        this.setMapBounds()
      } else {
        this.geolocate()
      }
    },

    methods: {
      showMeetUp (meetUpId) {
        this.$store.commit('clubhouse/meetUp/SELECTED', meetUpId)
        this.$emit('change-meet-up')
      },
      geolocate () {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      },
      setMapBounds () {
        this.$refs['gmap'].$mapPromise.then((map) => {
          let bounds = new this.google.maps.LatLngBounds()
          this.markers.forEach((marker) => {
            bounds.extend(new this.google.maps.LatLng(marker.place.latitude, marker.place.longitude))
          })
          map.fitBounds(bounds)
        })
      }
    }
  }
</script>

<style scoped>

</style>

