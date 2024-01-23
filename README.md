# Product Management System

## Overview
This Product Management System is a web application that allows users to manage products. It supports operations like creating, viewing, updating, and deleting products. Each product includes a name, price, category, and description. The system ensures unique product names with case-insensitive checks and includes validations on both the frontend and backend.

## Technologies Used
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Frontend:** React.js

## Getting Started

### Backend Setup

#### Prerequisites
- Node.js
- MongoDB

#### Installation
1. Clone the backend repository: `git clone <backend-repo-url>`
2. Navigate to the backend directory: `cd path_to_backend`
3. Install dependencies: `npm install`

#### Running the Server
- Start the server: `npm start`
- The server will run on `http://localhost:5000`

### Frontend Setup

#### Prerequisites
- Node.js

#### Installation
1. Clone the frontend repository: `git clone <frontend-repo-url>`
2. Navigate to the frontend directory: `cd path_to_frontend`
3. Install dependencies: `npm install`

#### Running the Application
- Start the application: `npm start`
- The application will run on `http://localhost:3000`

## API Endpoints

- **Create Product**: `POST /api/products`
- **Get All Products**: `GET /api/products`
- **Update Product**: `PUT /api/products/:id`
- **Delete Product**: `DELETE /api/products/:id`

## Frontend Features

- **List Products**: View all products.
- **Add Product**: Interface to add a new product.
- **Edit Product**: Option to update a product's details.
- **Delete Product**: Option to delete a product.

## Validations

- **Backend**:
  - Product name is unique (case-insensitive).
  - Price is an integer.
  - Category is one of the predefined options.
  - Description is a string.

- **Frontend**:
  - Form validations corresponding to the backend.

## Notes

- Ensure MongoDB is running before starting the backend.
- The frontend interacts with the backend API for all operations.

---

Replace `<backend-repo-url>` and `<frontend-repo-url>` with the actual URLs of your repositories. Adapt the instructions and details as needed to match the specifics of your project.
