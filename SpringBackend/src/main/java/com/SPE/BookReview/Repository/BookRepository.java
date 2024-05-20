package com.SPE.BookReview.Repository;

import com.SPE.BookReview.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
