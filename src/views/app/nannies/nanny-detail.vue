<template>
        <app-layout-profile-page v-if="nanny"
                            :item="nanny"
                            id="_overlay">
            <template slot="header">
                <v-layout row align-center layout--header>
                    <v-flex class="_flex-avatar">
                        <app-avatar :src="nanny.getAvatarUrl()" :color="nanny.theme_body.bgColor"></app-avatar>
                        <div class="d-flex _btn-gallery"
                             @click="gallery = true">
                            <app-svg-icon name="brand/NG_IMAGE_GALLERY" width="23" height="18"></app-svg-icon>
                            <span class="px-2">{{nanny.images.length}}</span>
                        </div>
                    </v-flex>
                    <v-flex>
                        <h1 class="_mb-xs-only">{{nanny.first_name | capitalize}}</h1>
                        <h4 class="">
                            <span class="text-capitalize d-inline-block _mb-xs-only">{{nanny.postcode.location | capitalize}}</span>
                            | Age {{nanny.date_birthday | age}}
                            <span class="hidden-xs-only">|</span>
                            <v-rating v-model="nanny.rating"
                                      class="app-rating _mb-xs-only"
                                      :size="$vuetify.breakpoint.xsOnly ? 18 : 24"
                                      dense
                                      :background-color="(nanny.theme_body.bgColor === '#039e8b' || nanny.theme_body.bgColor === '#4d4dff') ? 'pink1' : 'success'"
                                      color="success"
                                      readonly></v-rating>
                        </h4>
                        <p class="text-small text--grey_1 mt-3">Member since {{nanny.created_at | formatDate('MMM YYYY')}}</p>
                    </v-flex>
                </v-layout>
            </template>
            <template slot="about">
                <v-layout row wrap>
                    <v-flex xs12 sm9 class="_description">
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
                                <p class="ma-0 text-small text--charcoal">Verified 22/08/2017 Expires 21/08/2022</p>
                            </div>
                        </div>
                        <div>
                            <h3 class="my-5">
                                Looking for
                                <span v-for="(item, i) in nanny.typeWorkList()" :key="i">
                                {{nanny.type_work_list.length !== (i + 1) ? item.name+',' : item.name}}</span>
                            </h3>
                            <p>{{nanny.description}}</p>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <p class="font--medium text-small mb-4">{{nanny.date_birthday | age}} year old {{nanny.genderName()}}
                            carer</p>

                        <p class="font--medium text-small ma-0">Experience</p>
                        <p class="text-small mb-4">{{nanny.years_exp}} years</p>

                        <p v-if="skills != ''" class="font--medium text-small ma-0">Other skills</p>
                        <p v-if="skills != ''" class="text-small mb-4">{{skills}}</p>

                        <p class="font--medium text-small ma-0">Willing to travel</p>
                        <p class="text-small mb-4">{{nanny.work_distance}}km</p>

                        <p v-if="nanny.languages != undefined" class="font--medium text-small ma-0">Languages</p>
                        <p v-if="nanny.languages != undefined" class="text-small mb-4">{{nanny.languages}}</p>

                        <p class="font--medium text-small ma-0">Residency status</p>
                        <p class="text-small mb-4">{{nanny.residenceList()[0].name}}</p>

                        <p class="font--medium text-small ma-0">Police check</p>
                        <p class="text-small mb-4">Available on request</p>

                        <p class="font--medium text-small ma-0">Parent references</p>
                        <p class="text-small mb-0">Available on request</p>
                    </v-flex>
                </v-layout>
            </template>
            <!--GALLERY-->
            <template>
                <app-window-image-gallery v-model="gallery"
                                          :items="nanny.images"></app-window-image-gallery>
            </template>
        </app-layout-profile-page>
</template>

<script>
  import AppBrandshapeBorder from '../../../components/app-brandshape-border'
  import AppLayoutProfilePage from '../../../components/app-layout-profile-page'
  import AppAvatar from '../../../components/app-avatar'
  import AppWindowImageGallery from '../../../components/app-windows/app-window-image-gallery'

  export default {
    name: 'nanny-details',

    components: {AppBrandshapeBorder, AppLayoutProfilePage, AppWindowImageGallery, AppAvatar},

    props: ['nannyId'],

    data () {
      return {
        nanny: null,
        gallery: false
      }
    },
    created () {
      this.$store.dispatch('nannies/NANNIES_GET', this.nannyId).then(() => {
        this.nanny = this.$store.getters['nannies/collection'][0]
        if (!this.nanny) {
          this.$router.push('/nannies')
        }
      }).catch(() => {
        this.$router.push('/nannies')
      })
    },
    computed: {
      skills () {
        let _data = this.$lodash.compact([this.nanny.music_instruments, this.nanny.sports, this.nanny.school_subject])
        return _data.join(', ')
      }

    }
  }
</script>

<style lang="stylus" scoped>
    .layout--header
        margin-top 30px
    ._flex-avatar
        min-width 122px
        max-width 122px
        position relative
        ._btn-gallery
            position absolute
            bottom -18px
            left 40%
            cursor pointer
            opacity .8
            &:hover
                opacity 1
    .app-rating
        display block
    .__wwc-icon
        max-width 80px
    ._mb-xs-only
        margin-bottom 8px
    @media(min-width: 600px)
        ._flex-avatar
            min-width 200px
            max-width 200px
        .app-rating
            display inline-block
        ._mb-xs-only
            margin-bottom 0
        ._description
            padding-right 35px
    @media (min-width: 960px)
        ._flex-avatar
            margin-right 16px
</style>
