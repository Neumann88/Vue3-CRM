<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <Form class="form" @submit="onSubmit" :validation-schema="schema">
      <div class="input-field">
        <Field
          name="name"
          type="text"
          placeholder="Введите имя"
          v-model="nameStart"
        />
        <ErrorMessage :style="{ color: 'red' }" name="name" />
      </div>

      <button class="btn waves-effect  blue darken-1" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      nameStart: "",
      schema: Yup.object().shape({
        name: Yup.string().required(),
      }),
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    this.nameStart = this.info.name;
    setTimeout(() => window.M.updateTextFields(), 0);
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async onSubmit() {
      try {
        await this.updateInfo({ name: this.nameStart });
      } catch (e) {}
    },
  },
};
</script>
