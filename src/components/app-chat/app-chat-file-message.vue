<template>
    <div class='sc-message--file-icon'>
        <a :href="file.path || '#'" target='_blank'>
            <v-img :src="file.path"
                   max-width="140" class="elevation-3">
                <v-layout slot="placeholder"
                          fill-height
                          align-center
                          justify-center
                          ma-0>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-layout>
            </v-img>
        </a>
    </div>
</template>

<script>
  export default {
    name: 'app-chat-file-message',
    props: {
      file: {
        type: null,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
