<template>
  <Form class="card auth-card" @submit="onSubmit" :validation-schema="schema">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect blue darken-1 auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link class="btn blue darken-1" to="/register"
          >Зарегистрироваться</router-link
        >
      </p>
    </div>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import messages from "@/components/utils/messages.js";

export default {
  name: "Login",
  components: {
    messages,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema: Yup.object().shape({
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
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async onSubmit({ email, password }) {
      try {
        await this.$store.dispatch("login", { email, password });
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>
