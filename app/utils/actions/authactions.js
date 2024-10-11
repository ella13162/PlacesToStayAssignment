"use server";
import { db } from "@/app/utils/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export async function createUser(formState, formData){
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  const address = formData.get("address");
  const dob = formData.get("dob");
  if(!(firstname.trim() && lastname.trim() && email.trim() && password.trim() && address.trim() && dob.trim())){
    return {
      ...formState,
      success : false,
      message : "Enter Valid Data"
    }
  }
  try{
    const alreadyUser = await getDocs(
      query(
        collection(db,"users"),
        where("email","==",email)
      )
    );
    if(alreadyUser.size){
      return {
        ...formState,
        success : false,
        message : "User with this email address already exists"
      }
    }else{
      await addDoc(collection(db,"users"),{
        firstname,
        lastname,
        email,
        password,
        address,
        dob,
        usertype : "User"
      });
      return {
        ...formState,
        success : true,
        message : "New User Account Created! Try to Log In"
      }
    }
  }catch(err){
    console.log(err);
  }
}


export async function loginUser(formState,formData){
  const email = formData.get("email");
  const password = formData.get("password");
  if(!(email.trim() && password.trim())){
    return {
      ...formState,
      success : false,
      message : "Enter Valid Data"
    }
  }
  try{
    const userSnapshot = await getDocs(
      query(
        collection(db,"users"),
        where("email","==",email),
        where("password","==",password)
      )
    );
    if(userSnapshot.size){
      let usrArray = [];
      userSnapshot.forEach((usr) => {
        usrArray.push({
          id:usr.id,
          ...usr.data()
        })
      })
      const user = usrArray[0];
      cookies().set("logged","true",{
        expires : (Date.now() + 6*60*60*1000)
      });
      cookies().set("usertype",user?.usertype,{
        expires : (Date.now() + 6*60*60*1000)
      });
      cookies().set("userId",user?.id,{
        expires : (Date.now() + 6*60*60*1000)
      });
      return {
        ...formState,
        success : true,
        usertype : user?.usertype
      }
    }else{
      return {
        ...formState,
        success : false,
        message : "Wrong Credentials"
      }
    }
  }catch(err){
    console.log(err);
  }
}


export async function logoutUser(){
  cookies().delete("logged");
  cookies().delete("usertype");
  cookies().delete("userId");
  redirect("/login");
}
