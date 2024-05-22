package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.BookResponseDTO;
import com.SPE.BookReview.DTO.BookReviewResposeDTO;
import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Services.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@EnableTransactionManagement
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminRestController {

    private BookService bookService;

    private final Logger logger = LoggerFactory.getLogger(AdminRestController.class);

    @Autowired
    public AdminRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/add-book")
    public boolean addBook(@RequestBody RegisterBookDTO registerBookDTO) {
        try {
            logger.info("Adding Book {}", registerBookDTO);
            boolean status =  bookService.addBook(registerBookDTO);
            return status;
        }
        catch (Exception e) {
            logger.error("Error in adding book {} {}", registerBookDTO.getName(), e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

    @GetMapping("/get-books")
    public List<BookResponseDTO> getAllBooks() {
        try {
            logger.info("Getting all books");
            List<Book> bookList =  bookService.getAllBooks();
            List<BookResponseDTO> bookResponseDTOList = new ArrayList<>();
            for (Book book : bookList) {
                BookResponseDTO bookResponseDTO = new BookResponseDTO(book);
                bookResponseDTOList.add(bookResponseDTO);
            }
            return bookResponseDTOList;
        }
        catch (Exception e) {
            logger.error("Error in getting all books {}", e.getMessage());
            throw new APIRequestException("Error in getting all books");
        }
    }

    @GetMapping("/get-book-review")
    public List<BookReviewResposeDTO> getAllBookReviews(@RequestParam("bookId") int bookId) {
        try {
            logger.info("Getting book review for bookId {}", bookId);
            List<BookReview> bookReviewList = bookService.getBookReviews(bookId);
            List<BookReviewResposeDTO> bookReviewResposeDTOList = new ArrayList<>();
            for (BookReview bookReview : bookReviewList) {
                BookReviewResposeDTO bookReviewResponseDTO = new BookReviewResposeDTO(bookReview);
                bookReviewResposeDTOList.add(bookReviewResponseDTO);
            }
            return bookReviewResposeDTOList;
        }
        catch (Exception e) {
            logger.error("Error in getting book reviews for book {}: {}", bookId,e.getMessage());
            throw new APIRequestException("Error in get book review"+e.getMessage());
        }
    }
}
