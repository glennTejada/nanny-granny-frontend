<template>
    <div class="inbox-layout p-relative overflow-hidden">
        <!--CONTENT-->
        <div>
            <slot></slot>
        </div>
        <!--BACKGROUND ELEMENTS-->
        <app-svg-icon name="patterns/NG_Pattern-10"
                      color="none var(--yellow)"
                      class="svg-icon--pattern-10 hidden-sm-and-down"></app-svg-icon>
        <app-svg-icon name="brand/NG_HOMEWORK_SUPPORT"
                      color="var(--orange)"
                      class="svg-icon--homework hidden-sm-and-down"></app-svg-icon>
        <app-svg-icon name="brand/NG_ACTIVE"
                      class="svg-icon--active hidden-sm-and-down"
                      color="var(--green)"></app-svg-icon>
    </div>
</template>

<script>
  export default {
    name: 'inbox-layout'
  }
</script>

<style lang="stylus" scoped>
    .inbox-layout
        padding-bottom 100px
        .svg-icon
            position absolute
            &--homework
                bottom 40%
                right  5%
                transform rotate(-13deg)
                width 50px
                height 60px
            &--pattern-10
                top 450px
                left  -70px
                width 200px
                height 200px
            &--active
                bottom -20px
                left 140px
                transform rotate(-351deg)
                width 90px
                height 90px
</style>
