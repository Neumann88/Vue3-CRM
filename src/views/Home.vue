<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

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
import HomeCurrency from "@/components/homeApi/HomeСurrency.vue";
import HomeRate from "@/components/homeApi/HomeRate.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Home",
  components: {
    HomeCurrency,
    HomeRate,
    Loader,
  },
  data() {
    return {
      loading: true,
      currency: null,
    };
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
