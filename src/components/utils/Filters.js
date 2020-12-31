export default {
  install: (app, options) => {
    app.config.globalProperties.$message = function(html) {
      M.toast({ html });
    };
    app.config.globalProperties.$error = function(html) {
      window.M.toast({ html: `Error: ${html}` });
    };
    app.config.globalProperties.$filters = function(value, currency = "RUB") {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency,
      }).format(value);
    };
    app.config.globalProperties.$date = function(value, format = "date") {
      const options = {};
      if (format.includes("date")) {
        options.day = "2-digit";
        options.month = "long";
        options.year = "numeric";
      }
      if (format.includes("time")) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    };
  },
};
