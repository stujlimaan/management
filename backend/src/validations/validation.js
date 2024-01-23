const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  price: Joi.number().integer().min(1).required(),
  category: Joi.string()
    .valid('Fashion', 'Clothes', 'Shoes', 'Jewelry')
    .required(),
  description: Joi.string().required(),
});

module.exports = {
  productSchema,
};
