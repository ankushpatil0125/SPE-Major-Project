package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.BookResponseDTO;
import com.SPE.BookReview.DTO.BookReviewResposeDTO;
import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Services.BookService;
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

    @Autowired
    public AdminRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/add-book")
    public boolean addBook(@RequestBody RegisterBookDTO registerBookDTO) {
       boolean status =  bookService.addBook(registerBookDTO);
       return status;
    }

    @GetMapping("/get-books")
    public List<BookResponseDTO> getAllBooks() {
        List<Book> bookList =  bookService.getAllBooks();
        List<BookResponseDTO> bookResponseDTOList = new ArrayList<>();
        for (Book book : bookList) {
            BookResponseDTO bookResponseDTO = new BookResponseDTO(book);
            bookResponseDTOList.add(bookResponseDTO);
        }
        return bookResponseDTOList;
    }

    @GetMapping("/get-book-review")
    public List<BookReviewResposeDTO> getAllBookReviews(@RequestParam("bookId") int bookId) {
        try {

            List<BookReview> bookReviewList = bookService.getBookReviews(bookId);
            List<BookReviewResposeDTO> bookReviewResposeDTOList = new ArrayList<>();
            for (BookReview bookReview : bookReviewList) {
                BookReviewResposeDTO bookReviewResponseDTO = new BookReviewResposeDTO(bookReview);
                bookReviewResposeDTOList.add(bookReviewResponseDTO);
            }
            return bookReviewResposeDTOList;
        }
        catch (Exception e) {
            throw new APIRequestException("Error in get book review"+e.getMessage());
        }
    }
}
