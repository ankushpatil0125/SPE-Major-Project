package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.RegisterBookDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Entity.Users;
import com.SPE.BookReview.Services.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(AdminRestController.class)
@ExtendWith(SpringExtension.class)
//@ExtendWith(MockitoExtension.class)
class AdminRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {

    }

    @Test
    void addBook() throws Exception {
        when(bookService.addBook(Mockito.any(RegisterBookDTO.class))).thenReturn(true);


        RegisterBookDTO registerBookDTO = new RegisterBookDTO();
//        registerBookDTO.setId(1);
        registerBookDTO.setName("testBook");
        registerBookDTO.setAuthor("testAuthor");
        registerBookDTO.setCategory("testCategory");
        registerBookDTO.setDescription("testDescription");
        registerBookDTO.setPrice(150);
        registerBookDTO.setPublicationDate(Date.valueOf("2024-10-10"));


        ResultActions resultActions = mockMvc.perform(post("/admin/add-book").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(registerBookDTO)));

        //to print the result
        resultActions.andDo(MockMvcResultHandlers.print());

        resultActions.andExpect(MockMvcResultMatchers.status().isOk());
        resultActions.andExpect(MockMvcResultMatchers.content().string("true"));


    }

    @Test
    void getAllBooks() throws Exception {
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
        book2.setName("testBook2");
        book2.setAuthor("testAuthor");
        book2.setCategory("testCategory");
        book2.setDescription("testDescription");
        book2.setPrice(150);
        book2.setPublicationDate(Date.valueOf("2024-10-10"));

        List<Book> bookList = new ArrayList<>();
        bookList.add(book);
        bookList.add(book2);

        when(bookService.getAllBooks()).thenReturn(bookList);

        ResultActions resultActions = mockMvc.perform(get("/admin/get-books").contentType(MediaType.APPLICATION_JSON));

        resultActions.andDo(MockMvcResultHandlers.print());
        resultActions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("testBook"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("testBook2"));




    }

    @Test
    void getAllBookReviews() throws Exception {

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

        when(bookService.getBookReviews(Mockito.anyInt())).thenReturn(bookReviewList);

        ResultActions resultActions = mockMvc.perform(get("/admin/get-book-review").contentType(MediaType.APPLICATION_JSON).param("bookId","1"));
        resultActions.andDo(MockMvcResultHandlers.print());

        resultActions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].review").value("testReview"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].review").value("testReview2"));
    }
}