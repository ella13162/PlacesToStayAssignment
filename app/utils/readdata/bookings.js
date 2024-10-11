"use server";
import { db } from "@/app/utils/firebase";
import { collection,getDocs,getDoc,where,query, doc} from "firebase/firestore";

export async function getAllBookingsByUser(userId){
  const snapshot = await getDocs(query(collection(db,"bookings"),where("user.userId","==",userId)));
  let bookings = [];
  snapshot.forEach((booking) => {
    bookings.push({
      id:booking.id,
      ...booking.data()
    })
  })
  return bookings;
}

export async function getAllBookings(){
  const snapshot = await getDocs(collection(db,"bookings"));
  let bookings = [];
  snapshot.forEach((booking) => {
    bookings.push({
      id:booking.id,
      ...booking.data()
    })
  })
  return bookings;
}

export async function getBookingById(bookingId){
  const booking = await getDoc(doc(db,"bookings", bookingId));
  return {
    id : bookingId,
    ...booking.data()
  }
}
