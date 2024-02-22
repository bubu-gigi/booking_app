import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logoutAsync } from "../redux/slices/authSlice";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {

  //@ts-ignore
  const { user,ready,setUser } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();

  async function logout(){
    try {
      await dispatch(logoutAsync());
    } catch (e) {
      console.log(e);
    }
  }

  if(!(ready)) {
    return "Loading";
  }

  if(!(user)) {
    return <Navigate to={'/'} />
  } else {
    return (
      <div>
        <AccountNav />
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} {user.email}<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      </div>
    );
  }
}