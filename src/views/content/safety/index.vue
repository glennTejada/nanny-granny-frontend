<template>
    <v-layout v-if="content.length > 0" wrap align-center >
        <safety-layout-top>
        <v-layout row wrap align-center justify-center fill-height _bg-1>
            <v-flex xs12>
                <app-name-page name="Online Safety & Security"></app-name-page>
            </v-flex>
            <v-flex xs12 my-5>
                <v-container w--max--800>
                    <v-layout>
                        <v-flex>
                            <div v-html="textItem[0].description"></div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        </safety-layout-top>
        <safety-layout-middle>
        <v-layout row wrap align-center justify-center fill-height _bg-1>
            <v-flex xs12 class="a-need-knows" v-scrollanim="{ bEnt: 'app-bg-white', enter: 'app-bg-text-book' }">
                <v-container grid-list-xl w--max--750>
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center>
                            <h2>Need to know’s</h2>
                        </v-flex>
                        <v-flex v-for="(item, i) in needItems"
                                :key="'need' + item.id"
                                my-3
                                xs12>
                            <v-layout row wrap text-xs-center text-sm-left :class="{reverse: (i%2 > 0)}">
                                <v-flex xs12 sm2>
                                    <app-svg-icon :name="`brand/${item.svg_name}`"
                                                  :color="`var(--${item.svg_color})`"
                                                  width="80"
                                                  height="70"></app-svg-icon>
                                </v-flex>
                                <v-flex xs12 sm10 d-flex align-center>
                                    <div>{{item.description | text}}</div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        </safety-layout-middle>
        <safety-layout-end>
        <v-layout row wrap align-center justify-center fill-height _bg-1>
            <v-flex xs12 my-5>
                <v-container w--max--800>
                    <v-layout column>
                        <v-flex>
                            <div v-html="textItem[1].description"></div>
                        </v-flex>
                        <v-flex class="link-box">
                            <v-layout column>
                                <v-flex my-2>
                                    <router-link to="/" tag="a" class="app-link--large">Lorem ipsum</router-link>
                                </v-flex>
                                <v-flex my-2>
                                    <router-link to="/" tag="a" class="app-link--large">Cras dapibus vulputate </router-link>
                                </v-flex>
                                <v-flex my-2>
                                    <router-link to="/" tag="a" class="app-link--large">Vestibulum condimentum lectus</router-link>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        </safety-layout-end>
    </v-layout>
</template>

<script>
  import AppNamePage from '../../../components/app-name-page'
  import SafetyLayoutTop from './safety-layout-top'
  import SafetyLayoutMiddle from './safety-layout-middle'
  import SafetyLayoutEnd from './safety-layout-end'
  export default {
    name: 'safety',
    components: {SafetyLayoutTop, SafetyLayoutMiddle, SafetyLayoutEnd, AppNamePage},
    data () {
      return {
        //
      }
    },

    computed: {
      content () {
        return this.$store.getters['page/content']('our-safety')
      },
      needItems () {
        return this.content.filter(item => item.slug === 'need_know_item')
      },
      textItem () {
        return this.content.filter(item => item.slug === 'text_section')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .a-need-knows
        padding 50px 16px 70px
        margin 56px 0
    .link-box
        margin 20px 0 80px
        @media (min-width: 600px)
            margin 50px 0 100px
</style>
