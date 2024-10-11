import { getPlaceById } from "@/app/utils/readdata/places";
import EditPlaceForm from "@/app/components/PlacesComponents/EditPlaceForm";

export default async function EditPlacePage({params}){
  const placeId = params.id;
  const place = await getPlaceById(placeId);
  return (
    <div>
      <p className="text-3xl mt-8 mb-4 text-center">Edit Place</p>
      <div className="mx-96 bg-white py-8 rounded-md shadow-lg">
        <EditPlaceForm place={place}/>
      </div>
    </div>
  );
}
