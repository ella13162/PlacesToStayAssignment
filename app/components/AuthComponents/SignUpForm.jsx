"use client";

import { useFormState } from "react-dom";
import { createUser } from "@/app/utils/actions/authactions";
import { redirect } from "next/navigation";

export default function SignUpForm(){
  const formState = {};
  const [state,dispatch] = useFormState(createUser,formState);
  if(state?.success == true){
    redirect("/login");
  }
  return (
    <form className="mx-16" action={dispatch}>
      {
        (state?.success) ? (
          <div className="my-4">
            <p className="text-sm text-green-700">{state?.message}</p>
          </div>
        ) : (
          <div className="my-4">
            <p className="text-sm text-red-700">{state?.message}</p>
          </div>
        )
      }
      <div className="flex flex-col mb-4">
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="mb-4 text-center">
        <button type="submit" className="p-2 bg-cyan-300 rounded-md w-48">Submit</button>
      </div>
    </form>
  );
}
