"use client";
import { searchPlaces } from "@/app/utils/actions/searchactions";

export default function SearchForm({cities}){
  return (
    <form className="flex flex-col justify-center py-8" action={searchPlaces}>
      <div className="flex gap-12 mb-4 mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            className="w-64 rounded-md"
          >
            <option value={`Hotel`}>Hotel</option>
            <option value={`Hostel`}>Hostel</option>
            <option value={`Campsite`}>Campsite</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <select
            name="location"
            id="location"
            className="w-96 rounded-md"
            required
          >
            <option value={`ALL`}>ALL</option>
            {
              cities?.map((city) => {
                return <option value={city} key={city}>{city}</option>
              })
            }
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="p-2 rounded-md bg-cyan-300 mx-auto"
      >
        Search Accommodation
      </button>
    </form>
  );
}
