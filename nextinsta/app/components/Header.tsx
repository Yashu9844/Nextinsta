"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
 
     const {data :session}= useSession();

     const handleSignOut = async ()=>{

        await signOut();
     }


  return (
    <div>
      {
        session? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
        <div className="">
             <Link href={"/signin"}>Login </Link>
             <Link href={"/register"}>register </Link>
        </div>
        )

       
      }
    </div>
  );
};

export default Header;