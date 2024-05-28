package com.blogYazilimApp.myBlogSiteApp.Requests;

import lombok.Data;

@Data
public class PostUpdateRequest {
    String title;
    String text;
}
