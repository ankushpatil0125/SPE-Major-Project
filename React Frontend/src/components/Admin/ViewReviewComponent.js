import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";

const ViewReviewComponent = () => {
    const [reviews,setReviews] = useState([]);
  const location = useLocation();
  const { product } = location?.state;
  const navigate = useNavigate();
  const bookId = product?.id;
  const [review, setReview] = useState("");
//   console.log("product", product);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  useEffect(() => {
    const handleReviews = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "admin/get-book-review?bookId=" + bookId
        );
        if (response) {
          console.log("response", response);
          setReviews(response?.data);
          //  setFilteredProducts(response?.data);
        }
      } catch (e) {
        console.log("Error while fetching reviews", e?.response?.data?.message);
        alert("Error while fetching reviews", e?.response?.data?.message);
      }
    };
    handleReviews();
  }, []);
  //   const handleSubmitReview=async ()=>{
  //     const userId = localStorage.getItem("User_Id");
  //     console.log("review", review);
  //     const reviewObj={
  //         userId:userId,
  //         bookId : bookId,
  //         review:review
  //     }
  //     console.log("reviewObj",reviewObj);
  //     try{
  //         const response = await axios.post(BASE_URL+"users/add-review",reviewObj);
  //         if(response){
  //             alert("Gave review successfully");
  //             navigate("/user-home");
  //         }
  //     }
  // catch(e){
  //     console.log("Error while giving review",e?.response?.data?.message);
  //     alert("Error while giving review",e?.response?.data?.message);
  // }
  //   };

  return (
    <div>
      <Header />

      <article className="mt-[150px]">
        {reviews?.map((rev,index)=>(
           <div key={index}>
             <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
              {rev?.userFirstName} {rev?.userLastName}
            </h3>
          </div>
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

export default ViewReviewComponent;
