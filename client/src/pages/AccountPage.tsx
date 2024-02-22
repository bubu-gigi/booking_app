import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.tsx";
import { Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage.tsx";
import ProfilePage from "./ProfilePage.tsx";
import AccountNav from "../components/AccountNav.tsx";

export default function AccountPage() {
    // @ts-ignore
    const {user,isLogged,ready} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if(ready && !isLogged) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <ProfilePage/>
            )}
            {subpage === 'places' && (
                <PlacesPage/>
            )}
        </div>
    );
}