<template>
    <v-card class="_card-not-available text-xs-center app-bg-sand"
            :class="{'_card-not-available-dialog': dialogView}"
            flat>
        <!--CONTENT-->
        <v-card-title class="_card-not-available--title">
            <app-svg-icon class="_card--icon"
                          name="brand/NG_ENGAGED"></app-svg-icon>
            <h2 v-if="type === 'parent'"
                class="my-3 card--title">
                Sorry, there are no NannyGrannies available in your neighbourhood.
            </h2>
            <h2 v-if="type === 'nanny'"
                class="my-3 card--title">
                Sorry there are no jobs available in your area.
            </h2>
        </v-card-title>
        <v-card-text class="_card-not-available--text">
            <p v-if="type === 'parent'"
               class="_card-not-available--text text-small">
                We&apos;re currently recruiting in your neighbourhood.  Register your 
		details here and we&apos;ll be in touch when we have some NannyGrannies available.
            </p>
            <p v-if="type === 'nanny'"
               class="_card-not-available--text text-small">
                Register your details here as we&apos;ll be in touch when we have some jobs available.
            </p>
        </v-card-text>
        <v-card-actions class="_card-not-available--actions">
            <slot name="text">
                <v-text-field v-model="form.email"
                              placeholder="Enter your email address"
                              v-validate="'required|email'"
                              :error-messages="errors.first('email')"
                              data-vv-name="email"
                              type="email"
                              height="56"
                              solo
                              class="ma-0 "></v-text-field>
                <v-btn color="primary"
                       :loading="loading"
                       class="elevation-0 v-btn--default"
                       @click="submit">
                    Submit
                </v-btn>
            </slot>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'app-card-not-available',

    props: {
      dialogView: Boolean,
      postcode: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        default: 'nanny'
      }
    },

    data () {
      return {
        loading: false,
        form: {
          email: null,
          postcode_id: this.postcode.id
        }
      }
    },

    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.loading = true
            const namespaced = this.type === 'parent' ? 'user/nanny' : 'jobs'
            this.$store.dispatch(`${namespaced}/NOTIFY_AVAILABLE`, this.form)
              .then((res) => (this.$emit('submit')))
              .finally(() => (this.loading = false))
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-not-available
        width 100%
        &--title
            padding-top 0
            justify-content center
            .svg-icon
                margin 0 16px
                width 80px
                color var(--yellow)
        &--text
            padding-top 0
            > p
                max-width 500px
                margin auto
        &--actions
            flex-direction column
            align-items: baseline
            justify-content center
            @media (min-width 600px)
                flex-direction row
            .v-text-field
                width 100%
                max-width 590px
            .v-btn--default
                height 56px
                @media (min-width 600px)
                    margin 0 16px
        &._card-not-available-dialog
            ._card-not-available--actions
                @media (min-width 600px)
                    flex-direction column
                    .v-btn--default
                        min-width 148px
                        margin auto
</style>
