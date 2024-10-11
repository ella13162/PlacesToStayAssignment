"use server";

import { db } from "@/app/utils/firebase";
import { doc,collection,addDoc,deleteDoc,setDoc} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewPlace(formState,formData){
  const name = formData.get("name");
  const type = formData.get("type");
  const city = formData.get("city");
  const address = formData.get("address");
  const capacity = Number(formData.get("capacity"));
  const guests = Number(formData.get("guests"));
  const price = Number(formData.get("price"));
  if(
      !(name.trim() && city.trim() && address.trim() && capacity>0 && guests>0 && price>0)
  ){
    return {
      ...formState,
      success : false,
      message : "Please input valid data"
    }
  }
  try{
    await addDoc(collection(db,"places"),{
      name,
      type,
      city:city.trim().toUpperCase(),
      address,
      capacity,
      "2024-08-01":0,
      "2024-08-02":0,
      "2024-08-03":0,
      guests,
      price
    });
    return {
      ...formState,
      success : true,
      message : "New Place Added"
    }
  }catch(err){
    console.log(err);
  }
}

export async function editPlace(formState,formData){
  const name = formData.get("name");
  const type = formData.get("type");
  const placeId = formData.get("id");
  const city = formData.get("city");
  const address = formData.get("address");
  const capacity = Number(formData.get("capacity"));
  const guests = Number(formData.get("guests"));
  const price = Number(formData.get("price"));
  if(
      !(name.trim() && city.trim() && address.trim() && capacity>0 && guests>0 && price>0)
  ){
    return {
      ...formState,
      success : false,
      message : "Please input valid data"
    }
  }
  try{
    await setDoc(doc(db,"places",placeId),{
      name,
      type,
      city:city.trim().toUpperCase(),
      address,
      capacity,
      guests,
      price
    },{merge:true});
    return {
      ...formState,
      success : true,
      message : "Place Edited"
    }
  }catch(err){
    console.log(err);
  }
}

export async function deletePlaceById(placeId){
  try{
    await deleteDoc(doc(db,"places",placeId));
  }catch(err){
    console.log(err);
  }
  revalidatePath("/dashboard/admin/places");
  redirect("/dashboard/admin/places");
}
