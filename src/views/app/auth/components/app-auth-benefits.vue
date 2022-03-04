<template>
    <v-layout column>
        <v-flex text-xs-center mb-5>
            <slot name="header">
                <h1>Not a member?</h1>
                <p>Register for a range of member only benefits</p>
            </slot>
        </v-flex>
        <v-flex>
            <v-layout v-if="benefits.length > 1" _auth-benefits>
                <!--PARENT-->
                <v-flex>
                    <v-card flat
                            color="transparent"
                            class="_auth-benefits--card _card_first">
                        <v-card-text class="d-flex pa-0">
                            <div>
                                <h2>{{benefits[0].name}}</h2>
                                <p class="text-small">{{benefits[0].description | text}}</p>
                                <v-btn v-if="!hideActions"
                                       to="/signup?role=parent"
                                       class="v-btn--default primary elevation-0 mx-0">
                                    Become a member
                                </v-btn>
                            </div>
                            <div class="_auth-benefits--card_icon">
                                <app-svg-icon :name="`brand/${benefits[0].svg_name}`"
                                              :color="`var(--${benefits[0].svg_color})`"></app-svg-icon>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <!--DIVIDER-->
                <v-flex class="_auth-benefits--divider pa-4">
                    <app-svg-icon name="brand/NG_ACTIVE"
                                  width="70"
                                  height="60"
                                  color="var(--yellow)"></app-svg-icon>
                </v-flex>
                <!--NANNY-->
                <v-flex>
                    <v-card flat
                            color="transparent"
                            class="_auth-benefits--card _card_second">
                        <v-card-text class="d-flex pa-0">
                            <div class="_auth-benefits--card_icon">
                                <app-svg-icon :name="`brand/${benefits[1].svg_name}`"
                                              :color="`var(--${benefits[1].svg_color})`"></app-svg-icon>
                            </div>
                            <div>
                                <h2>{{benefits[1].name}}</h2>
                                <p class="text-small">{{benefits[1].description | text}}</p>
                                <v-btn v-if="!hideActions"
                                       to="/signup?role=nanny"
                                       class="v-btn--default primary elevation-0 mx-0">
                                    Register for free
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-auth-benefits',
    props: {
      hideActions: Boolean
    },
    computed: {
      benefits () {
        return this.$store.getters['page/content']('login')
          .filter(item => item.slug === `benefits`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    ._auth-benefits
        flex-direction column
        @media (min-width 960px)
            flex-direction row
        &--card
            @media (min-width 960px)
                max-width 480px
            > .v-card__text
                text-align center
                flex-direction column
                @media (min-width 960px)
                    text-align left
                    flex-direction row
            &._card_first
                > .v-card__text
                    flex-direction column-reverse
                    @media (min-width 960px)
                        text-align right
                        flex-direction row
            &._card_first
                ._auth-benefits--card_icon
                    @media (min-width 960px)
                        margin-left 32px
                    svg
                        width 50px
 
            &._card_second
                ._auth-benefits--card_icon
                    @media (min-width 960px)
                        margin-right 32px
                    svg
                        width 50px

            &_icon
                margin-bottom 30px
                .svg-icon
                    width 48px
                    height 60px
                    @media (min-width 960px)
                        width 70px
                        height 88px
        &--divider
            text-align center
            .svg-icon
                transform rotate(138deg)
                @media (min-width 960px)
                    transform rotate(15deg)
</style>
