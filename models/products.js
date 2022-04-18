'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    // assosiate with users
    static associate(models) {
      products.belongsTo(models.users, {
        as: 'users',
        foreignKey: {
          name: 'id_user',
        },
      });

      // assosiate with categories
      products.belongsToMany(models.categories, {
        as: 'categories',
        through: {
          model: 'product_categories',
          as: 'bridge',
        },
        foreignKey: 'id_product',
      });

      products.hasMany(models.product_reviews, {
        as: 'reviews',
        foreignKey: {
          name: 'id_product',
        },
      });
    }
  }
  products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: DataTypes.STRING,
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'products',
    }
  );
  return products;
};
