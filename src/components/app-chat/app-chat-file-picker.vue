<template>
    <label :for="id" class="text--grey_1">
        <app-svg-icon name="ui/NG_CLIP_ICON"
                      width="22"
                      height="22"
                      :original="true"></app-svg-icon>
        <input type='file'
               v-validate="'mimes:image/*'"
               data-vv-as="image"
               name="mimes_field"
               :id='id'
               @change="handleChange"
               @click="handleClick"/>
    </label>
</template>

<script>
  export default {
    name: 'app-chat-file-picker',
    props: {
      onChange: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        id: 'inputFile_' + Math.floor(Math.random() * 1000)
      }
    },
    methods: {
      handleClick (e) {
        e.target.value = null
      },
      handleChange (e) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.onChange(e.target.files[0])
          } else {
            this.showSnackBar('The image field must have a valid file type.', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    input[type="file"]
        display none
        cursor: pointer
    label
        cursor: pointer
        > .v-icon
            width 24px
            height 24px
            margin 0
            color var(--grey_2)
            cursor: pointer
</style>
