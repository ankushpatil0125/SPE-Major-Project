import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import AddBookComponent from "./AddBookComponent";
import ViewBooksComponent from "./ViewBooksComponent";
import ViewReviews from "./ViewReviews";
const AdminHomePage = () => {
  // Always set isNavOpen to true
  const isNavOpen = true;
  const [currentPage, setCurrentPage] = useState("add");
  const renderPage = () => {
    switch (currentPage) {
      case "add":
        return <AddBookComponent />;
      case "viewbooks":
        return <ViewBooksComponent />;
      // case "viewreviews":
      //   return <ViewReviews />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Header />
      <hr />
      {/* Drawer component */}
      <div>
      <div
        id="drawer-navigation"
        className={`mt-[90px] border fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="py-4 overflow-y-auto">
          <button
            onClick={() => setCurrentPage("add")}
            className={`flex bg-transparent items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPage === "add"
            ? "text-blue-800 bg-[#f5f5f5]"
            : "text-gray-900 "}`}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span className="ms-3">Add Books</span>
          </button>
          <button
            onClick={() => setCurrentPage("viewbooks")}
            className={`flex bg-transparent items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPage === "viewbooks"
            ? "text-blue-800 bg-[#f5f5f5]"
            : "text-gray-900 "}`}
          >
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
                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <span className="ms-3">View Books</span>
          </button>
          {/* <button
            onClick={() => setCurrentPage("viewreviews")}
            className={`flex bg-transparent items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPage === "viewreviews"
            ? "text-blue-800 bg-[#f5f5f5]"
            : "text-gray-900 "}`}
          >
            <svg
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span className="ms-3">View Reviews</span>
          </button> */}
        </div>
        
      </div>
      </div>
      <div className="p-4 mt-20 sm:ml-64">
          {renderPage()}
        </div>
    </div>
  );
};

export default AdminHomePage;
