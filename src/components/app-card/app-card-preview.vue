<template>
    <v-layout>
        <v-container>
            <v-layout>
                <v-flex xs12 md6 d-flex align-end _box-card>
                    <v-card flat>
                        <v-card-text class="px-0">
                            <slot></slot>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <!--PATTERN-->
        <div class="">
            <app-svg-icon name="patterns/NG_Pattern-01"></app-svg-icon>
        </div>
    </v-layout>
</template>

<script>
  export default {
    name: 'app-card-preview',

    props: {
      pattern: String,
      src: String
    }
  }
</script>

<style scoped>

</style>
