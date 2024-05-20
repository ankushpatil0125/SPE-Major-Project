import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";

const GiveReviewComponent = () => {
  const location = useLocation();

  const { product } = location?.state;
  const navigate = useNavigate();
  const bookId = product?.id;
  const [review,setReview] =useState("");
  console.log("product", product);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const userId = localStorage.getItem("User_Id");
  const [prevReviews,setPrevReviews] = useState([]);
  useEffect(() => {
    const handlePrevReviews = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "users/get-review?userId=" + userId + "&bookId=" +bookId
        );
        if (response) {
          setPrevReviews(response?.data);
          console.log("response", response);
          //  setFilteredProducts(response?.data);
        }
      } catch (e) {
        console.log("Error while fetching prev reviews", e?.response?.data?.message);
        alert("Error while fetching prev reviews", e?.response?.data?.message);
      }
    };
    handlePrevReviews();
  },[]);

  const handleSubmitReview=async ()=>{

    console.log("review", review);
    const reviewObj={
        userId:userId,
        bookId : bookId,
        review:review,
        date:currentDate
    }
    console.log("reviewObj",reviewObj);
    try{
        const response = await axios.post(BASE_URL+"users/add-review",reviewObj);
        if(response){
            alert("Gave review successfully");
            navigate("/user-home");
        }
    }
    catch(e){
        console.log("Error while giving review",e?.response?.data?.message);
        alert("Error while giving review",e?.response?.data?.message);
    }
  };

  return (
    <div>
      <Header />

      <article className="md:gap-8 md:grid md:grid-cols-3 mt-[150px]">
        <div>
          <div className="flex items-center mb-6 ">
            <img
              className="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <div className="ms-4 font-medium dark:text-white">
              <p>{product?.name}</p>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
              Category : {product?.category}
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              Publication Date : {product?.publicationDate}
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Price : Rs {product?.price}.00
            </li>
          </ul>
        </div>
        <div className="col-span-2 mt-6 md:mt-0">
          <div className="flex items-start mb-5">
            <div className="pe-4">
              <footer>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Reviewing On :
                  <time dateTime="2022-01-20 19:00">{formattedDate}</time>
                </p>
              </footer>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Give Review To This Book
              </h4>
            </div>
          </div>

          <label
            htmlFor="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button onClick={handleSubmitReview} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit Review</button>
        </div>
      </article>
      <article className="mt-[150px]">
        {prevReviews?.map((rev,index)=>(
           <div key={index}>
             
          <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Reviewed on
              <time datetime="2017-03-03 19:00">{rev?.reviewDate}</time>
            </p>
          </footer>
          <p class="mb-2 text-gray-500 dark:text-gray-400">
              {rev?.review}
          </p>
           </div>
        ))}
      </article>
    </div>
  );
};

export default GiveReviewComponent;
