import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setAddedPhotos } from "../redux/slices/form/photosSlice";
import { addNewPlace, updatePlace } from "../redux/slices/placeSlice";
import Perks from "./form/Perks";
import UploadPhotos from "./form/UploadPhoto";
import CheckInOutGuests from "./form/CheckInOutGuests";
import { setCheckIn, setCheckOut, setMaxGuests } from "../redux/slices/form/checkInOutGuestsSlice";
import AddressTitle from "./form/AddressTitle";
import Description from "./form/Description";
import ExtraInfo from "./form/ExtraInfo";
import Alerts from "./Alerts";
import { setShowTopFalse, setShowTopTrue } from "../redux/slices/alertSlice";
import { Navigate } from "react-router-dom";
import { setRedirectFalse } from "../redux/slices/redirectSlice";

interface FormDataProps {
  title: string | null,
  address: string | null,
  addedPhotos: string[] | undefined | null,
  description: string | null,
  perks: string[] | null,
  extraInfo: string | null,
  checkIn: string | null,
  checkOut: string | null,
  maxGuests: string | null,
  price: number | null,
  photosRemoved: string[] | null,
}

//@ts-ignore
export default function PlacesForm( {place, id} ){

  //@ts-ignore
  const [formData,setFormData]: FormDataProps = useState({
    title: '',
    address: '',
    addedPhotos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: '',
    price: 0.0,
    photosRemoved: [],
  });

  const redirect = useSelector((state: RootState) => state.redirect.redirect);
  const alertState = useSelector((state: RootState) => state.alert.show);
  const photosRemoved = useSelector((state: RootState) => state.photosRemoved.photosRemoved);
  const titleRedux = useSelector((state: RootState) => state.addtitle.title);
  const addressRedux = useSelector((state: RootState) => state.addtitle.address);
  const descriptionRedux = useSelector((state: RootState) => state.description.description);
  const perksRedux = useSelector((state: RootState) => state.perks.perks);
  const photosRedux = useSelector((state: RootState) => state.photos.photos);
  const extrainfoRedux = useSelector((state: RootState) => state.extrainfo.extraInfo);
  const checkInRedux = useSelector((state: RootState) => state.checkInOutGuests.checkIn);
  const checkOutRedux = useSelector((state: RootState) => state.checkInOutGuests.checkOut);
  const maxGuestsRedux = useSelector((state: RootState) => state.checkInOutGuests.maxGuests);
  const priceRedux = useSelector((state: RootState) => state.price.price);
	const dispatch = useDispatch<AppDispatch>(); 

  const submitForm = async (e: any) => {
		e.preventDefault();
    formData.title = titleRedux;
    formData.address = addressRedux;
    formData.description = descriptionRedux;
    formData.perks = perksRedux;
    formData.extraInfo = extrainfoRedux;
    formData.checkIn = checkInRedux;
    formData.checkOut = checkOutRedux;
    formData.maxGuests = maxGuestsRedux;
    formData.addedPhotos = photosRedux;
    formData.price = priceRedux;
    formData.photosRemoved = photosRemoved;
    if(id && id !== 'new') {
      await dispatch(updatePlace(formData));
      await dispatch(setShowTopTrue());
      //location.reload();
      //return <Navigate to={'/account'} />
    }else {
      await dispatch(addNewPlace(formData));
      await dispatch(setShowTopTrue());
      //location.reload();
      //return <Navigate to={'/account'} />
    }
	}

  function setPlace() {
    setFormData(place);
    dispatch(setCheckIn(place.checkIn));
    dispatch(setCheckOut(place.checkOut));
    dispatch(setMaxGuests(place.maxGuests));
    dispatch(setAddedPhotos(place.addedPhotos));
  }

  useEffect(() => {
    dispatch(setRedirectFalse());
    dispatch(setShowTopFalse());
    if(id === 'new') {
      dispatch(setAddedPhotos([]));
    }
    if(place.title != '') {
      setPlace();  
      return;
    }
    setFormData(place);
  }, []);

  if(redirect) {
    return <Navigate to={'/account/places'} />
  }

  if(!(alertState)) {
    return (
      <form onSubmit={submitForm}>
        <AddressTitle address={place.address} title={place.title}/>
        <Description description={place.description} />
        <UploadPhotos addedPhotos={place.addedPhotos}/>
        <ExtraInfo extraInfo={place.extraInfo}/>
        <Perks perks={place.perks} />
        <CheckInOutGuests checkIn={place.checkIn} checkOut={place.checkOut} maxGuests={place.maxGuests} price={place.price}/>
        <button className="primary mt-4">Save</button>
      </form>
    );
  } else {
    return (
      <Alerts state={"success"} payload={"Place added/uploaded successfully."}/>
    );
  }
}