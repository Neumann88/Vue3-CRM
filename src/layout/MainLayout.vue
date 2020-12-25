<template>
  <div class="app-main-layout">
    <Navbar @hide="isActive = !isActive" />
    <Sidebar :isActive="isActive" />
    <main class="app-content" :class="{ full: !isActive }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <!-- <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue darken-1" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div> -->
  </div>
</template>

<script>
import Sidebar from "@/components/bar/Sidebar.vue";
import Navbar from "@/components/bar/Navbar.vue";

export default {
  name: "MainLayout",
  data: () => ({
    isActive: true,
  }),
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
