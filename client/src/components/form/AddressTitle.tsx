import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { setAddress, setTitle } from "../../redux/slices/form/addtitleSlice";

//@ts-ignore
export default function AddressTitle( { address, title } ) {

  const dispatch = useDispatch<AppDispatch>();

  function inputHeader(text: string): any{
    return (
        <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text: string): any{
      return (
          <p className="text-gray-500 text-sm">{text}</p>
      );				
  }
  function preInput(header: string,description: string): any{
    return (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
  }  

  const handleOnChange = (e: any) => {
    const { name,value } = e.target;
    switch (name) {
      case 'address': 
        dispatch(setAddress(value));
        break;
      case 'title':
        dispatch(setTitle(value));
        break;  
    }
  }

  function setProps(){
    dispatch(setAddress(address));
    dispatch(setTitle(title));
  }

  useEffect(() => {
    setProps();
  }, []);

  return(
    <>
      {preInput('Title', 'Title for your place, should be short and cathcy')}
      <input type="text" name="title" defaultValue={title} onChange={handleOnChange} placeholder="title, for example my lovely app" required/>
      {preInput('Address', 'Address to this place')}                        
      <input type="text" name="address" defaultValue={address} onChange={handleOnChange} placeholder="address" required/>
    </>
  );
}