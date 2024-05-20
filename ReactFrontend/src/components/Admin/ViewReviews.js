import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/Constant';
import axios from 'axios';

const ViewReviews = () => {
  // useEffect(()=>{
  //   const handleReviews = async () => {
  //    try{
  //      const response = await axios.get(BASE_URL + "admin/get-book-review");
  //      if (response) {
  //        console.log("response", response);
  //       //  setFilteredProducts(response?.data);
  //      }
  //    }
  //    catch(e){
  //      console.log("Error while fetching reviews",e?.response?.data?.message)
  //      alert("Error while fetching reviews",e?.response?.data?.message);
  //    }
  //   }
  //   handleReviews();
  // },[])
  return (
    <div>ViewReviews</div>
  )
}

export default ViewReviews