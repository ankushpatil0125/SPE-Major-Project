package com.SPE.BookReview.DTO;


import com.SPE.BookReview.Entity.BookReview;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class BookReviewResposeDTO {

//    private int id;


    private String userFirstName;
    private String userLastName;
    private String review;
    @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
    private Date reviewDate;

    public BookReviewResposeDTO(BookReview bookReview) {
        this.userFirstName =bookReview.getUser().getUserFirstName();
        this.userLastName =bookReview.getUser().getUserLastName();
        this.review=bookReview.getReview();
        this.reviewDate=bookReview.getDate();
    }

}
