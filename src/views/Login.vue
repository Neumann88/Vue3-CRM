<template>
  <Form class="card auth-card" @submit="onSubmit" :validation-schema="schema">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <TextInput
          name="email"
          type="email"
          label="E-mail"
          placeholder="Your email address"
          success-message="Got it!"
        />
      </div>
      <div class="input-field">
        <TextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          success-message="Secure!"
        />
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
import { Form } from "vee-validate";
import * as Yup from "yup";
import TextInput from "@/components/textinput/TextInput.vue";

export default {
  name: "Login",
  components: {
    TextInput,
    Form,
  },
  methods: {
    onSubmit(values) {
      this.$router.push("/");
      console.log(JSON.stringify(values, null, 2));
    },
  },
  setup() {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    });
    return {
      schema,
    };
  },
};
</script>