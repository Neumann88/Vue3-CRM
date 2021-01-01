<template>
  <Form class="card auth-card" @submit="onSubmit" :validation-schema="schema">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <label for="name">Ваше имя</label>
        <Field id="name" name="name" type="text" />
        <ErrorMessage :style="{ color: 'red' }" name="name" />
      </div>
      <div class="input-field">
        <label for="email">Ваш email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage :style="{ color: 'red' }" name="email" />
      </div>
      <div class="input-field">
        <label for="password">Ваш пароль</label>
        <Field id="password" name="password" type="password" />
        <ErrorMessage :style="{ color: 'red' }" name="password" />
      </div>
      <div class="input-field">
        <label for="confirm_password">Повторите пароль</label>
        <Field id="confirm_password" name="confirm_password" type="password" />
        <ErrorMessage :style="{ color: 'red' }" name="confirm_password" />
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
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import Checkbox from "@/components/LoginRegister/Checkbox/Checkbox.vue";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    Checkbox,
  },
  data() {
    return {
      schema: Yup.object().shape({
        checkbox: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .min(6)
          .required(),
        confirm_password: Yup.string()
          .required()
          .oneOf([Yup.ref("password")], "Passwords do not match"),
      }),
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
