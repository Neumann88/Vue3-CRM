<template>
  <div>
    <div class="page-title">
      <h3>{{ this.$locale("Menu_Categories") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @update="updateCategories"
        />
        <h1 v-else class="center">
          {{ this.$locale("Categories_Are_Empty") }}
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/Categories/CategoriesComponents/categoryCreate.vue";
import CategoryEdit from "@/components/Categories/CategoriesComponents/categoryEdit.vue";

export default {
  name: "Categories",
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("categoriesAddArr");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const indx = this.categories.findIndex((e) => e.id === category.id);
      this.categories[indx].name = category.name;
      this.categories[indx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
