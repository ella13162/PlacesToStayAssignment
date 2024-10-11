"use client";
import { deletePlaceById } from "@/app/utils/actions/placeactions";
import Link from "next/link";

export default function PlaceRow({place}){
  return (
    <div className="flex gap-8 mt-1 mx-8 mb-1 border-b border-b-dotted py-1">
      <p className="w-[25%] border-r border-dotted">{place?.name}</p>
      <p className="w-[15%] border-r border-dotted">{place?.type}</p>
      <p className="w-[25%] border-r border-dotted">{place?.city}</p>
      <p className="w-[10%] border-r border-dotted text-center">{place?.capacity}</p>
      <p className="w-[10%] border-r border-dotted text-center">{place?.guests}</p>
      <p className="w-[10%] border-r border-dotted text-center">${place?.price}</p>
      <div className="w-[10%] text-center flex gap-4">
        <Link
          className="bg-yellow-400 rounded-md px-1"
          href={`/dashboard/admin/places/edit/${place.id}`}
        >
          Edit
        </Link>
        <button
          className="bg-red-400 rounded-md px-1"
          onClick={ async () => {
            await deletePlaceById(place?.id);
            alert("Place Deleted");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
