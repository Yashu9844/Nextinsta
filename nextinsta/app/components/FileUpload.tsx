"use client";
import React, { useRef, useState } from "react";
import { ImageKitProvider,  IKUpload } from "imagekitio-next";


import {Loader2} from 'lucide-react'
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";



interface FileUploadProps{
    onSuccess:(res:IKUploadResponse)=>void;
    onProgress?:(progress :number)=>void;
    fileType?:'image'| 'video'
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;




export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = 'image',
  }: FileUploadProps
) {



    const [uploading , setUploding] = useState(false);
    const [error , setError] = useState<String | null>(null)

  const onError = (err : {message:string}) => {
    console.log("Error", err );
    setError(err.message);
    setUploding(false);
  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setUploding(false);
    setError(null);
    onSuccess(res);
  };
  
  const handleUpload = () => {
    console.log("Progress");
    setUploding(true);
    setError(null);
  };
  
  const handleUploadStart = (evt: ProgressEvent<EventTarget>) => {
    if ("lengthComputable" in evt) {
      const progress = (evt.loaded / evt.total) * 100;
      onProgress?.(Math.round(progress));
    }
  };
  

const validateFile = (file:File) =>{

    if(fileType === 'video'){
        if(!file.type.startsWith("video/")){
            setError("Please uplaod a video file");
            return false;
        }
        if(file.size > 100 * 1024 * 1024){
            setError("File size should be less than 100MB");
            return false;
        }
    }else{
    const validTypes = ["image/jpeg", "image/png", "image/jpg","image/webg"];

    if(!validTypes.includes(file.type)){
        setError("Please uplaod a image file");
        return false;

    }
    if(file.size > 5 * 1024 * 1024){
        setError("File size should be less than 5MB");
        return false;
    }



}
return false
}

  return (
    <div className="space-y-2">
    
        <IKUpload
          fileName={fileType === "video" ? "video.mp4" : "image.jpg"}
        
          useUniqueFileName={true}
         
          validateFile={validateFile}
         
        
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleUploadStart}
          onUploadStart={handleUpload}
          folder={fileType == 'video' ? '/videdoes' :'/images'}
         
        />
      
    </div>
  );
}