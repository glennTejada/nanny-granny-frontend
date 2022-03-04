<template>
    <v-card flat
            class="py-4">
        <v-card-title>
            <h3 class="ma-auto">Invite to a group</h3>
        </v-card-title>
        <v-card-text>
            <v-select label="Groups*"
                      placeholder="Please choose"
                      v-model="groupId"
                      :items="groups"
                      item-value="id"
                      item-text="name"
                      v-validate="'required'"
                      data-vv-name="group"
                      :error-messages="errors.first('group')"
                      :menu-props="{offsetY: true}"
                      outline>
                <template slot="selection"
                          slot-scope="{item, index}">
                    <span class="text--black">{{ item.name | capitalize }}</span>
                </template>
            </v-select>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn outline
                   color="primary"
                   @click="$emit('update:modal', false)">
                Cancel
            </v-btn>
            <v-btn class="primary"
                   :loading="inviting"
                   @click="inviteToGroup"
                   depressed>
                Invite
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'connection-invite-group',

    props: {
      modal: Boolean,
      userIds: {
        type: Array,
        required: true
      }
    },

    data () {
      return {
        inviting: false,
        groupId: null
      }
    },

    computed: {
      groups () {
        return this.$store.getters['user/connect/groups/collection']
      }
    },

    methods: {
      inviteToGroup () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.inviting = true
            this.$store.dispatch('user/connect/groups/INVITE_TO', {
              roomId: this.groupId,
              data: {
                users_ids: this.userIds
              }
            })
              .then(res => {
                this.$store.dispatch('user/connect/groups/FETCH', {authID: this.$auth.user().id})
                  .finally(() => {
                    this.$emit('update:modal', false)
                    this.inviting = false
                  })
              })
              .catch(() => (this.inviting = false))
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
