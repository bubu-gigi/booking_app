import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SinglePlacePage() {

  const {id} = useParams();
  const [ready,setReady] = useState<boolean>(false);
  const [place,setPlace] = useState<object>({
    title: '',
    address: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 0,
    price: 0.0,
  });

  async function setData(){
    const {data} = await axios.get('/places'+id);
    setPlace(data);
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
      {place?.title}
    </div>
  );
}