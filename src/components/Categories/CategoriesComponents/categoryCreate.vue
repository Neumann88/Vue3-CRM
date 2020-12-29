<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema">
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
          Создать
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
  name: "CategoryCreate",
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
  methods: {
    async onSubmit({ name, limit }, { resetForm }) {
      try {
        const category = await this.$store.dispatch("createCategory", {
          name,
          limit,
        });
        this.nameStart = "";
        this.limitStart = 100;
        resetForm();
        this.$message("Категория была создана");
        this.$emit("created", category);
      } catch (e) {}
    },
  },
};
</script>
