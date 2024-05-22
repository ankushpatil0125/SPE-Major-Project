package com.SPE.BookReview.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "books")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Book {

    @Id
    @Column(name="book_id",length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private double price;

    @Column(name = "publication_date")
    private Date publicationDate;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private List<BookReview> bookReviews;
}
