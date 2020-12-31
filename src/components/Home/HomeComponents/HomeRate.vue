<template>
  <div class="col s12 m6 l8">
    <div class="card blue darken-4 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
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
