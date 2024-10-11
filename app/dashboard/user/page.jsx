import SearchForm from "@/app/components/SearchComponents/SearchForm";
import { getAllCities } from "@/app/utils/readdata/places";

export default async function UserDashboardPage(){
  const cities = await getAllCities();
  return (
    <div>
      <div className="mt-24 bg-white rounded-md shadow-lg mx-24 p-4">
        <SearchForm cities={cities}/>
      </div>
      <div className="flex flex-col justify-center mt-64">
        <h3 className="text-5xl text-center text-blue-500">Find best places to stay at a reasonable price</h3>
        <p className="text-center text-lg text-yellow-700 mt-8">You can search for any Hotel, Hostel and Campsite</p>
      </div>
    </div>
  );
}
