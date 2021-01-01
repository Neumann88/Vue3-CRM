<template>
  <div class="col s12 m6 l8">
    <div class="card blue darken-4 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ this.$locale("Exchange_Ratese") }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ this.$locale("Currency") }}</th>
              <th>{{ this.$locale("Course") }}</th>
              <th>{{ this.$locale("Date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="value of currencies" :key="value">
              <td>{{ value }}</td>
              <td>{{ Math.round(rates[value] * 100) / 100 }}</td>
              <td>
                {{ this.$date(date) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRate",
  props: ["rates", "date"],
  setup() {
    return {
      currencies: ["RUB", "USD", "EUR"],
    };
  },
};
</script>
