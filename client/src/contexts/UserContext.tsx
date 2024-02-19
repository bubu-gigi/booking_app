import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setIsLogged } from "../redux/slices/authSlice";

export const UserContext = createContext({});

// @ts-ignore
export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (!user) {
      // @ts-ignore
      const {data} = axios.get('/profile').then(({data}) => {
          if(data.name == "CastError") {
            setUser(null);
            setReady(true);
            return;
          }
          setUser(data);
          dispatch(setIsLogged());
          setReady(true);
      });
    } 
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}