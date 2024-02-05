import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

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



router.get('/api/login',async(req:Request,res:Response)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
})



export { router as mainRoute };
