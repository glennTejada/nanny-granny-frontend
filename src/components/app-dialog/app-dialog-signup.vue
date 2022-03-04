<template>
    <v-layout column text-xs-center pa-3 class="app-bg-sand">
        <v-flex tag="h2" my-4>
            To be able to apply for one of these jobs, register now
        </v-flex>
        <v-flex my-4>
            <v-btn to="/signup"
                   class="v-btn--default primary elevation-0">
                Register now
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-dialog-signup'
  }
</script>

<style scoped>

</style>
