<template>
  <div>
    <div class="page-title">
      <h3>{{ this.$locale("Record_History") }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />

    <h1 class="center" v-else-if="!records.length">
      {{ this.$locale("No_Entries_Yet") }}
      <router-link to="/record">{{
        this.$locale("Add_New_Entry")
      }}</router-link>
    </h1>

    <section v-else>
      <HistoryTable v-bind:records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "./HistoryTable/HistoryTable.vue";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "History",
  data() {
    return {
      loading: true,
      records: [],
      categoires: [],
    };
  },
  components: { HistoryTable },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categoires = await this.$store.dispatch("categoriesAddArr");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categoires.find((c) => c.id === record.categoryId)
          .name,
        typeName: record.type === "income" ? "green" : "blue darken-4",
        typeText:
          record.type === "income"
            ? this.$locale("Income")
            : this.$locale("Consumption"),
      };
    });
    this.loading = false;

    this.renderChart({
      labels: this.categoires.map((c) => c.name),
      datasets: [
        {
          label: "Расходы по категориям",
          data: this.categoires.map((c) => {
            return this.records.reduce((total, rec) => {
              if (rec.categoryId === c.id && rec.type === "outcome") {
                total += +rec.amount;
              }
              return total;
            }, 0);
          }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  },
  methods: {
    pageChangeHandler() {},
  },
};
</script>
