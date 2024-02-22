import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { profileAsync } from "../redux/slices/authSlice";

export const UserContext = createContext({});

// @ts-ignore
export function UserContextProvider({children}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const [ready,setReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  async function setUser() {
    await dispatch(profileAsync());
    setReady(true);
  }
  
  useEffect(() => {
    setUser();
  }, []);

  return (
    <UserContext.Provider value={{user,isLogged,ready}}>
      {children}
    </UserContext.Provider>
  );
}