package com.SPE.BookReview.Repository;

import com.SPE.BookReview.Entity.Users;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UsersRepositoryTest {

    @Autowired
    private UsersRepository usersRepository;

    @BeforeEach
    void setUp() {

        Users users = new Users();
        users.setId(1);
        users.setRole("test_user");
        users.setEmail("testEmail");
        users.setPassword("testPassword");
        users.setMobileNo("123456");
        users.setUserFirstName("testUserFirstName");
        users.setUserLastName("testUserLastName");

        Users newUsers = usersRepository.save(users);
    }

    @Test
    void findByEmail() {
        Users users =    usersRepository.findByEmail("testEmail");
        assertEquals(users.getEmail(), "testEmail");
    }
}