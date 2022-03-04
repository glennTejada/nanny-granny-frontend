<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <div class="mr-3 hidden-sm-and-down">
                <img src="@/assets/error/404.svg" alt="">
            </div>
            <div class="text-md-center">
                <h1>404</h1>
                <h2 class="my-3">Sorry, page not found</h2>
                <div>
                    <v-btn color="primary" @click="goHome">Go Home</v-btn>
                </div>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'not-found',

    methods: {
      goHome () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style scoped>

</style>
