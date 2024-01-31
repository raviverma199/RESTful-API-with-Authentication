import express from "express";
const router = express.Router();
import { Request,Response } from "express";


router.get('/',(req:Request,res:Response)=>{
    try {
        res.send('hello world')
    } catch (error) {
        console.log(error);
    }
})

export { router as mainRoute };
