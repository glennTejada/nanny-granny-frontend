<template>
    <v-layout>
        <v-slide-y-transition mode="out-in">
            <router-view></router-view>
        </v-slide-y-transition>
    </v-layout>
</template>

<script>
  export default {
    name: 'clubhouse'
  }
</script>

<style scoped>

</style>
