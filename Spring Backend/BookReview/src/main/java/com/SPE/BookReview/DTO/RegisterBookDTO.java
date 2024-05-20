package com.SPE.BookReview.DTO;

import com.SPE.BookReview.Entity.Book;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
public class RegisterBookDTO {

    private String name;

    private String category;

    private String author;

    private float price;

    private Date publicationDate;

    private String description;

    public Book toBook(){
        Book book = new Book();
        book.setName(this.name);
        book.setCategory(this.category);
        book.setAuthor(this.author);
        book.setPrice(this.price);
        book.setPublicationDate(this.publicationDate);
        book.setDescription(this.description);
        return book;
    }
}
