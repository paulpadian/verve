'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {});
  blog.associate = function(models) {
    models.blog.belongsToMany(models.favorite, {through: 'blogsFavorites'})
    models.blog.hasMany(models.comment)
  };
  return blog;
};