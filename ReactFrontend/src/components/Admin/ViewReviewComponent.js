import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";

const ViewReviewComponent = () => {
    const [reviews, setReviews] = useState([]);
    const [predictedRatings, setPredictedRatings] = useState({});
    const location = useLocation();
    const { product } = location?.state;
    const navigate = useNavigate();
    const bookId = product?.id;
    const [review, setReview] = useState("");
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
                }
            } catch (e) {
                console.log("Error while fetching reviews", e?.response?.data?.message);
                alert("Error while fetching reviews", e?.response?.data?.message);
            }
        };
        handleReviews();
    }, []);

    const handleRating = async (reviewText, index) => {
        try {
            const response = await axios.post('http://localhost:5002/predict', { textInput: reviewText }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const updatedPredictedRatings = { ...predictedRatings, [index]: response.data.result };
            setPredictedRatings(updatedPredictedRatings);
        } catch (error) {
            console.error("Error while predicting rating:", error);
            alert("Error while predicting rating:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <Header />
            <article className="mt-[150px]">
                {reviews?.map((rev, index) => (
                    <div key={index}>
                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                                {rev?.userFirstName} {rev?.userLastName}
                            </h3>
                        </div>
                        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                            <p>
                                Reviewed on
                                <time dateTime="2017-03-03 19:00">{rev?.reviewDate}</time>
                            </p>
                        </footer>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {rev?.review}
                        </p>
                        <button
                            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => handleRating(rev?.review, index)}
                        >
                            Predict Rating
                        </button>
                        {predictedRatings[index] && (
                            <p className="mt-2 text-green-500">Predicted Rating: {predictedRatings[index]}</p>
                        )}
                    </div>
                ))}
            </article>
        </div>
    );
};

export default ViewReviewComponent;
