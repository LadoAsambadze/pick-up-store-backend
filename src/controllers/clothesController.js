import { productsData } from "../models/products.js";

const productsInfo = async (req, res) => {
  try {
    const products = await productsData.find();
    res.status(200).json({ message: "Fetched well", products });
  } catch (error) {
    console.log(error, "error its");
  }
};

export default productsInfo;
