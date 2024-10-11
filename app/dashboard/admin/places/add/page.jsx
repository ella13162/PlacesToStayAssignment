import AddPlaceForm from "@/app/components/PlacesComponents/AddPlaceForm";

export default function AddPlacePage(){
  return (
    <div>
      <h3 className="text-3xl mt-8 text-bold text-center">Add New Place</h3>
      <div className="mx-96 p-4 bg-white rounded-md shadow-lg mt-4">
        <AddPlaceForm/>
      </div>
    </div>
  );
}
