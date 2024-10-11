"use server";
import { db } from "@/app/utils/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import {cookies} from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBookingById } from "@/app/utils/readdata/bookings";
import {getPlaceById} from "@/app/utils/readdata/places";

export async function createBooking(initialState,formData){
  const quantity = Number(formData.get("quantity"));
  const date = formData.get("date");
  const nights = Number(formData.get("nights"));
  const total = Number(formData.get("total"));
  const placeId = formData.get("placeId");
  const userId = cookies().get("userId")?.value;
  let startDate = new Date(date);
  let endDate = new Date(date);
  endDate.setDate(endDate.getDate() + nights - 1);
  if(startDate < new Date("2024-08-01") || endDate> new Date("2024-08-03")){
    return {
      ...initialState,
      error : true,
      message : "No Accommodation Available on this date range"
    }
  }
  try{
    let placeSnapshot = await getDoc(doc(db,"places",placeId));
    let userSnapshot = await getDoc(doc(db,"users",userId));
    let place = placeSnapshot.data();
    let user = userSnapshot.data();
    let dates = [];
    for(let i=0 ; i< nights ; i++){
      let tmpdate = new Date(date);
      tmpdate.setDate(tmpdate.getDate()+i);
      dates.push(tmpdate.toISOString().split("T")[0]);
      if(place.capacity - place[dates[i]] < quantity){
        return {
          ...initialState,
          error : true,
          message : `No Accommodation Possible on ${dates[i]}, Out of Capacity.`
        }
      }
    }
    let availability = {};
    dates?.map((dt) => {
      availability[dt] = place[dt] + quantity;
    })

    await setDoc(doc(db,"places",placeId),{
      ...availability
    },{merge:true});

    await addDoc(collection(db,"bookings"),{
      place:{
        placeId,
        name : place?.name
      },
      user:{
        userId,
        firstname : user?.firstname,
        lastname : user?.lastname
      },
      rooms:quantity,
      nights,
      date,
      total
    });

    return {
      ...initialState,
      success : true,
      message : `Booking Successful`
    }
  }catch(err){
    console.log(err);
  }
}


export async function editBooking(initialState,formData){
  const quantity = Number(formData.get("quantity"));
  const date = formData.get("date");
  const nights = Number(formData.get("nights"));
  const total = Number(formData.get("total"));
  const placeId = formData.get("placeId");
  const bookingId = formData.get("bookingId");
  let startDate = new Date(date);
  let endDate = new Date(date);
  endDate.setDate(endDate.getDate() + nights - 1);
  if(startDate < new Date("2024-08-01") || endDate> new Date("2024-08-03")){
    return {
      ...initialState,
      error : true,
      message : "No Accommodation Available on this date range"
    }
  }
  try{
    let placeSnapshot = await getDoc(doc(db,"places",placeId));
    let bookingSnapshot = await getDoc(doc(db,"bookings",bookingId));
    let place = placeSnapshot.data();
    let booking = bookingSnapshot.data();

    let dates = [];
    for(let i=0 ; i< nights ; i++){
      let tmpdate = new Date(date);
      tmpdate.setDate(tmpdate.getDate()+i);
      dates.push(tmpdate.toISOString().split("T")[0]);
      if(place.capacity - (place[dates[i]] - booking?.rooms ) < quantity){
        return {
          ...initialState,
          error : true,
          message : `No Accommodation Possible on ${dates[i]}, Out of Capacity.`
        }
      }
    }

    let prevDates = [];

    for(let i=0 ; i< booking?.nights ; i++){
      let tmpdate = new Date(booking?.date);
      tmpdate.setDate(tmpdate.getDate()+i);
      prevDates.push(tmpdate.toISOString().split("T")[0]);
    }

    let availability = {};

    prevDates?.map((dt) => {
      availability[dt] = place[dt] - booking?.rooms;
    })

    dates?.map((dt) => {
      if(prevDates.includes(dt)){
        availability[dt] = availability[dt] + quantity;
      }else{
        availability[dt] = place[dt] + quantity;
      }
    })

    await setDoc(doc(db,"places",placeId),{
      ...availability
    },{merge:true});

    await setDoc(doc(db,"bookings",bookingId),{
      rooms:quantity,
      nights,
      date,
      total
    },{merge:true});

    return {
      ...initialState,
      success : true,
      message : `Booking Edit Successful`
    }
  }catch(err){
    console.log(err);
  }
}


export async function deleteBooking(bookingId){
  const usertype = cookies().get("usertype")?.value;
  const userId = cookies().get("userId")?.value;
  try{
    let booking = await getBookingById(bookingId);
    let place = await getPlaceById(booking?.place?.placeId)
    if(usertype=="Admin" || (booking?.user?.userId === userId)){
      let dates = [];
      for(let i=0 ; i< booking?.nights ; i++){
        let tmpdate = new Date(booking?.date);
        tmpdate.setDate(tmpdate.getDate()+i);
        dates.push(tmpdate.toISOString().split("T")[0]);
      }
      let availability = {};
      dates?.map((dt) => {
        availability[dt] = place[dt] - booking?.rooms;
      })
      await setDoc(doc(db,"places",place?.id),{
        ...availability
      },{merge:true});
      await deleteDoc(doc(db,"bookings",bookingId));
    }
  }catch(err){
    console.log(err);
  }
  revalidatePath(`/dashboard/${usertype=="User"?"user":"admin"}/bookings`);
  redirect(`/dashboard/${usertype=="User"?"user":"admin"}/bookings`);
}
