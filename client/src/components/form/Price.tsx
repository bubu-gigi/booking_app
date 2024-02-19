import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { setPrice } from "../../redux/slices/form/priceSlice";

//@ts-ignore
export default function Price( {price} ) {
  
  const dispatch = useDispatch<AppDispatch>();

  const handlePriceChange = (e: any) => {
    const value = e.target.value;
    dispatch(setPrice(value));
  }

  useEffect(() => {
    dispatch(setPrice(price));
  }, []);

  return (
    <>
      <div className="">
          <h3 className="mt-2 -mb-1 ">Price per night</h3>
          <input type="number" 
                  name="price"
                  defaultValue={price}
                  onChange={handlePriceChange} 
                  placeholder="300.00 $"/>
      </div>
    </>
  );
}