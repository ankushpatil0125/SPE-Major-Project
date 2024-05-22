package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.AddBookReviewDTO;
import com.SPE.BookReview.DTO.BookResponseDTO;
import com.SPE.BookReview.DTO.BookReviewResposeDTO;
import com.SPE.BookReview.DTO.RegisterUsersDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Services.BookService;
import com.SPE.BookReview.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@EnableTransactionManagement
@RequestMapping("/users")
@CrossOrigin("*")
public class UserRestController {

    private UserService userService;
    private BookService bookService;

    private final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    public UserRestController(UserService userService, BookService bookService) {
        this.userService = userService;
        this.bookService = bookService;
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody RegisterUsersDTO registerUsersDTO) {

        try {
            logger.info("Register user : {}", registerUsersDTO);
            boolean status = userService.registerUser(registerUsersDTO);
            return status;
        } catch (Exception e) {
            logger.error("Error registering user: {}", e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

    @GetMapping("/get-books")
    public List<BookResponseDTO> getAllBooks() {
        try {
            logger.info("Get all books");
            List<Book> bookList = bookService.getAllBooks();
            List<BookResponseDTO> bookResponseDTOList = new ArrayList<>();
            for (Book book : bookList) {
                BookResponseDTO bookResponseDTO = new BookResponseDTO(book);
                bookResponseDTOList.add(bookResponseDTO);
            }
            return bookResponseDTOList;
        } catch (Exception e) {
            logger.error("Error getting books: {}", e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

    @PostMapping("/add-review")
    public Boolean addReview(@RequestBody AddBookReviewDTO addBookReviewDTO) {
        try {
            logger.info("Add review : {}", addBookReviewDTO);
            boolean status = userService.addReview(addBookReviewDTO);
            return status;
        } catch (Exception e) {
            logger.error("Error adding review: {}", e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

    @GetMapping("/get-review")
    public List<BookReviewResposeDTO> getAllReviews(@RequestParam("userId") int userId,
            @RequestParam("bookId") int bookId) {
        try {
            logger.info("get all reviews of : {} for {}", userId, bookId);
            List<BookReview> bookReviewList = userService.getAllReviewsForBook(userId, bookId);
            List<BookReviewResposeDTO> bookReviewResponseDTOList = new ArrayList<>();
            for (BookReview bookReview : bookReviewList) {
                BookReviewResposeDTO bookReviewResponseDTO = new BookReviewResposeDTO(bookReview);
                bookReviewResponseDTOList.add(bookReviewResponseDTO);
            }
            return bookReviewResponseDTOList;
        } catch (Exception e) {
            logger.error("Error get all reviews of : {} for {} : {}",userId, bookId,e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

}
