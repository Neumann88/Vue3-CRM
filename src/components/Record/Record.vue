<template>
  <div>
    <div class="page-title">
      <h3>{{ this.$locale("Menu_NewRecord") }}</h3>
    </div>
    <Loader v-if="loading" />
    <h1 class="center" v-else-if="!categories.length">
      {{ this.$locale("No_Сategories_Yet") }}
      <router-link to="/categories">{{
        this.$locale("Add_New_Сategory")
      }}</router-link>
    </h1>
    <Form class="form" v-else :validation-schema="schema" @submit="onSubmit">
      <div class="input-field">
        <select ref="selector" v-model="current">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
            >{{ category.name }}
          </option>
        </select>
        <label>{{ this.$locale("Select_Category") }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ this.$locale("Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ this.$locale("Consumption") }}</span>
        </label>
      </p>

      <div class="input-field">
        <label for="amount">{{ this.$locale("Minimum_Value_1") }}</label>
        <Field
          id="amount"
          name="amount"
          type="number"
          v-model.number="amountStart"
        />
        <ErrorMessage :style="{ color: 'red' }" name="amount" />
      </div>

      <div class="input-field">
        <label for="description">{{ this.$locale("Description") }}</label>
        <Field
          id="description"
          name="description"
          type="text"
          v-model="descriptionStart"
        />
        <ErrorMessage :style="{ color: 'red' }" name="description" />
      </div>

      <button class="btn waves-effect blue darken-1" type="submit">
        {{ this.$locale("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { mapGetters } from "vuex";

export default {
  name: "Record",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loading: true,
      selector: null,
      categories: [],
      current: null,
      type: "outcome",
      amountStart: 1,
      descriptionStart: "",
      schema: Yup.object().shape({
        description: Yup.string().required(),
        amount: Yup.number()
          .min(1)
          .integer()
          .required(),
      }),
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("categoriesAddArr");
    this.loading = false;
    setTimeout(() => {
      this.selector = window.M.FormSelect.init(this.$refs.selector);
      window.M.updateTextFields();
    }, 0);
    if (this.categories.length) this.current = this.categories[0].id;
  },
  unmounted() {
    if (this.selector && this.selector.destroy) this.selector.destroy();
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amountStart;
    },
  },
  methods: {
    async onSubmit({}, { resetForm }) {
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.current,
            amount: this.amountStart,
            description: this.descriptionStart,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === "outcome"
              ? this.info.bill - this.amountStart
              : this.info.bill + this.amountStart;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись успешно создана");
          this.amountStart = 1;
          this.descriptionStart = "";
          resetForm();
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amountStart - this.info.bill})`
        );
      }
    },
  },
};
</script>
