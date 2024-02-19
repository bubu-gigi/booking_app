import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setExtraInfo } from "../../redux/slices/form/extrainfoSlice";
import { useEffect } from "react";

//@ts-ignore
export default function ExtraInfo({ extraInfo }) {
  
  const dispatch = useDispatch<AppDispatch>();

  const handleExtraInfoChange = (e: any) => {
    const value = e.target.value;
    dispatch(setExtraInfo(value));
  }

  useEffect(() => {
    dispatch(setExtraInfo(extraInfo));
  }, []);

  return (
    <>
      <h2 className="text-2xl mt-4">Extra info</h2>
      <p className="text-gray-500 text-sm">house rulse, extra</p>
      <textarea name="extraInfo" defaultValue={extraInfo} onChange={handleExtraInfoChange}/>
    </>
  );
}