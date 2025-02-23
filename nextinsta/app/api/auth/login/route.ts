import { connectToDB } from "@/lib/db";
import User from "@/modals/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
  
    try {
        
         await connectToDB();

        const body =  await req.json();
  

        const {email , password} = body;

        if(!email || !password){
            return NextResponse.json({
                message:"Please enter all fields"
            },{status:400})
        
        }

              const user = await User.findOne({email});
              if (!user || !user.password) {
                return NextResponse.json({ message: "User not found or missing password" }, { status: 404 });
            }


            const userPassword =   await bcrypt.compare(password , user.password);

            if(!userPassword){
                return NextResponse.json({
                    message:"Invalid credentials"
                },{status:401})
            }

            const {password:pass , ...rest} = user.toObject();

            return NextResponse.json(rest , {status:200} )
        


    } catch (error) {
        

        return NextResponse.json({
            error: "Something went wrong"
        },{status:500})
    }





}