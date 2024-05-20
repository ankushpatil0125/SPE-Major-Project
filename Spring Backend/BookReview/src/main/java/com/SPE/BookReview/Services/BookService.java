package com.SPE.BookReview.Services;


import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;

import java.util.List;

public interface BookService {
    boolean addBook(RegisterBookDTO registerBookDTO);

    List<Book> getAllBooks();

    List<BookReview> getBookReviews(int bookId);


}
