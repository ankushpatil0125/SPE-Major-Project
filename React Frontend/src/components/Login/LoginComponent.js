import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoadingComponent from "../Loading/LoadingComponent";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";
const LoginComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  //   const { setJWT } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setRequestData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(
      "email",
      email,
      "password",
      password
    );
    const loginObj={
      email:email,
      password:  password,
    }
    console.log("requestData",loginObj)
    try {
      // setLoading(true);
      const response = await axios.post(BASE_URL+'login/',loginObj);
      
      console.log("Login API Response: ", response);
      if (response) {
        localStorage.setItem("ROLE",response?.data?.role)
        localStorage.setItem("User_Id", response?.data?.id);
        alert("Login Successful...");
        if (response?.data?.role === "admin") navigate("/admin-home");
        else if (response?.data?.role === "user") navigate("/user-home");
        }
        // setLoading(false);
      }
     catch (error) {
      console.log("error while login",error)
      // alert(error.response.data);
      // setLoading(false);
      alert(`Login Failed : ${error?.response?.data?.message}`);
    }
  };

    useEffect(() => {
      if (
        localStorage.getItem("ROLE") !== null &&
        localStorage.getItem("ROLE") === "admin"
      )
        navigate("/admin-home", { replace: true });
      if (
        localStorage.getItem("JWT") !== null &&
        localStorage.getItem("ROLE") === "user"
      )
        navigate("/user-home", { replace: true });

    }, []);
  // if (loading) return <LoadingComponent />;
  return (
    <div>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
            <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-10">
                  <h3 className="text-3xl font-extrabold text-[#6467c0]">
                    Sign in to your Account
                  </h3>
                </div>
                <div>
                  <label className="text-sm mb-2 block text-[#6467c0]">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Enter user name"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-sm mb-2 block text-[#6467c0]">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      required
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                      onClick={togglePasswordVisibility}
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  
                  <Link to='/register'>Don't have account,<span className="text-blue-500">Click Here</span> to Sign Up</Link>
                </div>
              </div>
                <div className="!mt-10">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#6467c0] hover:bg-[#696bab] focus:outline-none"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full object-cover"
                alt="Login Img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
