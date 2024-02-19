import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {

  //@ts-ignore
  const { user,ready,setUser } = useContext(UserContext);

  if(!(ready)) {
    return "Loading";
  }

  async function logout(){
    try {
        await axios.get('/logout');
        await setUser(null);
        return <Navigate to={'/'} />
    } catch (e) {
        console.log(e);
    }
}

  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} {user.email}<br />
      <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
    </div>
  );
}