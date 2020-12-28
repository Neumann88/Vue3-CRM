<template>
  <div class="col s12 m6 l4">
    <div class="card blue darken-1 bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="value of currencies" :key="value" class="currency-line">
          <span>{{ $filters(getCurrency(value), value) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: ["rates"],
  setup() {
    return {
      currencies: ["RUB", "USD", "EUR"],
    };
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"])
      );
    },
  },
  methods: {
    getCurrency(value) {
      return Math.floor(this.base * this.rates[value]);
    },
  },
};
</script>
