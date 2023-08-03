import { shoesData } from "../models/shoes.js";

const shoesInfo = async (req, res) => {
  try {
    const shoes = await shoesData.find();
    res.status(200).json({ message: "Fetched well", shoes });
  } catch (error) {
    console.log(error, "error its");
  }
};

export default shoesInfo;
