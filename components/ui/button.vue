<script>
export default {
  name: `q-button`,
  props: {
    type: {
      type: String,
      default: `button`,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit(`click`)
    },
  },
  computed: {
    classes() {
      return {
        'q-button--secondary': this.secondary,
        'q-button--disabled': this.disabled,
      }
    },
  },
}
</script>

<template lang="pug">
button.q-button(
  @click="onClick"
  :type="type"
  :class="classes"
)
  slot
</template>

<style lang="scss" scoped>
.q-button {
  padding: 0.7em 1em;
  color: white;
  background: var(--c-accent);
  border-radius: var(--border-radius);
  border: 0;
  transition: background-color 0.2s ease-out, box-shadow 0.05s ease-out,
    color 0.1s ease-out;

  &:hover {
    background-color: var(--c-accent-darker);
  }
  &:active {
    box-shadow: inset 3px 3px 0 0 rgba(57, 66, 70, 0.3);
  }
}
.q-button--secondary {
  background: var(--c-secondary);

  &:hover {
    background-color: var(--c-secondary-darker);
  }
}
.q-button--disabled {
  color: var(--c-grey-lighter);
  background-color: var(--c-grey-lightest);
  cursor: not-allowed;
}
</style>
