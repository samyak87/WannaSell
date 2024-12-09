import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }

    // checking if the user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send({
        success: true,
        message: "user already exists, please login",
      });
    }

    // registering new user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user successfully regsitered",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};
