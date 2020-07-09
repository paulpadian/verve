'use strict';
module.exports = (sequelize, DataTypes) => {
  const blogsFavorites = sequelize.define('blogsFavorites', {
    blogId: DataTypes.INTEGER,
    favorite: DataTypes.INTEGER
  }, {});
  blogsFavorites.associate = function(models) {
    // associations can be defined here
  };
  return blogsFavorites;
};