<template>
    <div class="link-box">
        <a v-for="item in resources"
           :key="'res_' + item.id"
           :href="(item.image || {}).path" class="link-small">
            <app-svg-icon name="brand/NG_PDF"></app-svg-icon>
            {{item.name}}
        </a>
    </div>
</template>

<script>
  export default {
    name: 'dashboard-resources',

    computed: {
      resources () {
        const _role = this.$auth.user().role
        return this.$store.getters['page/content']('resources')
          .filter(item => item.slug === _role)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    a
        display block
        margin-bottom 10px
        text-decoration underline
    .svg-icon
        display none

    @media (min-width: 600px)
        .link-box
            margin-top 30px
            > a
                display inline-block
                margin-bottom 0
                padding 0 30px
            .svg-icon
                display inline-block
                width 28px
                margin-right 10px
</style>
