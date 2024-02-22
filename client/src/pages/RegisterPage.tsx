import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { registerAsync } from "../redux/slices/authSlice";
import { setShowEmailTrue, setShowPasswordTrue, setShowTopFalse, setShowTopTrue, setShowUsernameTrue } from "../redux/slices/alertSlice";
import Alerts from "../components/Alerts";
import { setRedirectFalse } from "../redux/slices/redirectSlice";

export default function RegisterPage() {

  const dispatch = useDispatch<AppDispatch>();
  const [result,setResult] = useState<string>('');
  const [showEmailAlert,setShowEmailAlert] = useState<boolean>(false);
  const [showUsernameAlert,setShowUsernameAlert] = useState<boolean>(false);
  const [showPasswordAlert,setShowPasswordAlert] = useState<boolean>(false);
  const [showTopAlert,setShowTopAlert] = useState<boolean>(false);
  const [payload,setPayload] = useState<string>('');
  var flag = false;
  const redirect = useSelector((state: RootState) => state.redirect.redirect);

  const [formData,setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) =>{
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowEmailAlert(false);
    setShowUsernameAlert(false);
    setShowPasswordAlert(false);

    if(formData.email == "") {
      setResult("form");
      setShowEmailAlert(true);
      dispatch(setShowEmailTrue());
      flag = true;
    }
    if(formData.username == "") {
      setResult("form");
      setShowUsernameAlert(true);
      dispatch(setShowUsernameTrue());
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
    const user = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    };
    try {
      console.log(user);
      const {payload} = await dispatch(registerAsync(user));
      switch (payload) {
        case "ko":
          setResult("danger");
          setPayload("It seems that an account with this email already exists. Please log in.");
          setShowTopAlert(true);
          dispatch(setShowTopTrue()); 
          break;
        case "name empty":     
          setResult("danger");
          setPayload("It seems that an account with this email already exists. Please log in.")
          setShowTopAlert(true);
          dispatch(setShowTopTrue());
          break;                
        case "email empty":  
          setResult("danger");
          setPayload("It seems that an account with this email already exists. Please log in.")
          setShowTopAlert(true);
          dispatch(setShowTopTrue());
          break;
        case "password empty":
          setResult("danger");
          setPayload("It seems that an account with this email already exists. Please log in.")
          setShowTopAlert(true);
          dispatch(setShowTopTrue());
          break;
        default:
          setResult("success");
          setPayload("Logged Successfully.")
          setShowTopAlert(true);
          dispatch(setShowTopTrue());
          break;
      }
    } catch (e) {
      setResult("danger");
      setPayload("Server error");
      setShowTopAlert(true);
      dispatch(setShowTopTrue());
    }
  }

  useEffect(() => {
    setPayload('');
    setResult(''); 
    setShowTopAlert(false);
    setShowEmailAlert(false);
    setShowUsernameAlert(false);
    setShowPasswordAlert(false);
    flag = false;
    dispatch(setRedirectFalse());
		dispatch(setShowTopFalse());
  }, []);

  if(redirect) {
    return <Navigate to={'/login'} />
  }

  return(
    <>
      <div className="flex position-absolute w-full justify-center">
        {showTopAlert && (
          <Alerts state={result} payload={payload}/> 
        )}
      </div>
      <div className="mt-4 grow flex items-center justify-center">
        <div className="-mt-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <input type="text" 
                  placeholder="John Doe" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  />
              {showUsernameAlert && (
                <Alerts state={result} payload="insert username"/> 
              )}
              <input type="email" 
                  placeholder='your@email.com'
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  />
              {showEmailAlert && (
                <Alerts state={result} payload="insert email"/> 
              )}
              <input type="password" 
                  placeholder="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  />
              {showPasswordAlert && (
                <Alerts state={result} payload="insert password"/> 
              )}
              <button className="primary">Register</button>
              <div className="text-center pt-2 text-gray-500">
                  Already a member? 
                  <Link className="underline text-black" to={'/login'}>Login</Link>
              </div>
          </form>
        </div>
      </div>
    </>
    );
}