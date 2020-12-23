<template>
  <ul class="sidenav app-sidenav" :class="{ open: isActive }">
    <li>
      <router-link active-class="active" to="/" exact>
        Счет
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/history">
        История
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/planning">
        Планирование
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/record">
        Новая запись
      </router-link>
    </li>
    <li>
      <router-link active-class="active" to="/categories">
        Категории
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
