module.exports = {
    extends: ['@vp/eslint-config-om-react/typescript'],
    globals: {
      // we can use types like JSX.Element without upsetting eslint
      JSX: true
    }
  };