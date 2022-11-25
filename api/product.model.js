const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: String,
});

const Product = mongoose.model("Product", ProductSchema);
