import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "./slices/authSlice";
import perksReducer from "./slices/form/perksSlice";
import photosReducer from "./slices/form/photosSlice";
import placeReducer from "./slices/placeSlice";
import checkInOutGuestsReducer from "./slices/form/checkInOutGuestsSlice";
import addtitleReducer from "./slices/form/addtitleSlice";
import descriptionReducer from "./slices/form/descriptionSlice";
import extrainfoReducer from "./slices/form/extrainfoSlice";
import priceReducer from "./slices/form/priceSlice";
import alertReducer from "./slices/alertSlice";
import redirectReducer from "./slices/redirectSlice";
import photosRemovedReducer from "./slices/form/photosRemovedSlice"
//import { persistReducer, persistStore } from "redux-persist";
//import storage from "redux-persist/lib/storage";

/*const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}*/

//const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    perks: perksReducer,
    photos: photosReducer,
    place: placeReducer,
    checkInOutGuests: checkInOutGuestsReducer,
    addtitle: addtitleReducer,
    description: descriptionReducer,
    extrainfo: extrainfoReducer,
    price: priceReducer,
    alert: alertReducer,
    redirect: redirectReducer,
    photosRemoved: photosRemovedReducer,
    //persistData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;