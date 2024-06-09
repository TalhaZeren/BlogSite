package com.blogYazilimApp.myBlogSiteApp.Responses;


import com.blogYazilimApp.myBlogSiteApp.Entities.Like;
import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import lombok.Data;

import java.util.List;

@Data
public class PostResponse {

    Long id;
    Long userId;
    String userName;
    String title;
    String text;
    List<LikeResponse> postLikes;

    public PostResponse(Post entity, List<LikeResponse> postLikes){
    this.id = entity.getId();
    this.userId = entity.getUser().getId();
    this.userName = entity.getUser().getUsername();       // Mapping yapıldı. Artık Sayfada username görülecek.
                                                        // Ayrıca avatar için userId'yi de çağırıyoruz.
    this.title = entity.getTitle();
    this.text = entity.getText();
    this.postLikes = postLikes;

    }
}
