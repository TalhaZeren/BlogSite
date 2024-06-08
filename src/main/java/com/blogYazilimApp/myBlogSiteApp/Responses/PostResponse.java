package com.blogYazilimApp.myBlogSiteApp.Responses;


import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import lombok.Data;

@Data
public class PostResponse {

    Long id;
    Long userId;
    String userName;
    String title;
    String text;

    public PostResponse(Post post){
    this.id = post.getId();
    this.userId = post.getUser().getId();
    this.userName = post.getUser().getUsername();       // Mapping yapıldı. Artık Sayfada username görülecek.
                                                        // Ayrıca avatar için userId'yi de çağırıyoruz.
    this.title = post.getTitle();
    this.text = post.getText();
    }
}
