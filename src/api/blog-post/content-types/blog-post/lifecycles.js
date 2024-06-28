module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.Featured) {
      const featuredPosts = await strapi.entityService.findMany(
        "api::blog-post.blog-post",
        {
          filters: { Featured: true },
        }
      );

      await Promise.all(
        featuredPosts.map((post) =>
          strapi.entityService.update("api::blog-post.blog-post", post.id, {
            data: { Featured: false },
          })
        )
      );
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.Featured) {
      const featuredPosts = await strapi.entityService.findMany(
        "api::blog-post.blog-post",
        {
          filters: {
            $and: [{ id: { $ne: where.id } }, { Featured: true }],
          },
        }
      );

      await Promise.all(
        featuredPosts.map((post) =>
          strapi.entityService.update("api::blog-post.blog-post", post.id, {
            data: { Featured: false },
          })
        )
      );
    }
  },
};
