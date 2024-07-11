module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await next();
  };
};
