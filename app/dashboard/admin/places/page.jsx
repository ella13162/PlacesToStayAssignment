import PlaceRow from "@/app/components/PlacesComponents/PlaceRow";
import Link from "next/link";
import { getAllPlaces } from "@/app/utils/readdata/places";

export default async function PlacesPage(){
  const places = await getAllPlaces();
  return (
    <div className="relative">
      <p className="text-3xl mt-8 text-center">
        All the places added
      </p>
      <Link
        className="absolute right-24 top-4 p-2 bg-cyan-300 rounded-md"
        href={`/dashboard/admin/places/add`}
      >
        Add New Place
      </Link>
      <div className="mt-8 bg-white rounded-md shadow-lg mx-24 p-4">
        <div className="flex gap-8 mx-8 bg-cyan-300 rounded-t-md p-2">
          <p className="w-[25%]">Name</p>
          <p className="w-[15%]">Type</p>
          <p className="w-[25%]">City</p>
          <p className="w-[10%]">Capacity</p>
          <p className="w-[10%]">Adults / Accommodation</p>
          <p className="w-[10%]">Price / Accommodation</p>
          <p className="w-[10%]">Actions</p>
        </div>
        {
          places?.map((place) => {
            return <PlaceRow key={place?.id} place={place}/>
          })
        }
      </div>
    </div>
  );
}
