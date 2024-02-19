import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getPlaces } from "../redux/slices/placeSlice";
import { Link } from "react-router-dom";

export default function IndexPage() {

	const places = useSelector((state: RootState) => state.place.places);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getPlaces());
	}, []);

	return (
			<div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{places.length > 0 && places.map(place => (
					<Link to={'/place/'+place._id} key={place._id}>
						<div className="bg-gray-500 mb-2 rounded-2xl flex">
							{place.addedPhotos?.[0] && (
								<img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.addedPhotos?.[0]} alt="" />
							)}
						</div>
						<h2 className="font-bold ">{place.title}</h2>
						<h3 className="text-xs text-gray-500">{place.address}</h3>
						<div className=" mt-1">
							<span className="font-bold text-sm">${place?.price} per night</span>
						</div>
					</Link>
				))}
			</div>
	);
}
