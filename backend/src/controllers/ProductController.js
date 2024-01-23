const ProductModel = require('../models/ProductModel');
const { productSchema } = require('../validations/validation');

const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let unique = await ProductModel.find({ name: req.body.name });
    if (unique) {
      return res.status(400).send({ message: 'please provide unique name' });
    }

    let product = await ProductModel.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     // const { error } = productSchema.validate(req.body);
//     // if (error) return res.status(400).send(error.details[0].message);
//     console.log(req.body);

//     const product = await ProductModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     console.log(product, 'update');
//     if (!product) return res.status(404).send('Product not found.');

//     res.status(200).send(product);
//   } catch (err) {
//     return res.status(500).send({ error: err.message });
//   }
// };
const updateProduct = async (req, res) => {
  try {
    const updateFields = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found.');
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found.');

    res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
