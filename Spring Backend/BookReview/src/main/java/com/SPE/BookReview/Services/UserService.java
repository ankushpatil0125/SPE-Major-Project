package com.SPE.BookReview.Services;

import com.SPE.BookReview.DTO.AddBookReviewDTO;
import com.SPE.BookReview.DTO.LoginDTO;
import com.SPE.BookReview.DTO.LoginResponseDTO;
import com.SPE.BookReview.DTO.RegisterUsersDTO;
import com.SPE.BookReview.Entity.BookReview;

import java.util.List;
import java.util.Optional;

public interface UserService {

    LoginResponseDTO loginUser(LoginDTO loginDTO);

    boolean registerUser(RegisterUsersDTO registerUsersDTO);

    boolean addReview(AddBookReviewDTO addBookReviewDTO);

    List<BookReview> getAllReviewsForBook(int userId,int bookId);


}
