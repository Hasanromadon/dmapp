'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_reviews.belongsTo(models.users, {
        as: 'user',
        foreignKey: {
          name: 'id_user',
        },
      });
      product_reviews.belongsTo(models.products, {
        as: 'product_detail',
        foreignKey: {
          name: 'id_user',
        },
      });
    }
  }
  product_reviews.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_transaction: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      review: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'product_reviews',
    }
  );
  return product_reviews;
};
