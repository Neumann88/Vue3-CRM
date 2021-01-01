<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          this.$locale("Menu_History")
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{
            record.type === "income"
              ? this.$locale("Income")
              : this.$locale("Consumption")
          }}
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
              <p>{{ this.$locale("Description") }}: {{ record.description }}</p>
              <p>
                {{ this.$locale("Amount") }}: {{ this.$filters(record.amount) }}
              </p>
              <p>{{ this.$locale("Category") }}: {{ record.categoryName }}</p>

              <small>{{ this.$date(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="center" v-else>
      {{ this.$locale("No_Entries_Yet") }}
      <router-link to="/record">{{
        this.$locale("Add_New_Entry")
      }}</router-link>
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
