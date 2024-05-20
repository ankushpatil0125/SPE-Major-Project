import React, { useState } from "react";
import book2 from "../../utils/images/book2.jpg";
import axios from "axios";
import { BASE_URL } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";
const AddBookComponent = () => {
  const [bookname, setBookname] = useState("");
  const [typeofbook, setTypeofbook] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationdate, setPublicationdate] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (
      bookname &&
      typeofbook &&
      author &&
      publicationdate &&
      price &&
      description
    ) {
      console.log(
        bookname,
        typeofbook,
        author,
        publicationdate,
        image,
        price,
        description
      );
      const bookObj = {
        name: bookname,
        category: typeofbook,
        author: author,
        publicationDate: publicationdate,
        price: price,
        description: description,
      };
      console.log("bookObj", bookObj);
      try {
        const responseAddBook = await axios.post(
          BASE_URL + "admin/add-book",
          bookObj
        );
        if (responseAddBook) {
          alert("Book added successfully");
          // window.location.reload();
          navigate("/admin-home");
        }
      } catch (e) {
        console.log("Error while adding book", e);
      }
    } else alert("Fill all the required fields");
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/* <Header /> */}

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
          <h4 className="text-lg font-semibold mb-4">
            Fill The Information to add a Book
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="flex item-center">
                <label htmlFor="actor" className="block font-semibold">
                  Select type of book to Add
                </label>
                <label className="text-red-500"> *</label>
              </div>
              <select
                id="typeofbook"
                value={typeofbook}
                onChange={(e) => setTypeofbook(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="Novels">Novels</option>
                <option value="History">History</option>
                <option value="Travel">Travel</option>
                <option value="Biographies">Biographies</option>
              </select>
            </div>

            <div className="form-group">
              <div className="flex items-center">
                <label htmlFor="firstname" className="block font-semibold">
                  Book Name
                </label>
                <label className="text-red-500"> *</label>
              </div>
              <input
                type="text"
                id="bookname"
                value={bookname}
                onChange={(e) => setBookname(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="form-group">
              <div className="flex items-center">
                <label htmlFor="author" className="block font-semibold">
                  Author
                </label>
                <label className="text-red-500"> *</label>
              </div>
              <input
                type="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="form-group">
              <div className="flex items-center">
                <label htmlFor="price" className="block font-semibold">
                  Price
                </label>
                <label className="text-red-500"> *</label>
              </div>
              <input
                type="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="form-group">
              <div className="flex items-center">
                <label htmlFor="dop" className="block font-semibold">
                  Date of Publication
                </label>
                <label className="text-red-500"> *</label>
              </div>
              <input
                type="date"
                id="dob"
                value={publicationdate}
                max={today}
                onChange={(e) => setPublicationdate(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            {/* {formError ? <div>{formError}</div> : null} */}

            <label
              htmlFor="file_input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload file
            </label>

            <input
              id="file_input"
              type="file"
              onChange={(event) => setImage(event.target.files[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {/* description */}
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description of book
            </label>
            <textarea
              id="message"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <button
              type="submit"
              className="bg-[#6467c0]-500 w-full text-black-800 mt-4 px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none bg-blue-400"
            >
              Add Book
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={book2}
            alt="Designer Life"
            className="m-12 xl:m-16 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBookComponent;
