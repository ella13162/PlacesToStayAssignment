"use client";
import { useState } from "react";
import { editBooking } from "@/app/utils/actions/bookingactions";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

export default function EditBookingForm({booking,place}){
  const [quantity,setQuantity] = useState(booking?.rooms);
  const [nights,setNights] = useState(booking?.nights);
  const [total,setTotal] = useState(booking?.total);
  const [date,setDate] = useState(booking?.date);
  const [state,dispatch] = useFormState(editBooking,{});
  if(state?.error && state.error==true){
    alert(state.message);
    state.error = false;
  }
  if(state?.success && state.success==true){
    alert(state.message);
    state.success = false;
    redirect("/dashboard/user/bookings");
  }
  return (
    <form className="flex flex-col justify-center py-8" action={dispatch}>
      <div className="flex gap-12 mb-4 mx-auto">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="quantity">Accommodation Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            step={1}
            min={1}
            className="rounded-md p-1"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              setTotal(Number(e.target.value) * nights * place.price);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="date">Check In Date</label>
          <input
            type="date"
            name="date"
            id="date"
            min={`2024-07-01`}
            max={`2024-08-31`}
            className="rounded-md p-1"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="nights">Number of Nights</label>
          <input
            type="number"
            name="nights"
            id="nights"
            step={1}
            min={1}
            className="rounded-md p-1"
            value={nights}
            onChange={(e) => {
              setNights(Number(e.target.value));
              setTotal(Number(e.target.value) * quantity * place.price);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label>Total Price</label>
          <input
            type="number"
            className="rounded-md p-1"
            defaultValue={total}
            disabled
          />
        </div>
      </div>
      <input type="hidden" name="placeId" defaultValue={place.id}/>
      <input type="hidden" name="total" defaultValue={total}/>
      <input type="hidden" name="bookingId" defaultValue={booking?.id}/>
      <button
        type="submit"
        className="p-2 rounded-md bg-cyan-300 mx-auto"
      >
        Edit Accommodation
      </button>
    </form>
  );
}
