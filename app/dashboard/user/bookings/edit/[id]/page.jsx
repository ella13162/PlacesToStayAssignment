import EditBookingForm from "@/app/components/BookingComponents/EditBookingForm";
import { getBookingById } from "@/app/utils/readdata/bookings";
import { getPlaceById } from "@/app/utils/readdata/places";

export default async function EditBookingPage({params}){
  const bookingId = params.id;
  const booking = await getBookingById(bookingId);
  const place = await getPlaceById(booking?.place?.placeId);
  return (
    <div>
      <EditBookingForm booking={booking} place={place}/>
    </div>
  );
}
