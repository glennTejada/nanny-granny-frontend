<template>
    <contact-us-layout>
    <v-layout align-center justify-center row wrap fill-height>
        <!-- FORM -->
        <v-flex xs12 app-container-content-page>
            <v-layout row wrap>
                <v-flex class="text-xs-center">
                    <h1 class="display-my-page display-with-label">Contact Us</h1>
                </v-flex>
                <v-flex>
                    <v-container grid-list-lg py-0 px-3>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-text-field label="First name*"
                                              v-model="form.first_name"
                                              v-validate="'required'"
                                              :error-messages="errors.first('firstName')"
                                              data-vv-name="firstName"
                                              outline></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field label="Last name*"
                                              v-model="form.last_name"
                                              v-validate="'required'"
                                              :error-messages="errors.first('lastName')"
                                              data-vv-name="lastName"
                                              outline></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-select label="I'm a*"
                                          placeholder="Please choose"
                                          v-model="form.iam"
                                          :items="roles"
                                          item-value="value"
                                          item-text="name"
                                          v-validate="'required'"
                                          data-vv-name="role"
                                          :menu-props="{offsetY: true}"
                                          outline>
                                    <template slot="selection"
                                              slot-scope="{item, index}">
                                        <span class="text--black">{{item.name}}</span>
                                    </template>
                                </v-select>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field v-model="form.phone"
                                              label="Mobile phone"
                                              :mask="maskPhone"
                                              outline></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Message*"
                                            v-model="form.message"
                                            v-validate="'required'"
                                            :error-messages="errors.first('message')"
                                            data-vv-name="message"
                                            height="128"
                                            outline
                                            no-resize></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex class="text-xs-center px-3 xs12">
                    <v-btn @click="sendMsg"
                           :loading="loading"
                           class="primary mx-0"
                           flat>Submit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <!-- FOOTER -->
        <v-flex class="app-contact-us-footer elevation-0">
            <app-card-faqs></app-card-faqs>
        </v-flex>
    </v-layout>
    </contact-us-layout>
</template>

<script>
  import AppCardFaqs from '../../../components/app-card/app-card-faqs'
  import PageAPI from '@/api/page'
  import ContactUsLayout from './contact-us-layout'

  export default {
    name: 'contact-us',
    components: {AppCardFaqs, ContactUsLayout},
    data () {
      return {
        loading: false,
        maskPhone: '##########',
        roles: [
          {name: 'Parent', value: 'parent'},
          {name: 'NannyGranny', value: 'nanny'}
        ],
        form: {
          first_name: '',
          last_name: '',
          iam: {name: 'Parent', value: 'parent'},
          phone: '',
          message: ''
        },
        dictionary: {
          attributes: {
            firstName: 'First name',
            lastName: 'Last name'
          }
        }
      }
    },

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    created () {
      if (this.$auth.check()) {
        this.form.first_name = this.$auth.user().first_name
        this.form.last_name = this.$auth.user().last_name
        this.form.phone = this.$auth.user().phone
        this.form.iam = this.$auth.user().role
      }
    },

    methods: {
      sendMsg () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            PageAPI.contactus(this.form)
              .then(res => {
                this.form.message = ''
                this.showSnackBar('The message has been sent!', 'success')
              })
              .finally(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .app-v-select
        margin-bottom 28px

    .v-btn
        width 100%
        &.primary
            margin-bottom 50px

    .display-with-label:after
        /*background-image url("../../../assets/img/brand-icons/PETS_GREEN.svg")*/
        width 50px
        bottom -66px
        right 16px

    .app-contact-us-footer
        width 100%
        .app-need-help
            /*background-image url("../../../assets/img/ui-patterns/NG_Pattern-01-yellow.svg")*/
            background-size: 150px;
            background-position: -66px 144px;

    @media (min-width: 600px)
        .display-with-label:after
            width 68px
            right 10px
            bottom -30px
        .v-btn
            max-width 128px
            &.primary
                margin-bottom 100px

        .app-contact-us-footer
            width 100%
            .app-need-help
                background-size: 200px;
                background-position: -51px 114px;
</style>
