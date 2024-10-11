"use server";
import { db } from "@/app/utils/firebase";
import { collection,getDocs, doc, getDoc, where, query} from "firebase/firestore";

export async function getAllPlaces(){
  const snapshot = await getDocs(collection(db,"places"));
  let places = [];
  snapshot.forEach((place) => {
    places.push({
      id:place.id,
      ...place.data()
    })
  })
  return places;
}

export async function getPlaceById(placeId){
  try{
    const place = await getDoc(doc(db,"places",placeId));
    return {
      id : placeId,
      ...place.data()
    }
  }catch(err){
    console.log(err);
  }
}

export async function getAllCities(){
  try{
    const snapshot = await getDocs(collection(db,"places"));
    let cities = new Set();
    snapshot.forEach((place) => {
      cities.add(place.data().city);
    })
    return Array.from(cities);
  }catch(err){
    console.log(err);
  }
}

export async function searchAllPlaces(type,city){
  let snapshot;
  if(city==="ALL"){
    snapshot = await getDocs(query(collection(db,"places"), where("type","==",type)));
  }else{
    snapshot = await getDocs(query(collection(db,"places"), where("type","==",type), where("city","==",city)));
  }
  let places = [];
  snapshot.forEach((place) => {
    places.push({
      id:place.id,
      ...place.data()
    })
  })
  return places;
}
