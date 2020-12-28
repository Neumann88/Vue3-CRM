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
            id="name"
            name="name"
            type="text"
            placeholder="Введите название"
            v-model="nameStart"
          />
          <ErrorMessage :style="{ color: activeColor }" name="name" />
        </div>

        <div class="input-field">
          <Field id="limit" name="limit" type="number" v-model="limitStart" />
          <ErrorMessage :style="{ color: activeColor }" name="limit" />
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

import TextInput from "@/components/textinput/TextInput.vue";

export default {
  name: "CategoryEdit",
  props: ["categories"],
  components: {
    TextInput,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      activeColor: "red",
      nameStart: "",
      limitStart: 100,
      current: null,
      select: null,
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
      console.log(name);
      console.log(limit);
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
    this.select = window.M.FormSelect.init(this.$refs.selector);
  },
  unmounted() {
    if (this.select && this.select.destroy) this.select.destroy();
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
