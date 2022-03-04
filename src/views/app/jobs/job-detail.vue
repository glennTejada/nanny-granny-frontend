<template>
    <app-layout-profile-page v-if="job" :item="job">
        <template slot="header">
            <v-layout row wrap align-center>
                <v-flex class="_header-content">
                    <div class="_box" :style="{backgroundColor: job.theme_body.bgColor}">
                        <h1 class="mb-2">{{job.name | capitalize}}</h1>
                        <h4 class="mb-2 text-capitalize"> {{job.postcode.location | capitalize}}</h4>
                        <div>
                            Start: {{job.date_start | formatDate('DD MMM')}}
                            <span class="mx-2"></span>
                            Applications Close: {{job.date_close | formatDate('DD MMM')}}
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </template>
        <template slot="about">
            <v-layout row wrap>
                <v-flex xs12 sclass="_description">
                    <div class="d-flex border--bottom border--grey_2 pb-4">
                        <div class="primary--text __wwc-icon">
                                <app-brandshape-border :color="'#4d4dff'"
                                                :width="$vuetify.breakpoint.xsOnly ? '60px':'60px'"
                                                :height="$vuetify.breakpoint.xsOnly ? '60px':'60px'">
                                    <div class="d-flex align-center justify-center fill-height">
                                        <app-svg-icon name="brand/NG_WORKING_W_CHILDREN"></app-svg-icon>
                                    </div>
                                </app-brandshape-border>
                        </div>
                        <div>
                            <p class="ma-0 font--medium">VIC Working With Children check</p>
                            <p class="ma-0 text-small text--charcoal">
                                {{job.is_wwcverify ? 'is required' : 'is not required'}}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 class="my-5">
                            Type of work:
                            <span v-for="(item, i) in job.typeWorkList()" :key="i">
                                {{job.type_work_list.length !== (i + 1) ? item.name+',' : item.name}}</span>
                        </h3>
                        <p>{{job.description}}</p>
                    </div>
                </v-flex>
            </v-layout>
        </template>
    </app-layout-profile-page>
</template>

<script>
  import AppBrandshapeBorder from '../../../components/app-brandshape-border'
  import AppLayoutProfilePage from '../../../components/app-layout-profile-page'

  export default {
    name: 'job-detail',

    components: {AppBrandshapeBorder, AppLayoutProfilePage},

    props: ['jobId'],

    data () {
      return {
        job: null
      }
    },

    created () {
      this.$store.dispatch('jobs/JOBS_GET', this.jobId).then(() => {
        this.job = this.$store.getters['jobs/collection'][0]
        if (!this.job) {
          this.$router.push('/jobs')
        }
      }).catch(() => {
        this.$router.push('/jobs')
      })
    }
  }
</script>

<style lang="stylus" scoped>
    ._header-content
        position relative
        z-index 15
        margin-top 22px
        padding-left 24px !important
    .__wwc-icon
        max-width 80px
    @media (min-width: 600px)
        ._header-content
            margin-top 40px
            padding-left 40px !important
            ._box
                max-width: 485px
                min-height: 144px
</style>
