package com.SPE.BookReview.Repository;

import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Entity.Users;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BookReviewRepositoryTest {

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UsersRepository usersRepository;



    @BeforeEach
    void setUp() {
        Book book = new Book();
        book.setId(1);
        book.setName("testBook");
        book.setAuthor("testAuthor");
        book.setCategory("testCategory");
        book.setDescription("testDescription");
        book.setPrice(150);
        book.setPublicationDate(Date.valueOf("2024-10-10"));
        book.setBookReviews(null);

        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        System.out.println("book: " + book);
        Book newBook = bookRepository.save(book);
        System.out.println("newBook = " + newBook);

        System.out.println("users: " + users);
        Users newUsers = usersRepository.save(users);
        System.out.println("newUsers = " + newUsers);

        BookReview bookReview = new BookReview();
        bookReview.setId(1);
        bookReview.setBook(newBook);
        bookReview.setUser(newUsers);
        bookReview.setReview("testReview");
        bookReview.setDate(Date.valueOf("2024-10-10"));

        BookReview newBookReview= bookReviewRepository.save(bookReview);
        System.out.println("newBookReview = " + newBookReview);

    }

//    @AfterEach
//    void tearDown() {
//
//    }

//    @Test
//    void findByBookId() {
//
//        Optional<List<BookReview>> bookReviewList= bookReviewRepository.findByBookId(1);
//        System.out.println("bookReviewList + "+bookReviewList);
//        assertTrue(bookReviewList.isPresent());
//        assertTrue(bookReviewList.get().contains(bookReviewRepository.findById(1).get()));
//    }
//
//    @Test
//    void findByUserIdAndBookId() {
//        Optional<List<BookReview>> bookReview= bookReviewRepository.findByUserIdAndBookId(1,1);
////        System.out.println("bookReview + "+bookReview);
//        assertTrue(bookReview.isPresent());
////        assertEquals(bookReview.get().get(0).getReview(),"testReview");
//        assertEquals(bookReview.get().get(0).getReview(),"testReview");
//    }
}