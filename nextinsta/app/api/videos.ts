import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/db";
import Video, { IVideo } from "@/modals/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){

  try {
    await connectToDB();

    const videos =  await Video.find({}).sort({createdAt: -1}).lean();
 
    if(!videos || videos.length ===0){
     return NextResponse.json(
         {message:"No videos found"},
         {status:404}
     )
    }
 
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({
        error: "Failed to fetch videos"
    },
{status:500})
  }
}


export async function POST(req:NextRequest){
  try {
    
    const session = await getServerSession(authOptions);

if(!session){
    return NextResponse.json({
        error: "You need to be signed in to upload a video"},
        {status:401})
}

await connectToDB();


      const body:IVideo =await req.json()
      
 if(!body.title ||!body.description ||!body.videoUrl ||!body.thumbnailUrl){
        return NextResponse.json({
            message:"Please provide all required fields"
        },{status:400})
    }

 const videoData = {
    ...body,
    controls:body.controls ?? true,
    transformation: {
        height:1920,
        width:1080,
        quality:body.transforamtion?.quality ?? 100
    }
 }

     const res=  await Video.create(videoData);

 return NextResponse.json(res);




  } catch (error) {
    return NextResponse.json({
        error: "Failed to create videos"
    },
{status:500})
  }
  }




