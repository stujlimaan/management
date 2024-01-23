import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  deleteProductAction,
  updateProductAction,
} from '../../redux/productActions';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  InputLabel,
  TableRow,
  IconButton,
  Button,
  Container,
  Paper,
  Modal,
  Typography,
  MenuItem,
  Select,
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ListProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   dispatch(deleteProductAction(id));
  // };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductAction(id));
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseEdit = () => {
    let id = selectedProduct['_id'];
    console.log(id, product, 'pro');
    dispatch(updateProductAction({ id: id, product: product }));
    dispatch(fetchProducts());
    setProduct({
      name: '',
      price: '',
      category: '',
      description: '',
    });
    setSelectedProduct({
      name: '',
      price: '',
      category: '',
      description: '',
    });

    setOpen(false);
    setSelectedProduct(null);
  };
  const products = useSelector((state) => state.products);
  return (
    <Container maxWidth="md" style={{ marginTop: '1rem' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product['_id'])}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProduct && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              Edit Product
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                sx={{ mt: 2 }}
              >
                <CloseIcon />
              </Button>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                label="Name"
                name="name"
                defaultValue={selectedProduct.name}
                fullWidth
                sx={{ my: 2 }}
                onChange={handleChange}
              />
              <TextField
                label="Price"
                name="price"
                defaultValue={selectedProduct.price}
                fullWidth
                type="number"
                sx={{ my: 2 }}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Clothes">Clothes</MenuItem>
                  <MenuItem value="Shoes">Shoes</MenuItem>
                  <MenuItem value="Jewelry">Jewelry</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                name="description"
                defaultValue={selectedProduct.description}
                fullWidth
                sx={{ my: 2 }}
                onChange={handleChange}
              />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseEdit}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default ListProduct;
