<template>
    <app-loader></app-loader>
</template>

<script>
  import App from '../../../../App'
  import AppLoader from '../../../../components/app-loader'
  export default {
    name: 'auth-logout',
    components: {AppLoader, App},
    created () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login'
      }).catch(() => (this.$router.push('/login')))
    }
  }
</script>

<style scoped>

</style>
