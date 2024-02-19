import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginAsync } from "../redux/slices/authSlice";

export default function LoginPage() {

	//const userState = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch<AppDispatch>();
	//const isLogged = useSelector((state: RootState) => state.auth.isLogged);
	const [redirect,setRedirect] = useState<boolean>(false);

	const [formData,setFormData] = useState({
		email: "",
		password: "",
	});
	// @ts-ignore
	const {user, setUser, ready} =  useContext(UserContext);

	const handleInputChange = (e: any) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleReduxSubmit = async (e: any) => {
		e.preventDefault();
		const dataToSend = {
			email: formData.email,
			password: formData.password,
		}
		try {
			const {payload} = await dispatch(loginAsync(dataToSend));
			// @ts-ignore
			await setUser((payload.data));
			await setRedirect(true);
			alert("logged in");
		} catch (e) {
			console.log(e);
		}
	}

	if (redirect) {
		return <Navigate to={'/account'} />
	}

	return (
		<div className="mt-4 grow flex items-center justify-center">
			<div className="-mt-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={handleReduxSubmit}>
						<input type="email" 
						placeholder='your@email.com' 
						name="email"
						value={formData.email}
						onChange={handleInputChange}/>
						<input type="password" 
						placeholder="password" 
						name="password"
						value={formData.password}
						onChange={handleInputChange}/>
						<button className="primary">Login</button>
						<div className="text-center pt-2 text-gray-500">
								Don't have an account yet?
								<Link to={'/register'} className="underline text-black">Register now</Link>
						</div>
				</form>
			</div>
		</div>
  );
}