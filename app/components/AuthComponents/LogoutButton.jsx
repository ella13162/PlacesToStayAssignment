"use client";
import { logoutUser } from "@/app/utils/actions/authactions";

export default function LogoutButton(){
  return (
    <button
      className="text-lg text-white bg-cyan-300 p-2 rounded-md hover:text-black"
      onClick={async () => {
        await logoutUser();
      }}
    >
      Logout
    </button>
  );
}
