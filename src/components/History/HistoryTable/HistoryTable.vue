<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) of records" :key="rec.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ this.$filters(rec.amount) }}</td>
        <td>
          {{ this.$date(rec.date) }}
        </td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span
            :class="[rec.typeName]"
            class="white-text badge blue darken-4"
            >{{ rec.typeText }}</span
          >
        </td>
        <td>
          <button
            class="btn-small blue darken-1"
            @click="this.$router.push(`/detail-record/?id=${rec.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: ["records"],
};
</script>
