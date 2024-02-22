import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginAsync } from "../redux/slices/authSlice";
import Alerts from "../components/Alerts";
import { setShowEmailFalse, setShowEmailTrue, setShowPasswordFalse, setShowPasswordTrue, setShowTopFalse, setShowTopTrue } from "../redux/slices/alertSlice";
import { setRedirectFalse, setRedirectTrue } from "../redux/slices/redirectSlice";

export default function LoginPage() {

	const dispatch = useDispatch<AppDispatch>();
	const redirect = useSelector((state: RootState) => state.redirect.redirect);
	const [showEmailAlert,setShowEmailAlert] = useState<boolean>(false);
  const [showPasswordAlert,setShowPasswordAlert] = useState<boolean>(false);
	const [showTopAlert,setShowTopAlert] = useState<boolean>(false);
	const [result,setResult] = useState<string>('');
	const [payload,setPayload] = useState<string>('');
	var flag = false;
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

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setShowPasswordAlert(false);
		setShowEmailAlert(false);

		if(formData.email == "") {
      setResult("form");
      setShowEmailAlert(true);
      dispatch(setShowEmailTrue());
      flag = true;
    }
		if(formData.password == "") {
      setResult("form");
      setShowPasswordAlert(true);
      dispatch(setShowPasswordTrue());
      flag = true;
    }
    if(flag) {
      return;
    }
		const dataToSend = {
			email: formData.email,
			password: formData.password,
		}
		try {
			const {payload} = await dispatch(loginAsync(dataToSend));
			//@ts-ignore
			if((payload.data) != "ko") {
				setResult("success");
				setPayload("Logged successfully.");
				setShowTopAlert(true);
				dispatch(setShowTopTrue());
			} else {
				setResult("danger");
				setPayload("Please try again, or check your credentials.");
				setShowTopAlert(true);
				dispatch(setShowTopTrue());
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		dispatch(setRedirectFalse());
		dispatch(setShowTopFalse());
		dispatch(setShowEmailFalse());
		dispatch(setShowPasswordFalse());
		flag = false;
	}, []);

	if (redirect) {
		return <Navigate to={'/account'} />
	}

		return (
			<>
				<div className="flex position-absolute w-full justify-center">
				{showTopAlert && (
          <Alerts state={result} payload={payload}/> 
        )}
				</div>
				<div className="mt-4 grow flex items-center justify-center">
					<div className="-mt-64">
						<h1 className="text-4xl text-center mb-4">Login</h1>
						<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
								<input type="email" 
								placeholder='your@email.com' 
								name="email"
								value={formData.email}
								onChange={handleInputChange}/>
								{showEmailAlert && (
									<Alerts state={result} payload="insert email"/> 
								)}
								<input type="password" 
								placeholder="password" 
								name="password"
								value={formData.password}
								onChange={handleInputChange}/>
								{showPasswordAlert && (
									<Alerts state={result} payload="insert password"/> 
								)}
								<button className="primary">Login</button>
								<div className="text-center pt-2 text-gray-500">
										Don't have an account yet?
										<Link to={'/register'} className="underline text-black">Register now</Link>
								</div>
						</form>
					</div>
				</div>
			</>
		);
}