import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { setCheckIn, setCheckOut, setMaxGuests } from "../../redux/slices/form/checkInOutGuestsSlice";
import Price from "./Price";

//@ts-ignore
export default function CheckInOutGuests( { checkIn, checkOut, maxGuests, price } ) {

  const dispatch = useDispatch<AppDispatch>();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'checkIn':
        dispatch(setCheckIn(value));
        break;
      case 'checkOut':
        dispatch(setCheckOut(value));
        break;
      case 'maxGuests':
        dispatch(setMaxGuests(value));
        break;
    }
  }

  function setProps() {
    dispatch(setCheckIn(checkIn));
    dispatch(setCheckOut(checkOut));
    dispatch(setMaxGuests(maxGuests));
  }
  
  useEffect(() => {
    setProps();
  }, []);


  return (
    <>
      <h2 className="text-2xl mt-4">Chech in&out times</h2>
      <p className="text-gray-500 text-sm">add check in and check out times, remember to have some time window for cleaning the rooms between guests</p>
      <div className="grid gap-2 sm:grid-cols-4">
        <div>
            <h3 className="mt-2 -mb-1 ">Check in time</h3>
            <input type="text" 
                    name="checkIn"
                    defaultValue={checkIn}
                    onChange={handleOnChange} 
                    placeholder="14:00"/>
        </div>
        <div>
            <h3 className="mt-2 -mb-1 ">Check out time</h3>
            <input type="text" 
                    name="checkOut"
                    defaultValue={checkOut}
                    onChange={handleOnChange} 
                    placeholder="11:00"/>
        </div>
        <div>
            <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
            <input type="number" 
                    name="maxGuests"
                    defaultValue={maxGuests}
                    onChange={handleOnChange} 
                    placeholder="es: 3"/>
        </div>
        <Price price={price}/>
      </div>
    </>
  );
}