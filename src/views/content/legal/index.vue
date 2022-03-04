<template>
    <legal-layout>
    <v-layout>
        <v-container w--max--800>
            <v-layout column>
                <v-flex>
                    <app-name-page name="Terms of use"></app-name-page>
                </v-flex>
                <v-flex>
                    <v-card flat>
                        <v-card-text v-html="item.description"
                                     class="app-html-text"></v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
    </legal-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import LegalLayout from './legal-layout'
  export default {
    name: 'legal',
    components: {AppNamePage, LegalLayout},
    computed: {
      item () {
        return this.$store.getters['page/content']('legal')[0]
      }
    }
  }
</script>

<style scoped>

</style>
