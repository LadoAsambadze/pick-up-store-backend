import { ShoesData } from "../models/shoes.js";

const getShoesInfo = async (req, res) => {
  try {
    const shoes = await ShoesData.find();
    res.status(200).json({ message: "Fetched well", shoes });
  } catch (error) {
    console.log(error, "error its");
  }
};

export default getShoesInfo;
