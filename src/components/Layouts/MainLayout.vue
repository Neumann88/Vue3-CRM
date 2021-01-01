<template>
  <div>
    <div
      :style="{ display: flex, 'align-items': center, height: number + 'vh' }"
      class="flexLoading"
      v-if="loading"
    >
      <Loader />
    </div>
    <div v-else class="app-main-layout">
      <Navbar @hide="isActive = !isActive" />
      <Sidebar :isActive="isActive" />
      <main class="app-content full">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SideNavBars/Sidebar.vue";
import Navbar from "@/components/SideNavBars/Navbar.vue";
import Loader from "@/components/Loader.vue";
import messages from "@/components/utils/messages.js";

export default {
  name: "MainLayout",
  data: () => ({
    isActive: false,
    loading: true,
    flex: "flex",
    center: "center",
    number: 100,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    Sidebar,
    Navbar,
    Loader,
  },
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
