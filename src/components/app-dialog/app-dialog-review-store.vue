<template>
    <v-layout>
        <v-flex>
            <v-card class="app-bg-sand _card-review">
                <v-card-title class="text-xs-center justify-center">
                    <h2 class="my-4">
                        {{rawData.review.id ? 'Edit' : 'Write'}} a review for {{rawData.review.review_user.first_name}}
                    </h2>
                    <div v-if="!rawData.review.id" class="text-small">This review, once approved by {{rawData.review.review_user.first_name}}, will appear on her profile page. You can manage the
                        reviews you write in your account section.</div>
                </v-card-title>
                <v-card-text>
                    <label class="app-label">Star ratings</label>
                    <v-rating v-model="form.rating"
                              v-validate="'required|min:1'"
                              data-vv-name="review"
                              :error-messages="errors.first('rating')"
                              :size="$vuetify.breakpoint.xsOnly ? 18 : 38"
                              class="d-inline-block app-rating"
                              hover
                              dense
                              background-color="success"
                              color="success"></v-rating>
                    <v-textarea label="Review"
                                v-model="form.review_text"
                                v-validate="'required'"
                                no-resize
                                data-vv-name="review"
                                :error-messages="errors.first('review')"
                                outline></v-textarea>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="primary v-btn--default elevation-0"
                           :loading="loading"
                           @click="submit">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import Review from '../../models/ReviewClass'

  export default {
    name: 'app-dialog-review-store',
    props: {
      rawData: {
        review: {
          type: Review,
          default: () => new Review()
        },
        action: {
          type: String,
          default: 'create'
        }
      }
    },
    data () {
      return {
        form: {
          id: this.rawData.review.id,
          rating: this.rawData.review.rating || 0,
          review_text: this.rawData.review.review_text || '',
          review_user_id: this.rawData.review.user.id
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters['reviews/loading']
      }
    },

    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
          if (result) {
            let _action = this.form.id > 0 ? 'UPDATE' : 'STORE'
            if (_action === 'UPDATE') {
              delete this.form['review_user_id']
            }
            this.$store.dispatch(`reviews/${_action}`, this.form)
              .then(() => {
                if (this.action === 'update') {
                  this.$store.commit('dialog/DIALOG_SHOW', {show: false})
                  this.showSnackBar('', 'success')
                }
                this.$emit('submitSuccess')
              })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-review
        @media (min-width 960px)
            padding 32px
        .text-small
            max-width 430px
        .app-rating
            margin-bottom 50px
</style>
