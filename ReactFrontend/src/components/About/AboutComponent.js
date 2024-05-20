import React from "react";
import book1 from "../../utils/images/book1.jpg";
import Header from "../Header/Header";
const AboutComponent = () => {
  return (
    <div>
      <Header />
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mt-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
              About Us
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
              At [System Name], we are passionate about leveraging the power of
              data science and machine learning to revolutionize the way book
              reviews are analyzed and utilized. Our mission is to provide
              readers, authors, and publishers with valuable insights derived
              from cutting-edge predictive analytics, helping them make informed
              decisions and enhancing their reading experience.
            </p>
          </div>
          <div className="w-full lg:w-8/12">
            <img className="w-full h-full" src={book1} alt="A group of People" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
