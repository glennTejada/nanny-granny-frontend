<template>
    <privacy-policy-layout>
    <v-layout>
        <v-container w--max--800>
            <v-layout column>
                <v-flex>
                    <app-name-page name="Privacy Policy"></app-name-page>
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
    </privacy-policy-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import PrivacyPolicyLayout from './privacy-policy-layout'
  export default {
    name: 'privacy-policy',
    components: {PrivacyPolicyLayout, AppNamePage},
    computed: {
      item () {
        return this.$store.getters['page/content']('privacy-policy')[0]
      }
    }
  }
</script>

<style scoped>

</style>
