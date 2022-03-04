<template>
    <v-snackbar :timeout="snackbarTimeout"
                :color="snackbarColor"
                right
                v-model="snackbarShow"
                :multi-line="false">
        <h4>{{snackbarText}}</h4>
        <p class="ma-0">{{ snackbarSubtext }}</p>
        <v-btn dark flat @click.native="close">
            <app-svg-icon name="ui/NG_CLOSE" width="14px" height="14px"></app-svg-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {snackbar as mutation} from '../store/types/mutation-types'

  export default {
    name: 'app-snackbar',

    computed: {
      snackbarShow: {
        get () {
          return this.$store.getters['snackbarShow']
        },
        set (val) {
          this.$store.commit(mutation.SET_SNACKBAR_SHOW, val)
        }
      },
      ...mapGetters([
        'snackbarColor',
        'snackbarText',
        'snackbarSubtext',
        'snackbarTimeout'
      ])
    },

    methods: {
      close () {
        this.$store.commit(mutation.SET_SNACKBAR_SHOW, false)
      }
    }
  }
</script>

<style scoped>

</style>
