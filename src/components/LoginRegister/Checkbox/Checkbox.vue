<template>
  <label>
    <input type="checkbox" @click="handleChange(value)" />
    <span>С правилами согласен</span>
  </label>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    modelValue: {
      type: null,
    },
    name: String,
    value: {
      type: String,
    },
  },
  setup({ name, value }) {
    const { checked, handleChange } = useField(name, undefined, {
      type: "checkbox",
      valueProp: value,
    });

    return {
      checked,
      handleChange,
    };
  },
};
</script>