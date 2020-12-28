<template>
  <Form class="card auth-card" @submit="onSubmit" :validation-schema="schema">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <TextInput
          name="name"
          type="text"
          label="Your Name"
          placeholder="Ваше имя"
          success-message="Nice to meet you!"
        />
      </div>
      <div class="input-field">
        <TextInput
          name="email"
          type="email"
          label="E-mail"
          placeholder="Ваш email"
          success-message="Got it!"
        />
      </div>
      <div class="input-field">
        <TextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Ваш пароль"
          success-message="Secure!"
        />
      </div>
      <div class="input-field">
        <TextInput
          name="confirm_password"
          type="password"
          label="Confirm Password"
          placeholder="Повторите пароль"
          success-message="It`s matched!"
        />
      </div>
      <Checkbox name="checkbox" value="true" />
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect blue darken-1 auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Уже есть аккаунт?
        <router-link class="btn blue darken-1" to="/login">Войти!</router-link>
      </p>
    </div>
  </Form>
</template>

<script>
import { Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import Checkbox from "@/components/textinput/Checkbox.vue";
import TextInput from "@/components/textinput/TextInput.vue";

export default {
  name: "Register",
  components: {
    TextInput,
    Form,
    ErrorMessage,
    Checkbox,
  },
  setup() {
    const schema = Yup.object().shape({
      checkbox: Yup.string().required(),
      name: Yup.string()
        .min(4)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    });
    return {
      schema,
    };
  },
  methods: {
    async onSubmit({ email, password, name }) {
      try {
        await this.$store.dispatch("register", { email, password, name });
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
