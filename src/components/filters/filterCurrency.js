export default {
  install: (app, options) => {
    app.config.globalProperties.$filters = function(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
      }).format(value)}
  },
};
