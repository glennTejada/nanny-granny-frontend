<template>
    <v-layout _find-layout
              :class="classLayout">
        <v-container _find-layout--container>
            <app-card-find :icon="$auth.check()"
                           :hide-toggle-role="$auth.check()"
                           :role="selectedRole"
                           @change-role="setRole"
                           @empty-result="showDialog"></app-card-find>
            <router-link v-if="!$auth.check() && $vuetify.breakpoint.xsOnly"
                         to="/how-it-works"
                         tag="a"
                         class="d-block my-4 text-xs-center font-weight-light white--text">
                Find out more about how it works
            </router-link>
        </v-container>
    </v-layout>
</template>

<script>
  import AppCardFind from '../../../../components/app-card/app-card-find'

  export default {
    name: 'app-home-find',
    components: {AppCardFind},
    data () {
      return {
        dialog: false,
        selectedRole: null
      }
    },
    computed: {
      classLayout () {
        return {
          '': this.$auth.check(['parent']) ? 'var(--pink)' : 'var(--blue_light)'
        }
      }
    },

    created () {
      this.selectedRole = this.$auth.check('nanny') ? 'nanny' : 'parent'
    },

    methods: {
      setRole (val) {
        this.selectedRole = val
      },
      showDialog (postcode) {
        this.$store.commit('dialog/DIALOG_SHOW', {
          show: true,
          component: 'app-dialog-not-available',
          data: {postcode: postcode, type: this.selectedRole},
          options: {
            maxWidth: 685
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .hidden-sm-and-up
        color #fff
        font-size 1.1666666666666667rem
</style>
