import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";
import LoadingComponent from "../Loading/LoadingComponent";

const ViewReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [predictedRatings, setPredictedRatings] = useState([]);
  const location = useLocation();
  const { product } = location?.state;
  const navigate = useNavigate();
  const bookId = product?.id;
  // const [review, setReview] = useState("");
  const currentDate = new Date();
  // const formattedDate = currentDate.toLocaleDateString();
  const [loader, setLoader] = useState(false);
  const [avgrating, setavgrating] = useState(0);
  useEffect(() => {
    const handleReviews = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "admin/get-book-review?bookId=" + bookId
        );
        setLoader(true);
        if (response) {
          console.log("response", response);
          setReviews(response?.data);
          const extractedReviews = response?.data.reduce((acc, curr) => {
            if (curr?.review) {
              acc.push(curr.review);
            }
            return acc;
          }, []);
          setReviewList(extractedReviews);
          setLoader(false);
        }
      } catch (e) {
        console.log("Error while fetching reviews", e?.response?.data?.message);
        alert("Error while fetching reviews", e?.response?.data?.message);
        setLoader(false);
      }
    };
    handleReviews();
  }, [bookId]);

  const handleRating = async (reviewText, index) => {
    console.log("reviewText", reviewText);
    console.log("type(reviewText)", typeof reviewText);
    try {
      setLoader(true);
      const response = await axios.post(
        "http://localhost:5002/predict",
        { textInput: reviewText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("responsepredict",response)
      // const updatedPredictedRatings = { ...predictedRatings, [index]: response?.data?.result };
      //console.log("updatedPredictedRatings",updatedPredictedRatings)
      setPredictedRatings(response?.data?.result);
      setLoader(false);
    } catch (error) {
      console.error("Error while predicting rating:", error);
      alert(
        "Error while predicting rating:",
        error.response?.data || error?.message
      );
      setLoader(false);
    }
  };
  useEffect(() => {
    var total = 0;
    predictedRatings.forEach(function (grade) {
      total += grade;
    });
    total = total / predictedRatings.length;
    console.log(total / predictedRatings.length);
    setavgrating(total);
  }, [predictedRatings]);
  if (loader) return <LoadingComponent />;
  return (
    <div>
      <Header />
      <article className="mt-[150px] flex justify-center">
        <div className="w-full max-w-2xl">
          {reviews?.map((rev, index) => (
            <article
              key={index}
              className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-gray-300 mb-6"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt={`${rev?.userFirstName} ${rev?.userLastName}`}
                    />
                    {rev?.userFirstName} {rev?.userLastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      dateTime={rev?.reviewDate}
                      title={rev?.reviewDate}
                    >
                      {new Date(rev?.reviewDate).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{rev?.review}</p>
              {predictedRatings[index] && (
                <p
                  className={`mt-2 ${
                    predictedRatings[index] > 2
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Predicted Rating: {predictedRatings[index]}
                </p>
              )}

              {/* <div className="flex items-center mt-4 space-x-4">
                                <button
                                    type="button"
                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                    onClick={() => handleRating([rev?.review], index)}
                                >
                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                    </svg>
                                    Predict Rating
                                </button>
                                {predictedRatings[0] && (
                                    <p className="mt-2 text-green-500">Predicted Rating: {predictedRatings[0]}</p>
                                )}
                            </div> */}
            </article>
          ))}
          <div className="w-full max-w-2xl p-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-gray-300 mb-6">
            {/* <ul className="list-disc list-inside mb-4">
                        {reviewList.map((review, index) => (
                            <li key={index}>{review}</li>
                        ))}
                    </ul> */}
            <button
              className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handleRating(reviewList)}
            >
              Predict Final Rating
            </button>
            {predictedRatings && avgrating !== 0 && (
              <p
                className={`mt-2 ${
                  avgrating > 2 ? "text-green-500" : "text-red-500"
                }`}
              >
                Predicted Average Rating for this book is :{" "}
                {avgrating ? avgrating : "?"}
              </p>
            )}
          </div>
        </div>
      </article>
      {/* <article className="mt-10 flex justify-center">
                <div className="w-full max-w-2xl p-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-gray-300 mb-6">
                    <h2 className="text-lg font-semibold mb-4">All Reviews:</h2>
                    <ul className="list-disc list-inside mb-4">
                        {reviewList.map((review, index) => (
                            <li key={index}>{review}</li>
                        ))}
                    </ul>
                    <button
                        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => handleRating(reviewList)}
                    >
                        Predict Final Rating
                    </button>
                    {predictedRatings && (
                        <p className="mt-2 text-green-500">Predicted Rating: {predictedRatings}</p>
                    )}
                </div>
            </article> */}
    </div>
  );
};

export default ViewReviewComponent;

{
  /* <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div> */
}
// <button type="submit"
//     class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
//     Post comment
// </button>
