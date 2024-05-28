package com.blogYazilimApp.myBlogSiteApp.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "post")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @ManyToOne(fetch =  FetchType.LAZY) // Sadece gerekli veri gelecek.
    @JoinColumn(name = "user_id",nullable = false) // user tablosundan id sütununu çekiyoruz.
    @OnDelete(action = OnDeleteAction.CASCADE) // eğer user silinirse user a bağlı tüm postlar silinecek.
    @JsonIgnore
    User user;

    String title;

    @Column(columnDefinition = "text")
    @Lob
    String text;

}
