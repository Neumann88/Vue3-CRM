<template>
  <div>
    <div class="page-title">
      <h3>{{ this.$locale("Menu_Bill") }}</h3>

      <button
        class="btn waves-effect  blue darken-1 btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeCurrency :rates="currency.rates" />
      <HomeRate :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeCurrency from "@/components/Home/HomeComponents/HomeСurrency.vue";
import HomeRate from "@/components/Home/HomeComponents/HomeRate.vue";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  components: {
    HomeCurrency,
    HomeRate,
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchFixer");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchFixer");
      this.loading = false;
    },
  },
};
</script>
