<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === "income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card blue darken-4"
            :class="{
              blue: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ this.$filters(record.amount) }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ this.$date(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="center" v-else>
      Такой записи нет.
      <router-link to="/record">Добавить новую запись</router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  data() {
    return {
      record: null,
      loading: true,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const recordId = await this.$store.dispatch("fetchRecordsId", id);
    const categoryId = await this.$store.dispatch(
      "categoriesAddId",
      recordId.categoryId
    );

    this.record = {
      ...recordId,
      categoryName: categoryId.name,
    };

    this.loading = false;
  },
};
</script>
