// // import React, { useEffect, useState } from 'react';
// // import { getProducts, deleteProduct } from '../../apiService/api';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   IconButton,
// //   Button,
// //   Container,
// //   Paper,
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';

// // const ListProduct = () => {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const fetchProducts = async () => {
// //     const response = await getProducts();
// //     setProducts(response.data);
// //   };

// //   const handleDelete = async (id) => {
// //     await deleteProduct(id);
// //     fetchProducts(); // Refresh the list
// //   };

// //   return (
// //     <Container maxWidth="md">
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Name</TableCell>
// //               <TableCell>Price</TableCell>
// //               <TableCell>Category</TableCell>
// //               <TableCell>Action</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {products.map((product) => (
// //               <TableRow key={product.id}>
// //                 <TableCell>{product.name}</TableCell>
// //                 <TableCell>{product.price}</TableCell>
// //                 <TableCell>{product.category}</TableCell>
// //                 <TableCell>
// //                   <IconButton onClick={() => handleDelete(product.id)}>
// //                     <DeleteIcon />
// //                   </IconButton>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <Button variant="contained" color="primary" sx={{ mt: '2rem' }}>
// //         Add Product
// //       </Button>
// //     </Container>
// //   );
// // };

// // export default ListProduct;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts, deleteProductAction } from '../../redux/productActions';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Container,
//   Paper,
//   Modal,
//   Typography,
//   Box
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

// const ListProduct = () => {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);
//   console.log(products, 'products');

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     console.log(id, 'id');
//     dispatch(deleteProductAction(id));
//   };

//   const handleEdit = (id) => {
//     setOpen(true);
//     // dispatch(openEditModal(id)); // Dispatch an action to open an edit modal or navigate to an edit page
//   };

//   return (
//     <Container maxWidth="md">
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product['_id']}>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(product['_id'])}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(product['_id'])}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button variant="contained" color="primary" sx={{ mt: '2rem' }}>
//         Add Product
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default ListProduct;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProductAction } from '../../redux/productActions';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Container,
  Paper,
  Modal,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProductAction(id));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product['_id']}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
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
      <Button variant="contained" color="primary" sx={{ mt: '2rem' }}>
        Add Product
      </Button>
      {selectedProduct && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Product
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* Render your edit form here for the selectedProduct */}
              {/* For example: */}
              <TextField
                label="Product Name"
                defaultValue={selectedProduct.name}
                fullWidth
                sx={{ my: 2 }}
              />
              <TextField
                label="Product Price"
                defaultValue={selectedProduct.price}
                fullWidth
                type="number"
                sx={{ my: 2 }}
              />
              <TextField
                label="Product Category"
                defaultValue={selectedProduct.category}
                fullWidth
                sx={{ my: 2 }}
              />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
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
