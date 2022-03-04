<template>
    <v-card :class="{
                '_card-page-base': true,
                '_card-page-base--row': row,
                '_card-page-base--row--reverse': reverse
            }"
            flat>
        <v-card-title class="justify-center">
            <slot name="icon"
                  :item="item"></slot>
        </v-card-title>
        <v-card-text class="_card-page-base--text">
            <slot name="text"
                  :item="item"></slot>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: 'app-card-page-item',
    props: {
      item: Object,
      row: Boolean,
      reverse: Boolean
    }
  }
</script>

<style lang="stylus">
    ._card-page-base
        text-align center
        background-color transparent !important
        display flex
        flex-direction column
        &--text
            p
                margin 0
                font-size 1em
        &--row
            @media (min-width 600px)
                text-align left
                flex-direction row
                align-items center
            &--reverse
                @media (min-width 600px)
                    text-align right
                    flex-direction row-reverse
</style>
