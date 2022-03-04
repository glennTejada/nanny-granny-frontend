<template>
    <div>
        <v-text-field v-if="editing"
                      v-model="name"
                      :ref="`name_${item.id}`"
                      @click.stop
                      @blur="updateName"
                      solo
                      hide-details>
        </v-text-field>
        <span v-if="!editing"
              class="d-inline-block"
              style="padding: 12px">{{name}}</span>
        <app-svg-icon v-if="!editing"
                      name="brand/NG_EDIT"
                      class="mx-2"
                      color="var(--blue)"
                      width="18"
                      style="max-width: 18px"
                      @click.stop="focusName"
                      height="18"></app-svg-icon>
    </div>
</template>

<script>
  import GroupUserClass from '../../../models/GroupUserClass'

  export default {
    name: 'connection-name-group',

    props: {
      item: {
        type: GroupUserClass,
        required: true
      }
    },

    data () {
      return {
        editing: false,
        selected: null,
        name: this.item.getName()
      }
    },

    methods: {
      focusName () {
        this.editing = true
        this.$nextTick(() => {
          this.$refs[`name_${this.item.id}`].focus()
        })
      },
      updateName () {
        this.editing = false
        this.$store.dispatch('user/connect/groups/UPDATE_NAME', {
          id: this.item.id,
          name: this.name
        })
      }
    }
  }
</script>

<style scoped>

</style>
