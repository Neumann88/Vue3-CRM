<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="input-field">
          <TextInput
            name="name"
            type="text"
            label="Название"
            placeholder="Введите название"
          />
        </div>

        <div class="input-field">
          <TextInput
            name="limit"
            type="number"
            label="Лимит"
            placeholder="Минимальная величина 100"
          />
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
import { Form } from "vee-validate";
import * as Yup from "yup";

import TextInput from "@/components/textinput/TextInput.vue";

export default {
  name: "CategoryCreate",
  components: {
    TextInput,
    Form,
  },
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      limit: Yup.number()
        .min(100)
        .integer()
        .required(),
    });
    return {
      schema,
    };
  },
  methods: {
    async onSubmit({ name, limit }, { resetForm }) {
      try {
        const category = await this.$store.dispatch("createCategory", {
          name,
          limit,
        });
        resetForm();
        this.$message("Категория была создана");
        this.$emit("created", category);
      } catch (e) {}
    },
  },
};
</script>
