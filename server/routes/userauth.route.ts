import express,{Response,Request} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express.Router();

app.post('/',async (req:Request,res:Response)=>{
    try{
        const {username,password}:{username:string,password:string} = req.body;
        
        const token:string = req.cookies.jwt;
        if (!token) throw new Error("user not found");
        const tokenpayload = await jwt.decode(token) as JwtPayload;
        
        if (tokenpayload.username !== username || tokenpayload.password!==password) throw new Error("user is not available");
        res.status(200).json({msg: "user authenticated"});
    }catch(err){
        res.status(404).json({msg: `${err}`});
    }
})

export default app;