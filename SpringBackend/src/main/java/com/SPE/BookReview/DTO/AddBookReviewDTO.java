package com.SPE.BookReview.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class AddBookReviewDTO {

    private int bookId;

    private int userId;

    private String review;

    private Date date;
}
