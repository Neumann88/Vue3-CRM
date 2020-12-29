<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="input-field">
          <select ref="selector" v-model="current">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <Field
            name="name"
            type="text"
            placeholder="Введите название"
            v-model="nameStart"
          />
          <ErrorMessage :style="{ color: 'red' }" name="name" />
        </div>

        <div class="input-field">
          <Field
            name="limit"
            type="number"
            placeholder="Минимальное значение 100"
            v-model="limitStart"
          />
          <ErrorMessage :style="{ color: 'red' }" name="limit" />
        </div>

        <button class="btn waves-effect blue darken-1" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "CategoryEdit",
  props: ["categories"],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      nameStart: "",
      limitStart: 100,
      current: null,
      selector: null,
      schema: Yup.object().shape({
        name: Yup.string().required(),
        limit: Yup.number()
          .min(100)
          .integer()
          .required(),
      }),
    };
  },
  watch: {
    current(someId) {
      const { name, limit } = this.categories.find((c) => c.id === someId);
      this.nameStart = name;
      this.limitStart = limit;
    },
  },
  created() {
    const { id, limit, name } = this.categories[0];
    this.current = id;
    this.nameStart = name;
    this.limitStart = limit;
  },
  mounted() {
    this.selector = window.M.FormSelect.init(this.$refs.selector);
    window.M.updateTextFields();
  },
  unmounted() {
    if (this.selector && this.selector.destroy) this.selector.destroy();
  },
  methods: {
    async onSubmit({ name, limit }) {
      try {
        const data = {
          id: this.current,
          name: this.nameStart,
          limit: this.limitStart,
        };
        await this.$store.dispatch("updateCategories", data);
        this.$message("Категория обновлена!");
        this.$emit("update", data);
      } catch (e) {}
    },
  },
};
</script>
