package com.SPE.BookReview.ServicesImpl;

import com.SPE.BookReview.DTO.AddBookReviewDTO;
import com.SPE.BookReview.DTO.LoginDTO;
import com.SPE.BookReview.DTO.LoginResponseDTO;
import com.SPE.BookReview.DTO.RegisterUsersDTO;
import com.SPE.BookReview.Entity.Book;
import com.SPE.BookReview.Entity.BookReview;
import com.SPE.BookReview.Entity.Users;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Repository.BookRepository;
import com.SPE.BookReview.Repository.BookReviewRepository;
import com.SPE.BookReview.Repository.UsersRepository;
import com.SPE.BookReview.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@EnableTransactionManagement
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;
    private BookRepository bookRepository;
    private BookReviewRepository bookReviewRepository;

    @Override
    public LoginResponseDTO loginUser(LoginDTO loginDTO) {

        Users user = usersRepository.findByEmail(loginDTO.getEmail());
        if (user == null) {
            throw new APIRequestException("Invalid email");
        }

        if ( user.getPassword().equals(loginDTO.getPassword())) {
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setId(user.getId());
            loginResponseDTO.setRole(user.getRole());
            return loginResponseDTO;
        }
        else throw new APIRequestException("Invalid password");

    }

    @Override
    @Transactional
    public boolean registerUser(RegisterUsersDTO registerUsersDTO) {

        try {
            System.out.println("RegisterUsersDTO :" + registerUsersDTO);
            Users user = registerUsersDTO.toUser();
            System.out.println("User :" + user);
            Users newUser = usersRepository.save(user);
            return true;
        }
        catch (Exception e) {
            throw  new APIRequestException(e.getMessage());
        }


    }

    @Override
    public boolean addReview(AddBookReviewDTO addReviewDTO) {

        try {
            Optional<Users> getUsers = usersRepository.findById(addReviewDTO.getUserId());
            Optional<Book> getBook = bookRepository.findById(addReviewDTO.getBookId());

           if (getUsers.isPresent() && getBook.isPresent()) {
               Users user = getUsers.get();
               Book book = getBook.get();

               BookReview bookReview = new BookReview();
               bookReview.setUser(user);
               bookReview.setBook(book);
               bookReview.setReview(addReviewDTO.getReview());
               bookReview.setDate(addReviewDTO.getDate());

               BookReview newBookReview= bookReviewRepository.save(bookReview);
               return true;
           }
            else throw new APIRequestException("Invalid user id=" + addReviewDTO.getUserId()+" or book id="+addReviewDTO.getBookId());

        }
        catch (Exception e) {
            throw  new APIRequestException(e.getMessage());
        }
    }

    @Override
    public List<BookReview> getAllReviewsForBook(int userId, int bookId) {
        try {
            Optional<List<BookReview>> bookReviewList = bookReviewRepository.findByUserIdAndBookId(userId,bookId);
            if (bookReviewList.isPresent()) {
                return bookReviewList.get();
            }
            else throw new APIRequestException("Invalid user id=" + userId+" or book id="+bookId);
        }
        catch (Exception e) {
            throw  new APIRequestException(e.getMessage());
        }
    }
}
