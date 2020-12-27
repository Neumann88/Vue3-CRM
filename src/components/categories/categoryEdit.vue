<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="input-field">
          <select>
            <option>Category</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Название</label>
          <span class="helper-text invalid">TITLE</span>
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
          Обновить
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
  name: "CategoryEdit",
  components: {
    TextInput,
    Form,
  },
  methods: {
    async onSubmit({ name, limit }) {
      try {
        await this.$store.dispatch("createCategory", { name, limit });
      } catch (e) {}
    },
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
};
</script>
