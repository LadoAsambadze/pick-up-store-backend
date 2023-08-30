import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin user",
    email: "lado@mail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jeka",
    email: "jeka@mail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "boby",
    email: "boby@mail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
