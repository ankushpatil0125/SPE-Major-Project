package com.SPE.BookReview.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {

    @Id
    @Column(name="user_id",length = 45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="role",length = 255)
    private String role;

    @Column(name="userFirstName",length = 255)
    private  String userFirstName;

    @Column(name="userLastName",length = 255)
    private  String userLastName;

    @Column(name="email",length = 255,unique = true)
    private String email;

    @Column(name="password",length = 255)
    private String password;

    @Column(name="mobileNo",length = 255)
    private String mobileNo;

//    @OneToMany(mappedBy = "user")
//    @JsonManagedReference
//    private String

}
