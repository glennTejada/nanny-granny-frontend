<template>
    <child-care-rebate-layout>
    <v-layout>
        <v-container w--max--800>
            <v-layout column>
                <v-flex>
                    <app-name-page name="Child Care Subsidy"></app-name-page>
                </v-flex>
                <v-flex v-if="item">
                    <v-card flat>
                        <v-card-text v-html="item.description"
                                     class="app-html-text"></v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
    </child-care-rebate-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import ChildCareRebateLayout from './child-care-rebate-layout'
  export default {
    name: 'child-care-rebate',
    components: {ChildCareRebateLayout, AppNamePage},
    computed: {
      item () {
        return this.$store.getters['page/content']('child-care-rebate')[0]
      }
    }
  }
</script>

<style scoped>

</style>
