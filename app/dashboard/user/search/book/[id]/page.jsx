import {getPlaceById} from "@/app/utils/readdata/places";
import BookingForm from "@/app/components/BookingComponents/BookingForm";


export default async function BookingPage({params}){
  const placeId = params?.id;
  const place = await getPlaceById(placeId)
  return (
      <div>
        <div className="mt-24 bg-white rounded-md shadow-lg mx-96 p-4 relative">
          <p className="text-center mt-2 font-bold text-3xl text-blue-400 mb-24">{place?.name}</p>
          <div className="flex justify-between mx-24 mt-2">
            <p>Type : {place?.type}</p>
            <p>City : {place?.city}</p>
          </div>
          <div className="flex justify-between mx-24 mt-2">
            <p>Address : {place?.address}</p>
            <p>Guests Per Accommodation : {place?.guests}</p>
          </div>
          <p className="p-2 rounded-md bg-cyan-300 absolute top-1 right-1">Per Accommodation : {place?.price} EUR</p>
        </div>
        <div className="mt-2 bg-white rounded-md shadow-lg mx-96 p-4 relative">
          <BookingForm place={place}/>
        </div>
      </div>
  );
}
