<template>
  <div>
    <div class="page-title">
      <h3>{{ this.$locale("ProfileTitle") }}</h3>
      <div class="switch">
        <label>
          Eng
          <input type="checkbox" v-model="isRu" />
          <span class="lever"></span>
          Rus
        </label>
      </div>
    </div>

    <Form class="form" @submit="onSubmit" :validation-schema="schema">
      <div class="input-field">
        <label for="name">{{ this.$locale("Message_EnterName") }}</label>
        <Field id="name" name="name" type="text" v-model="nameStart" />
        <ErrorMessage :style="{ color: 'red' }" name="name" />
      </div>

      <button class="btn waves-effect  blue darken-1" type="submit">
        {{ this.$locale("Update") }}
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
      isRu: true,
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
    this.isRu = this.info.locale === "ru-RU";
    setTimeout(() => window.M.updateTextFields(), 0);
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async onSubmit() {
      try {
        await this.updateInfo({
          name: this.nameStart,
          locale: this.isRu ? "ru-RU" : "en-US",
        });
      } catch (e) {}
    },
  },
};
</script>
