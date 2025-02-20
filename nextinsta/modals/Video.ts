import mongoose, { model, models }  from "mongoose";
import { headers } from "next/headers";



export const VIDEO_DIMENSION={
    width:1080,
    height:1920
}


export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    createdAt?: Date;
    updatedAt?: Date;
    controls?:boolean;
transforamtion:{
    height:number;
    width:number;
    quality:number;
}
}

const VideoSchema = new mongoose.Schema<IVideo>({
     title:{
        type:String,
        required:true
     },
        description:{
            type:String,
            required:true
        },
        videoUrl:{
            type:String,
            required:true
        },
        thumbnailUrl:{
            type:String,
            required:true
        },
        controls:{
            type:Boolean,
            default:true
        },
        transforamtion:{
            height:{
                type:Number,
                default:VIDEO_DIMENSION.height},
            width:{
                type:Number,
               default:VIDEO_DIMENSION.width
            },
            quality:{


                type:Number,
               min:1,
                max:100,
            },
        }}

,{timestamps:true})


const Video = models.Video || model<IVideo>("Video",VideoSchema);

export default Video;