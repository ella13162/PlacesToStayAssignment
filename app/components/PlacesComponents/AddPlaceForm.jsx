"use client";

import { useFormState } from "react-dom";
import { addNewPlace } from "@/app/utils/actions/placeactions";
import { redirect } from "next/navigation";

export default function AddPlaceForm(){
  const formState = {};
  const [state,dispatch] = useFormState(addNewPlace,formState);
  if(state?.success == true){
    redirect("/dashboard/admin/places");
  }
  return (
    <form className="mx-16" action={dispatch}>
      {
        (state?.success) ? (
          <div className="my-4">
            <p className="text-sm text-green-700">{state?.message}</p>
          </div>
        ) : (
          <div className="my-4">
            <p className="text-sm text-red-700">{state?.message}</p>
          </div>
        )
      }
      <div className="flex flex-col mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          className="p-2 rounded-md"
          required
        >
          <option value={`Hotel`}>Hotel</option>
          <option value={`Hostel`}>Hostel</option>
          <option value={`Campsite`}>Campsite</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          step={1}
          min={1}
          id="capacity"
          name="capacity"
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="guests">Adults Per Accommodation</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min={1}
          step={1}
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="price">Price Per Accommodation</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          step={0.01}
          className="p-2 rounded-md"
          required
        />
      </div>
      <div className="mb-4 text-center">
        <button type="submit" className="p-2 bg-cyan-300 rounded-md w-48">Submit</button>
      </div>
    </form>
  );
}
