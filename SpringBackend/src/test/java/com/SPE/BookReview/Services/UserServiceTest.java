package com.SPE.BookReview.Services;

import com.SPE.BookReview.DTO.AddBookReviewDTO;
import com.SPE.BookReview.DTO.LoginDTO;
import com.SPE.BookReview.DTO.LoginResponseDTO;
import com.SPE.BookReview.DTO.RegisterUsersDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Entity.Users;
import com.SPE.BookReview.Repository.BookRepository;
import com.SPE.BookReview.Repository.BookReviewRepository;
import com.SPE.BookReview.Repository.UsersRepository;
import com.SPE.BookReview.ServicesImpl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class UserServiceTest {

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookReviewRepository bookReviewRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void loginUser() {
        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        when(usersRepository.findByEmail("testEmail")).thenReturn(users);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("testEmail");
        loginDTO.setPassword("testPassword");

        LoginResponseDTO loginResponseDTO = userService.loginUser(loginDTO);

        assertEquals(loginResponseDTO.getId(),users.getId());
        assertEquals(loginResponseDTO.getRole(),users.getRole());
    }

    @Test
    void registerUser() {
        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        when(usersRepository.save(Mockito.any(Users.class))).thenReturn(users);

        RegisterUsersDTO registerUsersDTO = new RegisterUsersDTO();
        registerUsersDTO.setEmail("testEmail");
        registerUsersDTO.setPassword("testPassword");
        registerUsersDTO.setMobileNo("123456");
        registerUsersDTO.setUserFirstName("testUserFirstName");
        registerUsersDTO.setUserLastName("testUserLastName");
        registerUsersDTO.setRole("test_user");

        boolean status= userService.registerUser(registerUsersDTO);
        assertTrue(status);
    }

    @Test
    void addReview() {

        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        Book book = new Book();
        book.setId(1);
        book.setName("testBook");
        book.setAuthor("testAuthor");
        book.setCategory("testCategory");
        book.setDescription("testDescription");
        book.setPrice(150);
        book.setPublicationDate(Date.valueOf("2024-10-10"));

        BookReview bookReview = new BookReview();
        bookReview.setId(1);
        bookReview.setBook(book);
        bookReview.setUser(users);
        bookReview.setReview("testReview");
        bookReview.setDate(Date.valueOf("2024-10-10"));

        when(usersRepository.findById(Mockito.anyInt())).thenReturn(Optional.of(users));
        when(bookRepository.findById(Mockito.anyInt())).thenReturn(Optional.of(book));
        when(bookReviewRepository.save(Mockito.any(BookReview.class))).thenReturn(bookReview);

        AddBookReviewDTO addBookReviewDTO = new AddBookReviewDTO();
        addBookReviewDTO.setBookId(1);
        addBookReviewDTO.setUserId(1);
        addBookReviewDTO.setReview("testReview");
        addBookReviewDTO.setDate(Date.valueOf("2024-10-10"));

        boolean status= userService.addReview(addBookReviewDTO);
        assertTrue(status);


    }

    @Test
    void getAllReviewsForBook() {

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

        when(bookReviewRepository.findByUserIdAndBookId(Mockito.anyInt(),Mockito.anyInt())).thenReturn(Optional.of(bookReviewList));

        List<BookReview> bookReviewListTest = userService.getAllReviewsForBook(1,1);

        assertEquals(bookReviewList.size(),bookReviewListTest.size());
        assertEquals(bookReviewListTest.get(0).getReview(),bookReviewList.get(0).getReview());
        assertEquals(bookReviewListTest.get(1).getReview(),bookReviewList.get(1).getReview());

    }
}