const validationRules = {
  url: {
    validate: (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    },
    errorMessage: '不正な画像URLです。'
  },
  color: {
    validate: (color) => /^#[0-9A-F]{6}$/i.test(color),
    errorMessage: '不正なカラーコードです。'
  },
  gradient: {
    validate: (gradient) => /^linear-gradient\((.+)\)$/i.test(gradient),
    errorMessage: '不正なグラディエントです。'
  }
};

export default validationRules;
