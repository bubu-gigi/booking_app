import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setDescription } from "../../redux/slices/form/descriptionSlice";
import { useEffect } from "react";

//@ts-ignore
export default function Description({ description }) {

  const dispatch = useDispatch<AppDispatch>();

  const handleDescriptionChange = (e: any) => {
    const value = e.target.value;
    dispatch(setDescription(value));
  }

  useEffect(() => {
    dispatch(setDescription(description));
  }, []);

  return(
    <>
      <h2 className="text-2xl mt-4">Description</h2>
      <p className="text-gray-500 text-sm">description of the place</p>
      <textarea name="description" defaultValue={description} onChange={handleDescriptionChange}/>
    </>
  );
}