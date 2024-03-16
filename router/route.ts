import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

router.get("/", (req: Request, res: Response) => {
  try {
    res.send("hello world");
  } catch (error) {
    console.log(error);
  }
});

// ================================  API FOR USER SIGNUP FOR THE FIRST TIME  ==============================================

const user_schema = new mongoose.Schema({
  First_Name: {
    type: String,
    required: true,
    default: "user first name",
  },
  Last_Name: {
    type: String,
    required: true,
    default: "user last name",
  },
  Email_Id: {
    type: String,
    required: true,
    unique: true,
  },
  Phone_No: {
    type: Number,
    unique: true,
  },
  City: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Pin_Code: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const User_Data = mongoose.model("User_Details", user_schema, "User_Details");

router.post("/api/User_Signup", async (req: Request, res: Response) => {
  try {
    let user_data = {
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email_Id: req.body.Email_Id,
      Phone_No: req.body.Phone_No,
      City: req.body.City,
      Address: req.body.Address,
      Pin_Code: req.body.Pin_Code,
      Password: req.body.Password,
    };

    let saltRound = 10;
    let hashedpassword = await bcrypt.hash(user_data.Password, saltRound);
    user_data.Password = hashedpassword;

    let store_data = await User_Data.create(user_data);

    if (res.statusCode === 200) {
      res.json({ msg: "data inster successfully" });
    } else {
      res.json({ msg: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

// ==============================  user get api  ==================================

router.get("/api/get_Data", async (req, res) => {
  try {
    let get_data = await User_Data.find().exec();

    if (res.statusCode === 200) {
      res.json({ msg: "success", data: get_data });
    } else {
      res.json({ msg: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
});

/**
 * 
 * 
// ====================================  Login API ==============================================
 * 
 * 
 */
router.post("/login_user", async (req, res) => {
  try {
    const { User_name, Password } = req.body;
    const user = await User_Data.findOne({ User_name });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }
    let Token_key = "Ravi#@#$#%^&*()";
    // Generate JWT token
    const token: String = jwt.sign(
      { user_id: user._id, user: user.First_Name },
      Token_key,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// // =====================================   middleware to verify the jsonwebtoken ===========================
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Token is missing" });
  }

  let key: string = "Ravi#$%$##$#";
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized: Invalid token" });
    }

    if(decoded){
    // req.user = decoded;
    next();
  }else{
    res.json({msg:"token is not reconize"})
  }
  });
};

// Route for fetching all users (admin access only)
// router.get("/users", verifyToken, (req: Request, res: Response) => {
//   if (req.user && req.user.role === "admin") {
//     res
//       .status(200)
//       .json({
//         status: "success",
//         message: "List of all users",
//         user: req.User,
//       });
//   } else {
//     res.status(403).json({
//       status: "error",
//       message: "Access denied. Insufficient privileges.",
//     });
//   }
// });





export { router as mainRoute };
