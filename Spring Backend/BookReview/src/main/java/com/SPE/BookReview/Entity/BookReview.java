package com.SPE.BookReview.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "book_review")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class BookReview {

    @Id
    @Column(name="review_id",length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonBackReference
    private Book book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "review")
    private String review;

    @Column(name = "date")
    private Date date;

}
