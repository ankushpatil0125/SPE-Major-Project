package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.LoginDTO;
import com.SPE.BookReview.DTO.LoginResponseDTO;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Services.UserService;
import com.SPE.BookReview.models.ApiException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginRestController {

    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(LoginRestController.class);

    public LoginRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public LoginResponseDTO login(@RequestBody LoginDTO loginDTO) {
        try {
            logger.info("User Login {}",loginDTO.email);
            
            return userService.loginUser(loginDTO);
        }
        catch (Exception e) {
            logger.error("Error logging in user: {}", e.getMessage());
            throw new APIRequestException(e.getMessage());
        }
    }

}
