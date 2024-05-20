package com.SPE.BookReview.Repository;

import com.SPE.BookReview.Entity.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookReviewRepository extends JpaRepository<BookReview, Integer> {

    @Query("select r from BookReview r where r.book.id=:bookID")
    Optional<List<BookReview>> findByBookId(@Param("bookID") int bookID);

    @Query("select r from BookReview r where r.user.id=:userId and r.book.id=:bookID")
    Optional<List<BookReview>> findByUserIdAndBookId(@Param("userId") int  userId, @Param("bookID") int bookID);
}
