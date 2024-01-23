import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
  FormHelperText,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from '../../redux/productActions';

const AddProduct = ({ initialValues }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(
    initialValues || { name: '', price: '', category: '', description: '' }
  );

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = '';

    if (name === 'name') {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        error = 'Product Name should contain only letters and spaces.';
      } else if (
        products.some(
          (product) => product.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        error = 'Product Name already exists.';
      }
    } else if (name === 'price') {
      if (!value.match(/^\d+$/)) {
        error = 'Product Price should be a positive integer.';
      }
    }

    setErrors({ ...errors, [name]: error });
    setProduct({ ...product, [name]: value });
  };

  const dispatch = useDispatch();
  const Allproducts = useSelector((state) => state.products);

  useEffect(() => {
    setProducts(Allproducts);
  }, [Allproducts]);

  console.log(products, 'productsproductsproducts', Allproducts, products);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameError = product.name.trim() === '' ? 'Name is required' : '';
    const priceError = product.price.trim() === '' ? 'Price is required' : '';
    const categoryError =
      product.category.trim() === '' ? 'Category is required.' : '';
    const descriptionError =
      product.description.trim() === '' ? 'Description is required.' : '';

    setErrors({
      ...errors,
      name: nameError,
      price: priceError,
      category: categoryError,
      description: descriptionError,
    });

    if (nameError || priceError || categoryError || descriptionError) {
      return;
    }

    try {
      const data = await dispatch(createProductAction(product));
      console.log(data, 'dataaaaaaaaaa');
    } catch (error) {
      console.log(error, 'error');
      // console.log('eeor');
    }

    setProduct({ name: '', price: '', category: '', description: '' });
    setErrors({ name: '', price: '', category: '', description: '' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: '3rem' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              value={product.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
            />
            <FormHelperText error={Boolean(errors.name)}>
              {errors.name}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label="Product Price"
              name="price"
              fullWidth
              value={product.price}
              onChange={handleChange}
              type="number"
              error={Boolean(errors.price)}
            />
            <FormHelperText error={Boolean(errors.price)}>
              {errors.price}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth error={Boolean(errors.category)}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="Shoes">Shoes</MenuItem>
                <MenuItem value="Jewelry">Jewelry</MenuItem>
              </Select>
              <FormHelperText error={Boolean(errors.category)}>
                {errors.category}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={product.description}
              onChange={handleChange}
              multiline
              error={Boolean(errors.description)}
            />
            <FormHelperText error={Boolean(errors.description)}>
              {errors.description}
            </FormHelperText>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button type="submit" variant="contained" color="primary">
              Save Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProduct;
