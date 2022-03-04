<template>
    <job-layout v-if="job"
                key="update_job"
                update>
        <v-layout row wrap p-relative _layout>
            <v-flex xs12>
                <app-name-page name="My Job"
                               color="var(--green)"></app-name-page>
            </v-flex>
            <v-flex xs12>
                <v-container fill-height w--max--800 grid-list-xl>
                    <app-job-form v-model="job" update></app-job-form>
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
    name: 'job-update',

    components: {JobLayout, AppNamePage, AppJobForm},

    computed: {
      loading () {
        return this.$store.getters['jobs/loading']
      },
      job () {
        return this.$store.getters['jobs/collection'][0]
      }
    },

    watch: {
      loading () {
        if (this.$lodash.isEmpty(this.job) && !this.loading) {
          this.$router.push('/job-post')
        }
      }
    },

    mounted () {
      this.$store.dispatch('jobs/JOBS_GET').finally()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
