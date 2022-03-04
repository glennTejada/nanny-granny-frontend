<template>
    <v-card flat
            class="text-xs-center _card-benefits">
        <v-card-title class="justify-center"
                      v-scrollanim="{ bEnt: !ind ? 'before-fadein' : 'no', enter: 'fadein' }">
            <app-svg-icon :name="`brand/${item.svg_name}`"
                          :color="`var(--${item.svg_color})`"
                          width="95"
                          height="80"></app-svg-icon>
        </v-card-title>
        <v-card-text>
            <!--<h3 class="mb-3">{{item.name}}</h3>-->
            <p class="text-small mb-0">{{item.description | text}}</p>
        </v-card-text>
        <v-card-text class="py-0">
            <router-link :to="item.param.link.href" tag="a">{{item.param.link.name}}</router-link>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: 'app-card-benefits',
    // props: ['item'],
    props: {
      item: Object,
      ind: Number
    }
  }
</script>

<style lang="stylus" scoped>
    ._card-benefits
        background-color transparent !important
        max-width 350px
        min-height 340px
    .v-card__text
        padding 16px 4px
</style>
