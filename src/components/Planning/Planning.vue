<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ this.$filters(info.bill) }}</h4>
    </div>
    <Loader v-if="loading" />

    <h1 class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </h1>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.name }}:</strong>
          {{ this.$filters(cat.spend) }} из {{ this.$filters(cat.limit) }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Planning",
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categoires = await this.$store.dispatch("categoriesAddArr");

    this.categories = categoires.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
      };
    });

    this.loading = false;
  },
};
</script>
