"use client";

import { useFormState } from "react-dom";
import { loginUser } from "@/app/utils/actions/authactions";
import { redirect } from "next/navigation";

export default function LoginForm(){
  const formState = {};
  const [state,dispatch] = useFormState(loginUser,formState);
  if(state?.success == true){
    if(state.usertype=="User"){
      redirect("/dashboard?usertype=User");
    }else{
      redirect("/dashboard?usertype=Admin");
    }
  }
  return (
    <form className="mx-16" action={dispatch}>
      {
        (!state?.success) && (
          <div className="my-4">
            <p className="text-sm text-red-700">{state?.message}</p>
          </div>
        )
      }
      <div className="flex flex-col mb-4">
        <label>Email</label>
        <input type="email" name="email" className="p-2 rounded-md" required/>
      </div>
      <div className="flex flex-col mb-4">
        <label>Password</label>
        <input type="password" name="password" className="p-2 rounded-md" required/>
      </div>
      <div className="mb-4 text-center">
        <button type="submit" className="p-2 bg-cyan-300 rounded-md w-48">Submit</button>
      </div>
    </form>
  );
}
