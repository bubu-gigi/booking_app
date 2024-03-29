import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removePhotoRedux, setAddedPhotos, uploadPhotoAsync } from "../../redux/slices/form/photosSlice";
import { useEffect } from "react";
import { addPhoto } from "../../redux/slices/form/photosRemovedSlice";

//@ts-ignore
export default function UploadPhotos({ addedPhotos }) {

  const photosRedux = useSelector((state: RootState) => state.photos.photos);
  const photosRemoved = useSelector((state: RootState) => state.photosRemoved.photosRemoved);
  const dispatch = useDispatch<AppDispatch>();

  const uploadPhotos = async (e: any) => {
		e.preventDefault();
		const files = e.target.files;
		const data = new FormData();
        for(let i=0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
		const {payload} = await dispatch(uploadPhotoAsync(data));
   /* const photos = payload as string[];
    const photosTrue: string[] = [];
    photos.map((photo) => {
      const photoSplitted = photo.split('/');
      photosTrue.push(photoSplitted[1]);
    })
    dispatch(putNewPhotos(photosTrue));*/
	}

  const removePhoto = (e: any) => {
    e.preventDefault()
    const filename = e.currentTarget.id;
    dispatch(addPhoto(filename));
    dispatch(removePhotoRedux(filename));
  } 

  useEffect(() => {
    dispatch(setAddedPhotos(addedPhotos));
  }, []);

  return (
    <>
      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">more = better</p>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photosRedux.length > 0 && photosRedux.map(link => (
          <div className="h-32 flex relative" key={link}>
            <img className="rounded-2xl w-full object-cover" id={link} src={'http://localhost:4000/uploads/' + link} />
            <button onClick={removePhoto} id={link} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
        <label className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 mt-4 text-2xl text-gray-600">
          <input type="file" multiple className="hidden" onChange={uploadPhotos}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
          Upload
        </label>
      </div>
    </>
  );
}