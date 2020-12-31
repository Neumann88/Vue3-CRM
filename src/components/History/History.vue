<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />

    <h1 class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавить новую запись</router-link>
    </h1>

    <section v-else>
      <HistoryTable v-bind:records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "./HistoryTable/HistoryTable.vue";

export default {
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
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;
  },
};
</script>
