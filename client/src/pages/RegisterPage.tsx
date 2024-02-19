import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions"

export default function RegisterPage() {

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
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { loading, userInfo, error, success } = useSelector(
      (state) => state.auth
    )
    const user = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
    };
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    try {
      const response = await axios.post('http://localhost:4000/register', user);
      alert('Registration successfullt. Now you can log in.')
    } catch (e) {
      alert("Registration failed.")
    }
  }

  return(
    <div className="mt-4 grow flex items-center justify-center">
            <div className="-mt-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input type="text" 
                        placeholder="John Doe" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    ></input>
                    <input type="email" 
                        placeholder='your@email.com'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    ></input>
                    <input type="password" 
                        placeholder="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    ></input>
                    <button className="primary">Register</button>
                    <div className="text-center pt-2 text-gray-500">
                        Already a member? 
                        <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
  );
}