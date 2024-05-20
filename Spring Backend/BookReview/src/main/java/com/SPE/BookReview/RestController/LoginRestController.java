package com.SPE.BookReview.RestController;

import com.SPE.BookReview.DTO.LoginDTO;
import com.SPE.BookReview.DTO.LoginResponseDTO;
import com.SPE.BookReview.Exceptions.APIRequestException;
import com.SPE.BookReview.Services.UserService;
import com.SPE.BookReview.models.ApiException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginRestController {

    private UserService userService;

    public LoginRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public LoginResponseDTO login(@RequestBody LoginDTO loginDTO) {
        try {

            return userService.loginUser(loginDTO);
        }
        catch (Exception e) {
            throw new APIRequestException(e.getMessage());
        }
    }

}
