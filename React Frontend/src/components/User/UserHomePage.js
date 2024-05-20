import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
const UserHomePage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  // const [sort, setSort] = useState("");
  // const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   setLoader(true);
  //   let sortedProducts = [...products];

  //   if (sort === "Sort by Price") {
  //     sortedProducts.sort((a, b) => a.price - b.price);
  //   } else if (sort === "Sort by Rating") {
  //     sortedProducts.sort((a, b) => b.rating - a.rating);
  //   } else {
  //     sortedProducts = [...products]; // Default sorting (original order)
  //   }

  //   setFilteredProducts(sortedProducts);
  //   setLoader(false);
  // }, [sort, products]);
  useEffect(() => {
    const handleBooks = async () => {
      try {
        const response = await axios.get(BASE_URL + "admin/get-books");
        if (response) {
          console.log("response", response);
          setFilteredProducts(response?.data);
        }
      } catch (e) {
        console.log("Error while fetching books", e);
        alert("Error while fetching books", e);
      }
    };
    handleBooks();
  }, []);
  // if (loader) return <LoadingComponent />;
  const handleReview = (product) => {
    navigate("/give-review",{state:{product:product}});
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 mt-20">
        <div className="small-container">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-3xl">All Books in Store</h2>
            <select
              className="border p-2 rounded"
              // value={sort}
              // onChange={(e) => setSort(e.target.value)}
            >
              <option>Default Sorting</option>
              <option>Sort by Price</option>
              <option>Sort by Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product?.id}
                className="col-4 bg-white p-4 rounded shadow-md"
              >
                {/* <img
                src={product.img}
                alt={product.title}
                className="w-full h-64 object-cover mb-4"
              /> */}
                <h4 className="text-lg font-semibold">
                  Name : {product?.name}
                </h4>
                <p className="text-gray-700">Author : {product?.author}</p>
                <p className="text-gray-700">Category : {product?.category}</p>
                <p className="text-gray-700">Rs {product?.price}.00</p>
                <p className="text-gray-700">
                  Publication Date {product?.publicationDate}
                </p>
                <div className="flex flex-row">
                  {/* <CiStar /><p className="text-gray-700">
                  
                {product.rating}
              </p> */}
                </div>
                <button className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>handleReview(product)}>
                  Give Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
