


import { connectToDB } from "@/lib/db"
import User from "@/modals/User"
import {NextRequest, NextResponse} from "next/server"

export async function POST(req:NextRequest){

  try {
    const {email , password} = await req.json()

    if(!email || !password){
        return NextResponse.json({
            message:"Please enter all fields"
        },{status:400})
    
    }

   const db=  await connectToDB();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return NextResponse.json({
            message:"User already exists"
        },{status:400})
    }

    const user = new User({
        email,
        password
    })

    await user.save();

    return NextResponse.json({
        message:"User created successfully"
    },
{status:200});
    
  } catch (error) {
    return NextResponse.json({
       error:  "Something went wrong"
    },{status:500})

  }
}