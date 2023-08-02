import { productsData } from "../models/products.js";

const productInfo = async (req, res) => {
  try {
    const products = await productsData.find();
    res.status(200).json({ message: "Fetched well", products });
  } catch (error) {
    console.log(error, "error its");
  }
};

export default productInfo;
