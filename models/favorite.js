'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER,
    blogTitle: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  favorite.associate = function(models) {
    models.favorite.belongsToMany(models.user,  {through: 'usersFavorites'})
    models.favorite.belongsToMany(models.blog, {through: 'blogsFavorites'})
  };
  return favorite;
};