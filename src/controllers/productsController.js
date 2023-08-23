import { productsData } from "../models/products.js";

const productsInfo = async (_, res) => {
  try {
    const products = await productsData.find();
    res.status(200).json({ message: "Fetched successfully", products });
  } catch (error) {
    console.log(error, "Failed fetch products");
  }
};

export default productsInfo;
