<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/components/utils/messages.js";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(
        messages[fbError.code] ||
          "Упс, кажется нас хакают, бегите пока можете!!!"
      );
    },
  },
};
</script>
