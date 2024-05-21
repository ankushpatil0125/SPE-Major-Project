import React, { useState } from "react";
import { BASE_URL } from "../../utils/Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Loading/LoadingComponent";

const RegisterComponent = () => {
  const [actor, setActor] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async() => {
    if (
      firstname &&
      lastname &&
      email &&
      password &&
      mobile &&
      confirmPassword &&
      password === confirmPassword &&
      actor
    ) {
      console.log(
        "actor", actor,
        "firstname", firstname,
        "lastname", lastname,
        "email", email,
        "password", password,
        "confirmpassword", confirmPassword,
        "mobile", mobile
      );
      const userObject = {
        userFirstName: firstname,
        userLastName: lastname,
        email: email,
        password:  password,
        mobileNo: mobile,
        role: actor,
      }
      console.log("user object", userObject);
      try {
        setLoader(true)
        const responseAddBook = await axios.post(
          BASE_URL + "users/register",
          userObject
        );
        console.log("add user response",responseAddBook);
        if (responseAddBook?.data === true) {
          alert("User added successfully");
          setLoader(false);
          // window.location.reload();
          navigate('/')
        }
      } catch (e) {
        alert("Error while adding user", e?.response?.data?.message)
        console.log("Error while adding user", e?.response?.data?.message);
      }
    } else if (password !== confirmPassword) {
      alert("Password and confirm password should be the same");
    } else {
      alert("Please fill all fields");
    }
  };
  if(loader) return <LoadingComponent/>
  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
      <div className="text-center mb-16">
        <h4 className="text-base font-semibold mt-3">Sign up into your account</h4>
      </div>
      <form>
        <div>
        <label className="text-sm mb-2 block mr-4">Select Actor</label>
          <select
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className="bg-gray-100 text-sm px-4 py-3.5 rounded-md outline-blue-500"
          >
            <option value="">Select actor</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          </div>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">First Name</label>
            <input
              name="name"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Last Name</label>
            <input
              name="lname"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Email Id</label>
            <input
              name="email"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Mobile No.</label>
            <input
              name="number"
              type="number"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter mobile number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Confirm Password</label>
            <input
              name="cpassword"
              type="password"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="!mt-10 flex justify-center items-center">
          <button
            onClick={handleSubmit}
            type="button"
            className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </form>
     
    </div>
  );
};

export default RegisterComponent;
