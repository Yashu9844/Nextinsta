
"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
 
     const [email , setEmail] = useState("")
     const [password , setPassword] = useState("")
     const [error , setError] = useState<String | null>()
const router = useRouter();
     
     
     const hadnleRegister = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            
const res = await fetch("/api/auth/register",{
    method:'POST',
    headers:{"Content-Type" : "application/json"},
    body:JSON.stringify({email,password})
})

  if(!res.ok){
    setError("Register failed")
  }


  const data = res.json()
router.push("/login")

        } catch (error) {
            setError("register failed")
        }
     }



  return (
    <div>
      Register
    </div>
  );
};

export default Register;