const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: String,
});

const Product = mongoose.model("Product", ProductSchema);
