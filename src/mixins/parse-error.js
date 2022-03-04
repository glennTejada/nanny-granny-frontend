export default {
  methods: {
    showErrors (errors) {
      this.$lodash.forEach(errors, (val, key) => {
        this.errors.add({
          field: key,
          msg: val[0]
        })
      })
    }
  }
}
