package com.SPE.BookReview.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;

@Getter
@Setter
@ToString
public class LoginResponseDTO {
    private int id;
    private String role;
}
