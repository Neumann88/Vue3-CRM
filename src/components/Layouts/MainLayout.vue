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
      <main class="app-content" :class="{ full: !isActive }">
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

export default {
  name: "MainLayout",
  data: () => ({
    isActive: true,
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
};
</script>
