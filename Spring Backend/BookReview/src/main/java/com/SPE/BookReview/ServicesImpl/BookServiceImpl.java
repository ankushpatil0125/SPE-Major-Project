package com.SPE.BookReview.ServicesImpl;

import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Repository.BookRepository;
import com.SPE.BookReview.Repository.BookReviewRepository;
import com.SPE.BookReview.Services.BookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@EnableTransactionManagement
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private BookReviewRepository bookReviewRepository;

    @Override
    @Transactional
    public boolean addBook(RegisterBookDTO registerBookDTO) {
        Book book = registerBookDTO.toBook();
        Book savedBook = bookRepository.save(book);
        if (savedBook != null) {
            return true;
        }
        return false;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<BookReview> getBookReviews(int bookId) {
        try {
            Optional<List<BookReview>> bookReviews = bookReviewRepository.findByBookId(bookId);
            if (bookReviews.isPresent()) {
                return bookReviews.get();
            }
            else throw new APIRequestException("No Book review for the given ID");
        }
        catch (Exception e) {
            throw new APIRequestException(e.getMessage());
        }
    }
}
