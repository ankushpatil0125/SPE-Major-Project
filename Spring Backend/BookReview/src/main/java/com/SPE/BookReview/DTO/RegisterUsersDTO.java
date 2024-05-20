package com.SPE.BookReview.DTO;

import com.SPE.BookReview.Entity.Users;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterUsersDTO {

    private String role;

    private  String userFirstName;

    private  String userLastName;

    private String email;

    private String password;

    private String mobileNo;

    public Users toUser(){
        Users user = new Users();
        user.setRole(this.role);
        user.setUserFirstName(this.userFirstName);
        user.setUserLastName(this.userLastName);
        user.setEmail(this.email);
        user.setPassword(this.password);
        user.setMobileNo(this.mobileNo);

        return user;
    }
}
