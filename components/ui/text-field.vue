<script>
export default {
  name: `q-text-field`,
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onInput($event) {
      let { value } = $event.target
      // <input type="number"> give back a string
      this.$emit(`input`, this.isNumber ? enforceNumber(value) : value)
    },
  },
}
</script>

<template lang="pug">
input.q-text-field(
  type="text"
  :value="value"
  :name="name"
  :placeholder="placeholder"
  :required="required"
  :readonly="readonly"
  :disabled="disabled"
  @input="onInput"
)
</template>

<style lang="scss" scoped>
.q-text-field {
  border: 1px solid var(--c-grey-lightest);
  border-radius: var(--border-radius);
  padding: 0.7em 1em;
}
</style>
