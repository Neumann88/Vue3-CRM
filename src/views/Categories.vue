<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/categories/categoryCreate.vue";
import CategoryEdit from "@/components/categories/categoryEdit.vue";

export default {
  name: "Categories",
  data() {
    return {
      categoriesArr: [],
    };
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  methods: {
    addNewCategory(category) {
      this.categoriesArr.push(category);
      console.log(this.categoriesArr);
    },
  },
};
</script>
