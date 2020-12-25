<template>
  <div class="app-main-layout">
    <Navbar @hide="isActive = !isActive" />
    <Sidebar :isActive="isActive" />
    <main class="app-content" :class="{ full: !isActive }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
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
