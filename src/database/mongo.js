import mongoose from "mongoose";

const connect = () => {
  const url =
    "mongodb+srv://ladoasambadze1:Zukara123@cluster0.3zam6v5.mongodb.net";

  try {
    mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
