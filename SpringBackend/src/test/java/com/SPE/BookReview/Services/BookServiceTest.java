package com.SPE.BookReview.Services;

import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Entity.Users;
import com.SPE.BookReview.Repository.BookRepository;
import com.SPE.BookReview.Repository.BookReviewRepository;
import com.SPE.BookReview.Repository.UsersRepository;
import com.SPE.BookReview.ServicesImpl.BookServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

//@ExtendWith(MockitoExtension.class)
//@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(SpringExtension.class)
class BookServiceTest {
//    @DisplayName("MyTestClass")

    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookReviewRepository bookReviewRepository;

    @Mock
    private UsersRepository usersRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @BeforeEach
    void setUp() {

//
//        Book book = new Book();
//        book.setId(1);
//        book.setName("testBook");
//        book.setAuthor("testAuthor");
//        book.setCategory("testCategory");
//        book.setDescription("testDescription");
//        book.setPrice(150);
//        book.setPublicationDate(Date.valueOf("2024-10-10"));


//        Users users = new Users();
//        users.setId(1);
//        users.setRole("test_user");
//        users.setEmail("testEmail");
//        users.setPassword("testPassword");
//        users.setMobileNo("123456");
//        users.setUserFirstName("testUserFirstName");
//        users.setUserLastName("testUserLastName");
//
////        Book newBook = bookRepository.save(book);
////        Users newUsers = usersRepository.save(users);
//
//
//        BookReview bookReview = new BookReview();
//        bookReview.setId(1);
//        bookReview.setBook(book);
//        bookReview.setUser(users);
//        bookReview.setReview("testReview");
//        bookReview.setDate(Date.valueOf("2024-10-10"));
//
//
//        when(bookRepository.save(Mockito.any(Book.class))).thenReturn(book);
//        when(usersRepository.save(Mockito.any(Users.class))).thenReturn(users);
//        when(bookReviewRepository.save(Mockito.any(BookReview.class))).thenReturn(bookReview);
//        bookReviewRepository.save(bookReview);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void addBook() {
        Book book = new Book();
        book.setId(1);
        book.setName("testBook");
        book.setAuthor("testAuthor");
        book.setCategory("testCategory");
        book.setDescription("testDescription");
        book.setPrice(150);
        book.setPublicationDate(Date.valueOf("2024-10-10"));
        when(bookRepository.save(Mockito.any(Book.class))).thenReturn(book);

        RegisterBookDTO registerBookDTO = new RegisterBookDTO();
//        registerBookDTO.setId(1);
        registerBookDTO.setName("testBook");
        registerBookDTO.setAuthor("testAuthor");
        registerBookDTO.setCategory("testCategory");
        registerBookDTO.setDescription("testDescription");
        registerBookDTO.setPrice(150);
        registerBookDTO.setPublicationDate(Date.valueOf("2024-10-10"));

//        when(bookRepository.save(Mockito.any(Book.class)))
        boolean status = bookService.addBook(registerBookDTO);
//        System.out.println();
        assertTrue(status);
    }

    @Test
    void getAllBooks() {

        Book book = new Book();
        book.setId(1);
        book.setName("testBook");
        book.setAuthor("testAuthor");
        book.setCategory("testCategory");
        book.setDescription("testDescription");
        book.setPrice(150);
        book.setPublicationDate(Date.valueOf("2024-10-10"));

        Book book2 = new Book();
        book2.setId(2);
        book2.setName("testBook");
        book2.setAuthor("testAuthor");
        book2.setCategory("testCategory");
        book2.setDescription("testDescription");
        book2.setPrice(150);
        book2.setPublicationDate(Date.valueOf("2024-10-10"));

        List<Book> bookList = new ArrayList<>();
        bookList.add(book);

        when(bookRepository.findAll()).thenReturn(bookList);

        List<Book> bookListTest= bookService.getAllBooks();
        assertEquals(bookList.size(),bookListTest.size());
    }

    @Test
    void getBookReviews() {
        Book book = new Book();
        book.setId(1);
        book.setName("testBook");
        book.setAuthor("testAuthor");
        book.setCategory("testCategory");
        book.setDescription("testDescription");
        book.setPrice(150);
        book.setPublicationDate(Date.valueOf("2024-10-10"));

        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        BookReview bookReview = new BookReview();
        bookReview.setId(1);
        bookReview.setBook(book);
        bookReview.setUser(users);
        bookReview.setReview("testReview");
        bookReview.setDate(Date.valueOf("2024-10-10"));

        BookReview bookReview2 = new BookReview();
        bookReview2.setId(2);
        bookReview2.setBook(book);
        bookReview2.setUser(users);
        bookReview2.setReview("testReview2");
        bookReview2.setDate(Date.valueOf("2024-10-10"));

        List<BookReview> bookReviewList = new ArrayList<>();
        bookReviewList.add(bookReview);
        bookReviewList.add(bookReview2);

//        when(bookRepository.save(Mockito.any(Book.class))).thenReturn(book);
        when(bookReviewRepository.findByBookId(Mockito.any(Integer.class))).thenReturn(Optional.of(bookReviewList));

        List<BookReview> bookReviewTest = bookService.getBookReviews(1);
        assertEquals(bookReviewList.size(),bookReviewTest.size());


//        when(bookReviewRepository.findByBookId(Mockito.any(int))).thenReturn(bookReviewList);

    }
}