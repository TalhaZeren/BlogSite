package com.blogYazilimApp.myBlogSiteApp.Requests;

import lombok.Data;

@Data
public class LikeCreateRequest {

    Long id ;
    Long postId;
    Long userId;

}
