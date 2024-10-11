import BookingRow from "@/app/components/BookingComponents/BookingRow";
import { getAllBookings } from "@/app/utils/readdata/bookings";
import { cookies } from "next/headers";

export default async function AllBookingsPage(){
  const bookings = await getAllBookings();
  const usertype = cookies().get("usertype")?.value;

  return (
    <div>
      <p className="text-3xl font-bold mt-8 text-center"> All the bookings made</p>
      <div className="mt-8 bg-white rounded-md shadow-lg mx-24 p-4">
        <div className="flex gap-8 mx-24 bg-cyan-300 rounded-t-md p-2">
          <p className="w-[12.5%]">Booking ID</p>
          <p className="w-[12.5%]">Customer Name</p>
          <p className="w-[25%]">Place</p>
          <p className="w-[12.5%]">Rooms</p>
          <p className="w-[12.5%]">Nights</p>
          <p className="w-[12.5%]">Date</p>
          <p className="w-[12.5%]">Price</p>
          <p className="w-[12.5%]">Actions</p>
        </div>
        {
          bookings?.map((booking) => {
            return <BookingRow key={booking?.id} booking={booking} usertype={usertype}/>
          })
        }
      </div>
    </div>
  );
}
