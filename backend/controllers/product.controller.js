import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      success: false,
      message: "error occured while updating product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("problem in delete", error);
    res.status(500).json({ success: false, message: "problem in delete" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const productList = await Product.find({});
    res.status(200).json({ success: true, data: productList });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "not a valid Id or no product associated with this id",
    });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error occured while updating" });
  }
};
