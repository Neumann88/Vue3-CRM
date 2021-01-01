<template>
  <ul class="sidenav app-sidenav" :class="{ open: isActive }">
    <li>
      <router-link active-class="active" to="/" exact>
        {{ this.$locale("Menu_Bill") }}
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/history">
        {{ this.$locale("Menu_History") }}
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/planning">
        {{ this.$locale("Menu_Planning") }}
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/record">
        {{ this.$locale("Menu_NewRecord") }}
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/categories">
        {{ this.$locale("Menu_Categories") }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["isActive"],
  name: "Sidebar",
};
</script>
