import { clothesData } from "../models/clothes.js";

const clothesInfo = async (req, res) => {
  try {
    const clothes = await clothesData.find();
    res.status(200).json({ message: "Fetched well", clothes });
  } catch (error) {
    console.log(error, "error its");
  }
};

export default clothesInfo;
