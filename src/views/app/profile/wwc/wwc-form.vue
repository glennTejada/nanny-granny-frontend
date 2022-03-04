<template>
    <v-layout column>
        <!--Form data-->
        <v-flex>
            <v-card flat class="border border--grey_2">
                <v-card-title class="layout row wrap">
                    <v-flex xs12>
                        To show this on your profile make a selection and verify your clearance.
                    </v-flex>
                    <v-flex xs12
                            d-flex
                            align-center
                            justify-start
                            py-4
                            class="border--bottom border--grey_2">
                        <div style="max-width: 80px">
                            <app-brandshape color="var(--white)"
                                            height="60px"
                                            width="60px">
                                <div class="app-bg-blue fill-height d-flex align-center">
                                    <app-svg-icon name="brand/NG_WORKING_W_CHILDREN"
                                                  height="21"
                                                  width="41"></app-svg-icon>
                                </div>
                            </app-brandshape>
                        </div>
                        <div class="font--medium justify-self-start">{{wwcForm.form_name}}</div>
                    </v-flex>
                </v-card-title>
                <v-card-text class="py-5">
                    <v-radio-group v-model="wwc_formtype_id">
                        <v-radio v-for="(item, i) in wwcForm.formtypes[0]"
                                 :key="'type_' + item.id"
                                 :ripple="false"
                                 :value="item.id">
                            <template slot="label">{{item.name | numberName(wwcForm.number_name)}}</template>
                        </v-radio>
                        <p class="font--medium text-small mt-5 mb-3">Change location</p>
                        <v-radio v-for="(item, i) in wwcForm.formtypes[1]"
                                 :key="'type_' + item.id"
                                 :ripple="false"
                                 :value="item.id">
                            <template slot="label">{{item.name | numberName(wwcForm.number_name)}}</template>
                        </v-radio>
                    </v-radio-group>
                </v-card-text>
                <!--Actions-->
                <v-card-actions v-if="currentForm"
                                class="_wwc_description border--top border--grey_2 py-4 px-3 justify-space-between">
                        <span >{{currentForm.description | numberName(wwcForm.number_name)}}</span>
                        <v-btn class="v-btn--default elevation-0"
                               color="primary"
                               outline
                               @click="verify">
                            {{currentForm.actionButtonText}}
                        </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

        <!--dialog-->
        <v-dialog v-if="currentForm && currentForm.component"
                  v-model="showForm"
                  max-width="860">
            <v-flex>
                <v-card>
                    <v-card-text>
                        <component :is="currentForm.component"
                                   :item="currentForm"
                                   :wwcForm="wwcForm"
                                   @close="showForm = false"></component>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-dialog>
    </v-layout>
</template>

<script>
  import WwcFormA from './forms/wwc-form-A'
  import WwcFormB from './forms/wwc-form-B'
  import AppDialog from '../../../../components/app-dialog/app-dialog'
  import WwcForm from '../../../../models/WwcFormClass'
  import AppBrandshape from '../../../../components/app-brandshape'

  export default {
    name: 'app-profile-wwc-form',
    components: {AppBrandshape, AppDialog, WwcFormB, WwcFormA},
    filters: {
      numberName (val, name) {
        if (!val) return ''
        return val.toString().replace(/\[number_name\]/, name)
      }
    },
    data () {
      return {
        showForm: false,
        wwc_formtype_id: 1,
        wwcForm: {
          formtypes: [{}, {}]
        }
      }
    },
    computed: {
      currentForm () {
        let _data = this.$lodash.flattenDeep(this.wwcForm.formtypes)
        return _data.filter((item) => item.id === this.wwc_formtype_id)[0]
      }
    },
    created () {
      this.$store.dispatch('wwc/FETCH', this.$auth.user().postcode.state)
        .then(() => {
          this.wwcForm = this.convertForm(Object.assign({}, this.$store.getters['wwc/dataForm']))
        })
    },
    methods: {
      verify () {
        if (this.currentForm.component) {
          this.showForm = true
          return
        }
        if (this.currentForm.redirect_link) {
          window.open(this.currentForm.redirect_link)
        }
      },
      convertForm (_data) {
        let newFormTypes = []
        let count = _data.formtypes.length
        _data.formtypes.forEach((item) => {
          newFormTypes.push(new WwcForm(item))
        })
        _data.formtypes = this.$lodash.chunk(newFormTypes, count - 1)
        return _data
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._wwc-block
        flex-wrap wrap
        @media (min-width 600px)
            height 123px
            flex-wrap nowrap

        ._wwc-block-icon
            background var(--blue)
            color #fff
            display flex
            align-items center
            justify-content center
            max-width 30px
            min-width 31px
            height 31px
            @media (min-width 600px)
                max-width 60px
                min-width 60px
                height 60px

            .svg-icon
                width 22px
                height 22px
                @media (min-width 600px)
                    width 41px
                    height 32px

        .v-btn--default
            margin-top 20px
            @media (min-width: 600px)
                margin-top 0
                max-width 197px
                min-width 197px
            @media (max-width: 600px)
                margin-top 0
                max-width 100px
                min-width 100px
    ._wwc_description
      @media (max-width: 600px)
        flex-direction column
</style>


