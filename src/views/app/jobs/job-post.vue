<template>
    <job-layout key="post_job">
        <v-layout row wrap>
            <v-flex xs12>
                <app-name-page name="Post a Job"
                               color="var(--green)"></app-name-page>
            </v-flex>
            <v-flex xs12>
                <v-container fill-height w--max--800 grid-list-xl>
                    <app-job-form></app-job-form>
                </v-container>
            </v-flex>
        </v-layout>
    </job-layout>
</template>

<script>
  import AppJobForm from './components/job-form'
  import AppNamePage from '../../../components/app-name-page'
  import JobLayout from './job-layout'
  export default {
    name: 'job-post',
    components: {JobLayout, AppNamePage, AppJobForm}
  }
</script>

<style lang="stylus" scoped>

</style>
