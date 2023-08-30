import dotenv from "dotenv";
import users from "./data/users.js";
import colors from "colors";
import products from "./data/product.js";
import userModel from "./models/user.js";
import { productsData } from "./models/products.js";
import { cartProduct } from "./models/cart.js";
import connect from "./database/mongo.js";

dotenv.config();
connect();

const importData = async () => {
  try {
    await cartProduct.deleteMany();
    await productsData.deleteMany();
    await userModel.deleteMany();
    const createdUsers = await userModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await productsData.insertMany(sampleProducts);
    console.log("data improted.".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const desrtoyData = async () => {
  try {
    await cartProduct.deleteMany();
    await userModel.deleteMany();
    await productsData.deleteMany();
    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  desrtoyData();
} else {
  importData();
}
