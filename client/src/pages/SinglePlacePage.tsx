import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Place {
  title: string,
  address: string,
  addedPhotos: string[],
  description: string,
  perks: string[],
  extraInfo: string,
  checkIn: string,
  checkOut: string,
  maxGuests: number,
  price: number,
}

export default function SinglePlacePage() {

  const {name} = useParams();
  const [ready,setReady] = useState<boolean>(false);
  const [place,setPlace] = useState<Place>({
    title: '',
    address: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 0,
    price: 0,  
  });

  async function setData(){
    const {data} = await axios.get('/places/'+name);
    console.log(data);
    await setPlace(data);
    console.log(place);
  }

  useEffect(() => {
    setData();
    setReady(true);
  }, []);
 
  if(!(ready)) {
    return "Loading...";
  }

  return (
    <div>
      {place.title}
    </div>
  );
}