"use client";
import Link from "next/link";
import { deleteBooking } from "@/app/utils/actions/bookingactions";

export default function BookingRow({booking,usertype}){
  return (
    <div className="flex gap-8 mt-1 mx-28 mb-1 border-b border-b-dotted py-1">
      <p className="w-[12.5%] border-r border-dotted">{booking?.id}</p>
      <p className="w-[12.5%] border-r border-dotted">{booking?.user?.firstname} {booking?.user?.lastname}</p>
      <p className="w-[25%] border-r border-dotted">{booking?.place?.name}</p>
      <p className="w-[12.5%] border-r border-dotted">{booking?.rooms}</p>
      <p className="w-[12.5%] border-r border-dotted">{booking?.nights}</p>
      <p className="w-[12.5%] border-r border-dotted">{booking?.date}</p>
      <p className="w-[12.5%] border-r border-dotted">{booking?.total}</p>
      <div className="w-[12.5%] text-center flex gap-4">
        <Link
          className="bg-yellow-400 rounded-md px-1"
          href={`/dashboard/${usertype=="User"?"user":"admin"}/bookings/edit/${booking?.id}`}
        >
          Edit
        </Link>
        <button
          className="bg-red-400 rounded-md px-1"
          onClick={async () => {
            await deleteBooking(booking?.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
