<template>
    <faqs-layout>
    <v-layout _faqs-layout>
        <v-container align-center justify-center fill-height>
            <v-layout row wrap>
                <v-flex xs12>
                    <app-name-page name="FAQs" color="var(--white)"></app-name-page>
                </v-flex>
                <v-flex xs12 mb-5>
                    <app-btn-toggle-role v-model="selectedRole"></app-btn-toggle-role>
                </v-flex>
                <v-flex xs12 d-flex justify-center>
                    <v-expansion-panel flat class="app-expansion-panel w--max--800">

                        <v-expansion-panel-content
                                v-for="(item, i) in items"
                                :key="'panel' + item.id">
                            <p slot="header" class="font--medium ma-0 text--black">{{ item.name }}</p>
                            <p class="content-base" v-html="item.description"></p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
    </faqs-layout>
</template>

<script>
  import AppBtnToggleRole from '../../../components/app-buttons/app-btn-toggle-role'
  import AppNamePage from '../../../components/app-name-page'
  import FaqsLayout from './faqs-layout'

  export default {
    name: 'faqs',

    components: {FaqsLayout, AppNamePage, AppBtnToggleRole},

    data () {
      return {
        selectedRole: this.$auth.user().role || 'parent'
      }
    },

    computed: {
      items () {
        return this.$store.getters['page/content']('faqs')
          .filter(item => item.slug === `${this.selectedRole}_item`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._faqs-layout
        padding-bottom 150px
</style>
