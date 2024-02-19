import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { getPlaces, getUserPlaces } from "../redux/slices/placeSlice.ts";
import AccountNav from "../components/AccountNav.tsx";
import PlacesForm from "../components/PlacesForm.tsx";
import axios from "axios";

export default function PlacesPage() {

  const {id} = useParams(); 
	const [ready,setReady] = useState<boolean>(false);
	const [placeData,setPlaceData] = useState<object>({
		title: '',
		address: '',
		addedPhotos: [],
		description: '',
		perks: [],
		extraInfo: '',
		checkIn: '',
		checkOut: '',
		maxGuests: 0,
	});
	const places = useSelector((state: RootState) => state.place.places);
	const dispatch = useDispatch<AppDispatch>();

	async function getListPlaces() {
		await dispatch(getUserPlaces());
	} 

	async function getPlace() {
		axios.get('/places/' + id).then((response) => {
			const {data} = response;
			setPlaceData(data);
			setReady(true);
		}) 
	}

	useEffect(() => {
		getListPlaces();
		if (!id  || id == "new") {
			setReady(true);
		}
		getPlace();
	}, [id]);   

	if(!(ready)) {
		return "Loading...";
	}

  return (
      <div>
          {id === undefined && (
						<div className="text-center">
							<Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
									</svg>
									Add new place  
							</Link>
							<div className="mt-4 w-99">
								{places.length > 0 && places.map(place => (
									<Link to={'/account/places/' + place._id} key={place._id} className="flex mb-2 cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
										<div className="flex w-32 h-32 bg-gray-300 grow-0 shrink-0">
											{place.addedPhotos.length > 0 && (
												<img className="object-cover" src={"http://localhost:4000/uploads/"+place.addedPhotos[0]} alt="photo"/>
											)}
										</div>
										<div className="text-left grow-0 shrink">
											<h2 className="text-xl">{place.title}</h2>
											<p className="text-sm mt-2">{place.description}</p>
										</div>
									</Link>
								))}
							</div>
          	</div>
          )} 
					{id !== undefined && (
						<div>
							<AccountNav />
							<PlacesForm place={placeData} id={id}/>
						</div>
					)}
      </div>
  );
}