package com.SPE.BookReview.DTO;


import com.SPE.BookReview.Entity.Book;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class BookResponseDTO {
    private int id;
    private String name;
    private String category;
    private String author;
    private double price;

    @JsonFormat(pattern = "dd-MMMM-yyyy", timezone = "Asia/Kolkata")
    private Date publicationDate;
    private String description;

    public BookResponseDTO(Book book) {
        this.id = book.getId();
        this.name = book.getName();
        this.category = book.getCategory();
        this.author = book.getAuthor();
        this.price = book.getPrice();
        this.publicationDate = book.getPublicationDate();
        this.description = book.getDescription();
    }

}
