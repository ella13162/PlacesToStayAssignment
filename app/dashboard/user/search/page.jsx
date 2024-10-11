import { searchAllPlaces } from "@/app/utils/readdata/places";
import Link from "next/link";

export default async function SearchResultPage({searchParams}){
  const type = searchParams?.type;
  const location = searchParams?.location;
  const places = await searchAllPlaces(type,location);
  return (
    <div className="flex gap-8 ml-48 mt-8">
      <div className="bg-white rounded-md shadow-md p-4 w-[20%] max-h-64">
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <label>Max Price</label>
            <input type="number" step={0.01} min={0} className="rounded-md p-1"/>
          </div>
          <button type="submit" className="p-1 rounded-md bg-cyan-300 w-full">Filter</button>
        </form>
      </div>
      <div className="w-[75%]">
        <p className="text-blue-600 text-2xl">{places?.length} Accommodations found</p>
        <div className="bg-gray-50 w-full p-2 py-8 rounded-md shadow-lg">
          {
            places?.map((place) => {
              return (
                <div className="relative p-4 bg-cyan-100 w-[80%] rounded-md mx-auto mb-4" key={place?.id}>
                  <p className="text-xl">{place?.name}</p>
                  <p className="text-sm">Type : {place?.type}</p>
                  <p className="text-sm">City : {place?.city}</p>
                  <p className="text-sm">Address : {place?.address}</p>
                  <p className="text-sm">Guests Per Accommodation : {place?.guests}</p>
                  <p className="text-sm text-yellow-700">Maximum Capacity : {place?.capacity}</p>
                  <p className="p-2 rounded-md bg-cyan-300 absolute top-1 right-1">Per Accommodation : {place?.price} EUR</p>
                  <Link
                    className="p-2 rounded-md bg-cyan-300 absolute bottom-1 right-1"
                    href={`/dashboard/user/search/book/${place?.id}`}
                  >
                    Details
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
