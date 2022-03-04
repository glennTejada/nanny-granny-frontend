<template>
    <v-layout class="_interview_from app-bg-sand column">
        <v-flex my-3>
            <div class="_interview_from--content">
                <h2 class="my-3">{{title}} Interview Form</h2>
                <p class="text-small text--charcoal py-4">Why not send an interview form? Download the
                    form, attach it to your message 
                    using the ‘paperclip’ icon, and ask Anne to fill it out for you.</p>
                <a :href="interviewFormForNGs.image !== undefined ? interviewFormForNGs.image.path : '#'" target='_blank'>
                    <app-svg-icon name="brand/NG_PDF" class="mr-1" width="26" height="27"></app-svg-icon>
                    <span class="text-small">Interview form</span>
                </a>
            </div>
        </v-flex>
        <!--BACKGROUND ELEMENTS-->
        <v-flex class="_interview_from--bg-elements">
            <app-svg-icon v-if="$vuetify.breakpoint.smAndUp"
                          name="patterns/NG_Pattern-06"
                          color="none var(--yellow)"
                          class="svg-icon--pattern-06"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_HOMEWORK_SUPPORT"
                          color="var(--blue)"
                          class="svg-icon--homework"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.mdAndUp"
                          name="brand/NG_HAS_CAR"
                          color="var(--orange)"
                          class="svg-icon--car"></app-svg-icon>
            <app-svg-icon v-if="$vuetify.breakpoint.smAndUp"
                          name="patterns/NG_Pattern-13"
                          color="none var(--green)"
                          class="svg-icon--pattern-13"></app-svg-icon>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-card-interview-form',
    props: {
      username: {
        type: String,
        required: true
      }
    },
    computed: {
      content () {
        return this.$store.getters['page/content']('resources')
      },
      title () {
        if (this.$auth.check(['parent'])) {
          return 'Parent'
        } else {
          return 'NannyGranny'
        }
      },
      interviewFormForNGs () {
        if (this.$auth.check(['parent'])) {
          return this.content.filter(item => item.slug === 'parent')[0] || {}
        } else {
          return this.content.filter(item => item.slug === 'nanny')[0] || {}
        }
      }
    }

  }
</script>

<style lang="stylus" scoped>
    ._interview_from
        position relative
        overflow hidden
        min-height 330px
        background-color var(--sand)

        &--content
            padding 40px 12px
            max-width 500px
            margin auto
            text-align center

        &--bg-elements
            .svg-icon
                position absolute
                &--homework
                    width 60px
                    height 60px
                    top 200px
                    left 18%
                    transform rotate(-10deg)
                &--car
                    width 118px
                    height 80px
                    top 170px
                    right 15%
                    transform rotate(20deg)
                &--pattern-06
                    width 210px
                    height 200px
                    top -21px
                    left -72px
                &--pattern-13
                    width 180px
                    height 230px
                    top 62px
                    right -91px
                    transform rotate(-45deg)
</style>

