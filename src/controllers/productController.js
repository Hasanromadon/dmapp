const {
  product_reviews,
  products,
  categories,
  users,
  product_categories,
} = require('../../models');
const {
  handleErrorSever,
  handleErrorValidate,
} = require('../utils/handleError');

const Joi = require('joi');
const { Op, literal } = require('sequelize');
exports.getProducts = async (req, res) => {
  const { page, size } = req.pagination;
  console.log('CATEGORY ======> ', req.query.category);

  let category = [];

  if (req.query.category) {
    category = req.query?.category.map((cat) => +cat);
  }
  console.log('CATEGORY ======> ', category);

  try {
    console.log(req.query.name);
    let rawProductsData;

    if (category.length === 0) {
      rawProductsData = await products.findAndCountAll({
        include: [
          {
            model: categories,
            as: 'categories',
            attributes: ['name'],
            where: {
              id: {
                [Op.like]: `%${req.query.category || ''}%`,
              },
            },
            require: true,
            through: {
              model: product_categories,
              as: 'bridge',
              attributes: [],
            },
          },
          {
            model: product_reviews,
            as: 'reviews',
            attributes: ['rating'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          name: {
            [Op.like]: `%${req.query.name || ''}%`,
          },
          price: {
            [Op.and]: {
              [Op.gte]: req.query.minPrice || 0,
              [Op.lte]: req.query.maxPrice || 1000000000,
            },
          },
        },
        limit: size,
        offset: page * size,
        order: [['id', 'DESC']],
      });
    } else {
      rawProductsData = await products.findAndCountAll({
        include: [
          {
            model: categories,
            as: 'categories',
            attributes: ['name'],
            where: {
              id: {
                [Op.in]: category,
              },
            },
            require: true,
            through: {
              model: product_categories,
              as: 'bridge',
              attributes: [],
            },
          },
          {
            model: product_reviews,
            as: 'reviews',
            attributes: ['rating'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          name: {
            [Op.like]: `%${req.query.name || ''}%`,
          },
          price: {
            [Op.and]: {
              [Op.gte]: req.query.minPrice || 0,
              [Op.lte]: req.query.maxPrice || 1000000000,
            },
          },
        },
        limit: size,
        offset: page * size,
        order: [['id', 'DESC']],
      });
    }

    let productsData = rawProductsData.rows.map((item) => {
      item.image = `${process.env.PATH_FILE}/products/${item.image}`;
      return item;
    });

    res.status(200).send({
      status: 'success',
      data: productsData,
      totalPages: Math.ceil(rawProductsData.count / Number.parseInt(size)),
    });
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let productData = await products.findOne({
      where: {
        id,
      },
      include: [
        {
          model: product_reviews,
          as: 'reviews',
          include: [
            {
              model: users,
              as: 'user',
              attributes: ['name'],
            },
          ],
          attributes: {
            exclude: ['updatedAt', 'id_user', 'id_product'],
          },
        },
        {
          model: categories,
          as: 'categories',
          attributes: ['id', 'name'],
          through: {
            model: product_categories,
            as: 'bridge',
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_user'],
      },
    });
    if (productData !== null) {
      productData.image = `${process.env.PATH_FILE}/products/${productData.image}`;
      res.status(200).send({
        status: 'success',
        data: productData,
      });
    } else {
      res.status(404).send({
        status: 'success',
        message: 'product not found',
      });
    }
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    const image = req.file.filename;
    const { id } = req.user;
    data.id_user = id;
    data.image = image;

    if (req.body.categories) {
      req.body.categories = req.body.categories.split(',');
    }
    const schema = Joi.object({
      name: Joi.string().min(5).max(200).required(),
      desc: Joi.string().min(20).max(1200).required(),
      price: Joi.number().required(),
      qty: Joi.number().min(1).required(),
      image: Joi.string().required(),
      categories: Joi.array().required(),
      id_user: Joi.required(),
    });

    const { error } = schema.validate(data);
    if (error) return handleErrorValidate(error, res);

    const dataproduct = await products.create(req.body);

    if (req.body && req.body.categories) {
      let categoriesRaw = req.body.categories.map((category) => ({
        id_product: dataproduct.id,
        id_category: parseInt(category),
      }));
      const categories = await product_categories.bulkCreate(categoriesRaw);
      dataproduct.categories = categories;
    }

    res.status(200).send({
      status: 'success',
      data: dataproduct,
    });
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  let data = req.body;
  const filename = req.file && req.file.filename ? req.file.filename : '';
  data.id_user = req.user.id;
  req.body.categories = req.body.categories.split(',');
  if (filename !== '') {
    data.image = filename;
  }

  const schema = Joi.object({
    name: Joi.string().min(5).max(200),
    desc: Joi.string().min(5).max(1200),
    price: Joi.number(),
    image: Joi.string(),
    categories: Joi.array(),
    qty: Joi.number(),
    id_user: Joi.required(),
  });
  const { error } = schema.validate(data);
  if (error) return handleErrorValidate(error, res);

  try {
    await products.update(req.body, {
      where: {
        id,
      },
    });

    if (req.body && req.body.categories) {
      await product_categories.destroy({
        where: {
          id_product: id,
        },
      });

      let categoriesRaw = req.body.categories.map((category) => ({
        id_product: id,
        id_category: parseInt(category),
      }));
      await product_categories.bulkCreate(categoriesRaw);
    }

    res.status(200).send({
      status: 'success',
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await products.destroy({
      where: {
        id,
      },
    });

    await product_categories.destroy({
      where: {
        id_product: id,
      },
    });

    res.status(200).json({
      status: `success delete product : ${id}`,
    });
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};

exports.addProductCategory = async (req, res) => {
  const { id } = req.params;
  let product = req.body;
  product.id_product = id;

  const schema = Joi.object({
    id_product: Joi.number().required(),
    id_category: Joi.number().required(),
  });
  const { error } = schema.validate(product);
  if (error) return handleErrorValidate(error, res);

  try {
    const data = await product_categories.create(product);

    res.status(200).send({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    handleErrorSever(res);
  }
};
